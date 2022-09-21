export default function Pagination(props) {
	const { total, currentPage, setCurrentPage } = props;

	function handleClick(e) {
		setCurrentPage((oldState) => {
			return e.classList.contains('pagination-previous') ? oldState - 1 : oldState + 1;
		});
	}

	return (
		<nav className="pagination is-centered" role="navigation" aria-label="pagination">
			<a
				className={`pagination-previous ${currentPage === 1 ? 'is-disable' : ''}`}
				onClick={(e) => handleClick(e.target)}
			>
				Previous
			</a>
			<div className="pagination-list">
				Page {currentPage}/{total}
			</div>
			<a
				className={`pagination-next ${currentPage === total ? 'is-disabled' : ''}`}
				onClick={(e) => handleClick(e.target)}
			>
				Next page
			</a>
		</nav>
	);
}
