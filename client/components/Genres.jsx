import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import * as GetAllGenres from '../queries/GetAllGenres.graphql';

export default ({ selectGenre }) => {
	const { data, loading } = useQuery(GetAllGenres);

	return (
		<div>
			{loading && <div>Loading...</div>}

			{!loading && data.getAllGenres && (
				<ul>
					{data.getAllGenres.map(genre => (
						<li key={genre}>
							<button onClick={() => selectGenre(genre)}>{genre}</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
