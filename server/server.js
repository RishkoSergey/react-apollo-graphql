const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const { buildSchema } = require('graphql');
const { readFileSync } = require('fs');

// -----------------------------------------------------

const schemaString = readFileSync('./schema.graphql', { encoding: 'utf8' });

const schema = buildSchema(schemaString);

const allBooks = [
	{
		id: '1',
		title: 'Война и мир',
		author: 'Лев Толстой',
		description: '«Война и мир» — роман-эпопея Льва Николаевича Толстого, описывающий русское общество в эпоху войн против Наполеона в 1805—1812 годах. Эпилог романа доводит повествование до 1820 года.',
		price: 1500,
		genre: 'Классика'
	},
	{
		id: '2',
		title: 'Гарри Поттер и философский камень',
		author: 'Джоан Роулинг',
		description: '«Гарри Поттер и философский камень» — первый роман в серии книг про юного волшебника Гарри Поттера, написанный Дж. К. Роулинг. В нём рассказывается, как Гарри узнает, что он волшебник, встречает близких друзей и немало врагов в Школе Чародейства и Волшебства «Хогвартс», а также с помощью своих друзей пресекает попытку возвращения злого волшебника Лорда Волан-де-Морта, который убил родителей Гарри (самому Гарри в тот момент был год от роду).',
		price: 2000,
		genre: 'Фантастика'
	},
	{
		id: '3',
		title: 'Оно',
		author: 'Стивен Кинг',
		description: '«Оно» — роман американского писателя Стивена Кинга, написанный в жанре ужасов, впервые опубликованный в 1986 году издательством Viking Press. Согласно основной сюжетной линии, семеро друзей из вымышленного города Дерри в штате Мэн сражаются с чудовищем, убивающим детей и способным принимать любую физическую форму.',
		price: 3500,
		genre: 'Ужасы'
	},
	{
		id: '4',
		title: 'Гарри Поттер и тайная комната',
		author: 'Джоан Роулинг',
		description: '«Гарри Поттер и Тайная комната» — второй роман в серии книг про юного волшебника Гарри Поттера, написанный Джоан Роулинг. Книга рассказывает о втором учебном годе в школе чародейства и волшебства Хогвартс, на котором Гарри и его друзья — Рон Уизли и Гермиона Грейнджер — расследуют таинственные нападения на учеников школы, совершаемые неким «Наследником Слизерина». Главному герою предстоит доказать свою непричастность к загадочным событиям и вступить в битву с могущественной темной силой.',
		price: 1900,
		genre: 'Фантастика'
	}
];

const root = {
	getBook: params => {
		return allBooks.find(({ id }) => params.id === id);
	},
	getAllGenres: () => {
		const genres = ['Все'];
		allBooks.forEach(({ genre }) => {
			if (!genres.includes(genre)) genres.push(genre);
		});
		return genres;
	},
	getBooksByGenre: params => {
		return params.genre === 'Все' ? allBooks : allBooks.filter(({ genre }) => params.genre === genre);
	},
	sortDescByPrice: () => {
		return allBooks.sort((a, b) => b.price - a.price);
	},
	sortAscByPrice: () => {
		return allBooks.sort((a, b) => a.price - b.price);
	}
};

// ------------------------------------------------------

const app = express();

app.use(cors());

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true
	})
);

app.listen(6006);

console.log('Running a GraphQL API server at http://localhost:6006/graphql');
