import { useEffect, useState } from 'react';
import { Button, Container, Heading } from 'react-bulma-components';
import SubmissionCard from './components/SubmissionCard';

import Filter from './components/Filter';

import axios from 'axios';

import './App.scss';

import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Columns } from 'react-bulma-components';

function App() {
	const [submissions, setSubmissions] = useState([]);
	const [link, setLink] = useState('');

	// Get submissions when the link state updates.
	useEffect(() => {
		getSubmissions({ newSearch: true });
	}, [link]);

	function getSubmissions(props) {
		if (!link) return;
		const { newSearch } = props;
		let url = link;

		if (submissions.length) {
			if (url.includes('sort=asc')) {
				const last_created_utc = submissions[submissions.length - 1]['created_utc'];
				url += `after=${last_created_utc}`;
			} else {
				const last_created_utc = submissions[submissions.length - 1]['created_utc'];

				url += `before=${last_created_utc}`;
			}
		}

		axios.get(url).then((response) => {
			if (newSearch) {
				return setSubmissions(response.data.data);
			} else {
				setSubmissions((oldState) => {
					return [...oldState, ...response.data.data];
				});
			}
		});
	}

	return (
		<div className="App">
			<Heading>Search reddit posts</Heading>
			<Container>
				<Filter setLink={setLink}></Filter>

				<Columns>
					{submissions.length > 0 &&
						submissions.map((submission) => (
							<Columns.Column size={'one-third'} key={submission.id}>
								<SubmissionCard submissionData={submission} />
							</Columns.Column>
						))}
				</Columns>
				{submissions.length > 0 && (
					<Button className="loadMore" color="success" onClick={getSubmissions}>
						Load More...
					</Button>
				)}
			</Container>
		</div>
	);
}

export default App;
