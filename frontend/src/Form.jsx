import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ResponseCard from './ResponseCard';

// const arrayOfObjects = [
// 	{ coffee: 'Americano', size: 'Medium' },
// 	{ coffee: 'Espresso', size: 'Single' },
// ];

function Form() {
	const [question, setQuestion] = useState('');
	const [responses, setResponses] = useState([]);
	const [userQuestion, setUserQuestion] = useState([]);
	const [data, setData] = useState([
		{
			input: '',
			answer: '',
		},
	]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setQuestion('');
		try {
			const response = await axios.post('http://localhost:5000/api/question', {
				input: question,
			});
			console.log(response.data.result);
			const result = response.data.result;
			const userInput = response.data.input;
			// setResponses([...responses, result]);
			// setUserQuestion([...userQuestion, userInput]);
			setData([{ ...data, input: userInput, answer: result }]);
			console.log(data, 'this is data state');
		} catch (error) {
			console.log('ERROR', error);
		}
	};

	return (
		<MainContainer>
			<h1>Ask Leonardo</h1>
			<FormWrapper>
				<form onSubmit={handleSubmit} method="POST">
					<div className="form-input">
						<label htmlFor="prompt">Statement or Question:</label>
						<input
							type="text"
							id="prompt"
							value={question}
							required
							onChange={(e) => setQuestion(e.target.value)}
						/>
						<button type="submit">Submit</button>
					</div>
				</form>
			</FormWrapper>
			<ResponseWrapper>
				{/* {arrayOfObjects.map(({ coffee, size }) => (
					<p>
						Coffee type {coffee} in a {size} size.
					</p>
				))} */}
				<h2>Response from Leonardo</h2>
				<h1>Answer: </h1>
				{data &&
					data.map(({ input, answer }) => (
						<>
							<ResponseCard question={input} answer={answer} key={answer} />
						</>
					))}
			</ResponseWrapper>
		</MainContainer>
	);
}

export default Form;

const MainContainer = styled.section`
	width: 70%;
	margin: 0 auto;

	h1 {
		text-align: center;
	}
`;

const FormWrapper = styled.div`
	input {
		font-size: 1.4rem;
		width: 80%;
		padding: 0.7rem;
	}

	.form-input {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 3rem;
		gap: 1.2rem;
	}
`;

const ResponseWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;

	li {
		list-style-type: none;
	}
`;
