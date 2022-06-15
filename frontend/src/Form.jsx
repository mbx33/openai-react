import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function App() {
	const [question, setQuestion] = useState('');
	const [responses, setResponses] = useState([]);
	const [userInput, setUserInput] = useState({
		input: '',
		response: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setQuestion('');
		try {
			const response = await axios.post('http://localhost:5000/api/question', {
				input: question,
			});
			const result = response.data;
			setResponses([...responses, result]);
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
				<h2>Response from Leonardo</h2>
				{responses &&
					responses.map((response, index) => (
						<ul>
							<li key={index}>
								{/* {response.question} */}
								{response}
							</li>
						</ul>
					))}
			</ResponseWrapper>
		</MainContainer>
	);
}

export default App;

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
