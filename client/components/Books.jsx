import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import * as GetBooksByGenre from '../queries/GetBooksByGenre.graphql';


export default ({ genre }) => {
	const { data, loading } = useQuery(GetBooksByGenre, {
		variables: {
			genre
		}
	});

	return (
		<div>
			<h1>All books</h1>

			{loading && <div>Loading...</div>}

      {!loading && data.getBooksByGenre && (
				<ul>
					{data.getBooksByGenre.map(book => (
						<li key={book.title}>
							{book.title}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
