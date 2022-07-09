import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ResponseCard from './ResponseCard';

function Form() {
	const [question, setQuestion] = useState('');
	const [responses, setResponses] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setQuestion('');
		try {
			const response = await axios.post('api/question', {
				input: question,
			});
			const result = response.data.result;
			const userInput = response.data.input;
			const resData = { id: new Date().getTime().toString(), userInput, result };
			setResponses((response) => {
				return [...response, resData];
			});
		} catch (error) {
			console.log('ERROR', error);
		}
	};

	return (
		<MainContainer>
			<h1 className="title">Ask Leonardo</h1>
			<FormWrapper>
				<form onSubmit={handleSubmit} method="POST">
					<div className="form-input">
						<input
							type="text"
							id="prompt"
							value={question}
							placeholder="Your Question"
							required
							onChange={(e) => setQuestion(e.target.value)}
						/>
						<button type="submit">Submit</button>
					</div>
				</form>
			</FormWrapper>
			<ResponseWrapper>
				{responses &&
					responses.map((response) => {
						const { id, userInput, result } = response;
						return (
							<ResponseCard question={userInput} answer={result} id={id} />
						);
					})}
			</ResponseWrapper>
		</MainContainer>
	);
}

export default Form;

const MainContainer = styled.section`
	/* width: 100%; */
	margin: 0 auto;

	.title {
		font-size: 3rem;
		margin-top: 2rem;
		text-align: center;
	}
`;

const FormWrapper = styled.div`
	input {
		font-size: 1.4rem;
		width: 60%;
		padding: 0.7rem;
	}

	.form-input {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 3rem;
		gap: 1.2rem;
	}

	button {
		background-color: green;
		padding: 0.5rem 2rem;
		border-radius: 1rem;
		cursor: pointer;

		&:hover {
			background-color: lightblue;
		}
	}
`;

const ResponseWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;
