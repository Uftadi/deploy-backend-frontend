import { useEffect, useState } from "react";

function App() {
	const [books, setBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [genre, setGenre] = useState("");
	const [publicationYear, setPublicationYear] = useState("");
	const [rating, setRating] = useState("");

	useEffect(() => {
		try {
			const fetchData = async () => {
				const response = await fetch(
					`https://backend-frontend-deploy.onrender.com/books/getAllBooks`
				);
				const data = await response.json();
				setBooks(data);
				setIsLoading(true);
			};
			fetchData();
		} catch (error) {
			console.log(error);
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		let res = await fetch(
			"https://backend-frontend-deploy.onrender.com/books/addNewBook",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: title,
					author: author,
					genre: genre,
					publication_year: publicationYear,
					rating: rating,
				}),
			}
		);
		await res.json();
	};

	const handleDeleteButton = async (e) => {
		e.preventDefault();
		let apiUrl =
			"https://backend-frontend-deploy.onrender.com/books/deleteBook";
		await fetch(`${apiUrl}/${e.target.value.id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
	};

	return (
		<>
			<h1>Random Books</h1>
			<ul>
				{isLoading === true
					? books.books.map((book) => {
							return (
								<>
									<li key={book.id}>
										{book.title} from {book.author} <br />
										Genre: {book.genre} <br />
										Publication Year: {book.publication_year} <br />
										Rating: {book.rating}
										<button onClick={handleDeleteButton}>delete</button>
									</li>
								</>
							);
					  })
					: "is Loading"}
			</ul>
			<form onSubmit={handleSubmit}>
				<label htmlFor="title">
					Title:
					<input
						type="text"
						name="title"
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</label>
				<label htmlFor="author">
					Author
					<input
						type="text"
						name="author"
						id="author"
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
					/>
				</label>
				<label htmlFor="genre">
					Genre
					<input
						type="text"
						name="genre"
						id="genre"
						value={genre}
						onChange={(e) => setGenre(e.target.value)}
					/>
				</label>
				<label htmlFor="publication_year">
					Publication year
					<input
						type="text"
						name="publication_year"
						id="publication_year"
						value={publicationYear}
						onChange={(e) => setPublicationYear(e.target.value)}
					/>
				</label>
				<label htmlFor="rating">
					Rating
					<input
						type="text"
						name="rating"
						id="rating"
						value={rating}
						onChange={(e) => setRating(e.target.value)}
					/>
				</label>
				<button type="submit">add</button>
			</form>
		</>
	);
}

export default App;
