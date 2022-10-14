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
	const [submissionsLeft, setSubmissionsLeft] = useState(null);

	// Get submissions when the link state updates.
	useEffect(() => {
		getSubmissions({ newSearch: true });
	}, [link]);

	function getSubmissions(props) {
		if (!link) return;
		const { newSearch } = props;
		let url = link;

		if (submissions.length && !newSearch) {
			const last_created_utc = submissions[submissions.length - 1]['created_utc'];

			if (url.includes('sort=asc')) {
				url += `after=${last_created_utc}`;
			} else {
				url += `before=${last_created_utc}`;
			}
		}

		axios.get(url).then((response) => {
			const submissions = response.data.data;

			if (newSearch) {
				setSubmissionsLeft(response.data.metadata.total_results - submissions.length);
				setSubmissions(submissions);
			} else {
				setSubmissions((oldState) => [...oldState, ...submissions]);
				setSubmissionsLeft((oldValue) => oldValue - submissions.length);
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
				{submissionsLeft > 0 && (
					<Button className="loadMore" color="success" onClick={getSubmissions}>
						Load More... ({submissionsLeft})
					</Button>
				)}
			</Container>
		</div>
	);
}

export default App;
