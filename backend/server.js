const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;
const axios = require('axios');
const path = require('path');

// ai url = https://api.openai.com/v1/engines/text-curie-001/completions

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/api/question', async (req, res) => {
	const input = req.body.input;
	let data = {
		prompt: input,
		temperature: 0.5,
		max_tokens: 64,
		top_p: 1.0,
		frequency_penalty: 0.0,
		presence_penalty: 0.0,
	};
	try {
		const response = await axios.post(
			'https://api.openai.com/v1/engines/text-curie-001/completions',
			data,
			{
				headers: {
					// 'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.AI_API_KEY}`,
				},
			}
		);
		const result = response.data.choices[0].text;

		res.status(200).send({ result, input });
		// setResponses([...responses, result]);
	} catch (error) {
		console.log('ERROR', error);
	}
});

//Serve static assets if in production

if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('frontend/dist'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve((__dirname, 'frontend', 'dist', 'index.html')));
	});
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
