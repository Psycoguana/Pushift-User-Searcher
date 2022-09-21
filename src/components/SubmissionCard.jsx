import { Box, Card, Icon } from 'react-bulma-components';
import '../styles/SubmissionCard.scss';

export default function SubmissionCard(props) {
	const redditBase = 'https://www.reddit.com';
	const { submissionData } = props;

	function getSubmissionDate() {
		let date = new Date(0);
		date.setUTCSeconds(submissionData.created_utc);
		const stringDate = `${date.toLocaleDateString()} - ${date.getHours()}:${date.getMinutes()}`;

		return stringDate;
	}

	function getSubmissionBody() {
		let body = submissionData.selftext;
		if (body === '') return '';

		return body.length > 200 ? `${body.slice(0, 197)}...` : body;
	}

	return (
		<a href={`${redditBase}${submissionData.permalink}`} target="_blank">
			<Card>
				<Card.Header>
					<Card.Header.Title>{submissionData.title}</Card.Header.Title>
				</Card.Header>

				<Card.Content>
					<strong>Subreddit:</strong>{' '}
					<a href={`${redditBase}/r/${submissionData.subreddit}`} target="_blank">
						{submissionData.subreddit}
					</a>{' '}
					<br />
					{getSubmissionBody()}
				</Card.Content>
				<Card.Footer>
					<div className="iconContainer">
						<Icon>
							<i className={`fas fa-arrow-${submissionData.score < 0 ? 'down' : 'up'}`} />
						</Icon>
						{submissionData.score}
					</div>

					<div className="iconContainer">
						<Icon>
							<i className="fas fa-solid fa-comments" />{' '}
						</Icon>
						{submissionData.num_comments}
					</div>

					<div className="iconContainer">
						<Icon>
							<i className="fas fa-solid fa-trophy" />{' '}
						</Icon>
						{submissionData.total_awards_received}
					</div>

					<div className="iconContainer">
						{' '}
						<Icon>
							<i className="fas fa-solid fa-clock" />{' '}
						</Icon>
						{getSubmissionDate()}
					</div>
				</Card.Footer>
			</Card>
		</a>
	);
}
