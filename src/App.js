import { useState } from "react";
import "./App.css";

function App() {
	const [searchText, setSearchText] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [filterData, setFilterData] = useState([]);

	const onChangeHandler = async ({ target: { value } }) => {
		setSearchText(() => value);
	};

	const fetchFilterDataHandler = async (e) => {
		e.preventDefault();
		if (!searchText.trim()) {
			setFilterData([]);
			return;
		}
		setIsLoading(true);
		try {
			const res = await fetch(
				`http://openlibrary.org/search/inside.json?q="${searchText}"`
			).then((r) => r.json());
			const filterData = (res?.hits?.hits || []).reduce((a, i) => {
				if (i.edition) {
					const dt = i?.fields?.created_on || new Date();
					a.push({
						title: i.edition.title,
						author: i.edition?.authors?.[0]?.name || "N/A",
						coverUrl: i.edition.cover_url,
						publishedDate: new Date(dt).toDateString(),
					});
				}
				return a;
			}, []);
			setFilterData(filterData);
			console.log("response checking", filterData);
		} catch (e) {
			console.warn(e);
		}
		setIsLoading(false);
	};

	const descAscOrderHandler = (order, key) => {
		const newOrderData = filterData.sort((a, b) => {
			const aKey = key === "publishedDate" ? new Date(a[key]) : a[key];
			const bKey = key === "publishedDate" ? new Date(b[key]) : b[key];
			if (aKey > bKey) {
				return order === "d" ? -1 : 1;
			}
			if (bKey > aKey) {
				return order === "d" ? 1 : -1;
			}
			return 0;
		});
		setFilterData([...newOrderData]);
	};

	const booksContent = () => {
		if (isLoading) {
			return (
				<h1 className="loading">{`fetching books with matching string ${searchText}...`}</h1>
			);
		}
		if (!filterData.length) {
			return <h1 className="no-results">No Results Found</h1>;
		}
		return (
			<div className="container">
				{filterData.map(({ title, author, coverUrl, publishedDate }) => (
					<div key={coverUrl} className="book">
						<div className="book-img-container">
							<img src={coverUrl} alt={title} className="book-img" />
						</div>
						<div className="title-container">
							<div className="title-author" title={`Title: ${title}`}>
								{title}
							</div>
							<div className="title-author" title={`Author: ${author}`}>
								{author}
							</div>
							<div title={`Published Date: ${publishedDate}`}>
								{publishedDate}
							</div>
						</div>
					</div>
				))}
			</div>
		);
	};

	return (
		<div className="App">
			<div>
				<div>
					<form onSubmit={fetchFilterDataHandler}>
						<input
							value={searchText}
							onChange={onChangeHandler}
							className="input-cls"
							placeholder="Please enter book title to fetch..."
						/>
					</form>
				</div>
				{!!filterData.length && (
					<div className="center-cls">
						<div className="sort-container">
							<div>Title Sort</div>
							<div style={{ marginLeft: 20 }}>
								<div
									style={{ transform: "rotate(180deg)" }}
									className="pointer-cls"
									onClick={() => descAscOrderHandler("a", "title")}
								>
									&#9947;
								</div>
								<div
									className="pointer-cls"
									onClick={() => descAscOrderHandler("d", "title")}
								>
									&#9947;
								</div>
							</div>
						</div>
						<div className="sort-container" style={{ marginLeft: 30 }}>
							<div>Date Sort</div>
							<div style={{ marginLeft: 20 }}>
								<div
									className="pointer-cls"
									style={{ transform: "rotate(180deg)" }}
									onClick={() => descAscOrderHandler("a", "publishedDate")}
								>
									&#9947;
								</div>
								<div
									className="pointer-cls"
									onClick={() => descAscOrderHandler("d", "publishedDate")}
								>
									&#9947;
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			{booksContent()}
		</div>
	);
}

export default App;
