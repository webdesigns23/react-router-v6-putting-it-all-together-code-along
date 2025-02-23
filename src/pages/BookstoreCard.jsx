function BookstoreCard() {
    // Replace with dynamic data
    const bookstore = null
  
    if (!bookstore) return <h2>Bookstore not found.</h2>
  
    return (
      <div>
        <h2>{bookstore.name}</h2>
        <p>{bookstore.location}</p>
        <h3>📚 Available Books:</h3>
        <ul>
          {bookstore.books.map((book) => (
            <li key={book.id}>
              {/* Students will add Links to individual BookCard */}
              <a>{book.title}</a>
            </li>
          ))}
        </ul>
        {/* Link to add a new book */}
        <a>Add New Book</a>
        {/* Students will add Outlet here for nested book routes */}
      </div>
    )
}

export default BookstoreCard
  