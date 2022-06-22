import styled from 'styled-components';

function ResponseCard({ question, answer, key }) {
	// console.log(answer);
	return (
		<div key={key}>
			<Card>
				<InfoWrapper>
					<h1>{question}</h1>
					<h2>{answer}</h2>
				</InfoWrapper>
			</Card>
		</div>
	);
}

export default ResponseCard;

const Card = styled.div``;

const InfoWrapper = styled.div``;
