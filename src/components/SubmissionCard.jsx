import { useState } from 'react';
import axios from 'axios';
import { Card, Icon } from 'react-bulma-components';
import '../styles/SubmissionCard.scss';
import { useEffect } from 'react';

export default function SubmissionCard(props) {
	const redditBase = 'https://www.reddit.com';
	const { submissionData } = props;
	const [postStatus, setPostStatus] = useState('good');

	useEffect(() => {
		const url = `${redditBase}${submissionData.permalink}.json`;
		axios
			.get(url)
			.then((response) => {
				try {
					if (response.data[0].data.children[0].data.author === '[deleted]') {
						setPostStatus('deleted');
					}
				} catch (e) {
					console.log(e);
				}
			})
			.catch((error) => {
				if (error.response.status === 403) {
					setPostStatus('private');
				}
			});
	});

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

	function getPrivateIcon() {
		return (
			<Icon>
				<i className={`fas fa-solid fa-lock`} />
			</Icon>
		);
	}

	return (
		<a href={`${redditBase}${submissionData.permalink}`} target="_blank" rel="noreferrer">
			<Card className={postStatus}>
				<Card.Header>
					<Card.Header.Title>
						{postStatus === 'private' ? getPrivateIcon() : ''}
						{submissionData.title}
					</Card.Header.Title>
				</Card.Header>

				<Card.Content>
					<strong>Subreddit:</strong>{' '}
					<a href={`${redditBase}/r/${submissionData.subreddit}`} target="_blank" rel="noreferrer">
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
