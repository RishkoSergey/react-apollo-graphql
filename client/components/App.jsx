import React, { useState } from 'react';
import Books from './Books';
import Genres from './Genres';

export default () => {
	const [selectedGenre, setSelectedGenre] = useState('Все');

	return (
		<div>
      <Genres selectGenre={genre => setSelectedGenre(genre)} />
			<Books genre={selectedGenre} />
		</div>
	);
};
