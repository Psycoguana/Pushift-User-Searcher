import { useState } from 'react';
import { Button, Box, Icon, Form } from 'react-bulma-components';

import '../styles/Filter.scss';
import { Columns } from 'react-bulma-components';
import axios from 'axios';

export default function Filter(props) {
	const { setLink } = props;

	const [username, setUsername] = useState('');
	const [subreddit, setSubreddit] = useState('');
	const [sort, setSort] = useState('desc');
	const [nsfw, setNsfw] = useState('');
	const [sortBy, setSortBy] = useState('created_utc');
	const [keyword, setKeyword] = useState('');

	function handleSearchBtn(e) {
		e.preventDefault();

		// Check if user exists.
		axios.get(`https://www.reddit.com/api/username_available.json?user=${username}`).then((response) => {
			if (response.data === true) alert('User NOT exists');
			return;
		});

		let baseUrl = 'https://api.pushshift.io/reddit/search/submission/?limit=10&';
		if (username) baseUrl += `author=${username}&`;
		if (subreddit) baseUrl += `subreddit=${subreddit}&`;
		if (nsfw) baseUrl += `over_18=${nsfw}&`;
		if (keyword) baseUrl += `q=${keyword}&`;

		baseUrl += `sort_type=${sortBy}&`;
		baseUrl += `order=${sort}&`;
		baseUrl += 'metadata=true&';

		setLink(baseUrl);
	}

	function getSortIcon() {
		switch (sortBy) {
			case 'score':
				return 'fa-thumbs-up';
			case 'num_comments':
				return 'fa-comments';
			default:
				return 'fa-clock';
		}
	}

	function getNsfwIcon() {
		switch (nsfw) {
			case 'false':
				return '🙂';
			case 'true':
				return '😈';
			default:
				return '🙂 😈';
		}
	}

	return (
		<Box className="filterContainer">
			<form
				onSubmit={(e) => {
					handleSearchBtn(e);
				}}
			>
				<Form.Field>
					<Icon>
						<i className="fas fa-solid fa-user" />{' '}
					</Icon>
					<Form.Label>Username</Form.Label>
					<Form.Control>
						<Form.Input
							placeholder="Enter a username"
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
							}}
						/>
					</Form.Control>
				</Form.Field>

				<Form.Field>
					<Icon>
						<i className="fas fa-solid fa-list" />{' '}
					</Icon>
					<Form.Label>Subreddit (you can add several using a comma)</Form.Label>
					<Form.Control>
						<Form.Input
							placeholder="askreddit,science"
							value={subreddit}
							onChange={(e) => {
								setSubreddit(e.target.value);
							}}
						/>
					</Form.Control>
				</Form.Field>

				<Form.Field>
					<Icon>
						<i className="fas fa-solid fa-keyboard" />{' '}
					</Icon>
					<Form.Label>Keyword</Form.Label>
					<Form.Control>
						<Form.Input
							placeholder="Enter a keyword"
							value={keyword}
							onChange={(e) => {
								setKeyword(e.target.value);
							}}
						/>
					</Form.Control>
				</Form.Field>

				<Form.Field>
					<Form.Label>
						Sort
						<Icon>
							<i className={`fas fa-solid ${getSortIcon()}`} />{' '}
						</Icon>
						<Icon>
							<i className={`fas fa-solid fa-sort-${sort === 'asc' ? 'up' : 'down'}`} />{' '}
						</Icon>
					</Form.Label>

					<Columns>
						<Columns.Column>
							<Form.Select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
								<option value="created_utc">Creation Date</option>
								<option value="score">Score</option>
								<option value="num_comments">Comment Number</option>
							</Form.Select>
						</Columns.Column>
						<Columns.Column>
							<Form.Select onChange={(e) => setSort(e.target.value)} value={sort}>
								<option value="asc">Ascendent</option>
								<option value="desc">Descendent</option>
							</Form.Select>
						</Columns.Column>
					</Columns>
				</Form.Field>

				<Form.Field>
					<Form.Label>NSFW {getNsfwIcon()}</Form.Label>
					<Form.Select onChange={(e) => setNsfw(e.target.value)} value={nsfw}>
						<option value="">Both NSFW and SFW Content</option>
						<option value="false">Only SFW Content</option>
						<option value="true">Only NSFW Content</option>
					</Form.Select>
				</Form.Field>

				<Button color="primary">Search</Button>
			</form>
		</Box>
	);
}
