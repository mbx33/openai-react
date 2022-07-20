import styled from 'styled-components';

function ResponseCard({ question, answer, id }) {
	return (
		<div>
			<Card key={id}>
				<InfoWrapper>
					<div className="question">
						<h1>Question: {question}</h1>
					</div>
					<div className="answer">
						<h2>Answer:{answer}</h2>
					</div>
				</InfoWrapper>
			</Card>
		</div>
	);
}

export default ResponseCard;

const Card = styled.div`
	width: 100%;
	box-shadow: 0 0 1rem #222;
	border-radius: 1.6rem;

	margin: 0.8rem auto;
`;

const InfoWrapper = styled.div`
	background-color: hsl(0, 0%, 48%);
	border-radius: 1.6rem;

	padding: 1rem 2rem;

	.question {
		padding: 0.4rem;
	}
	.answer {
		padding: 0.4rem;
	}
`;
