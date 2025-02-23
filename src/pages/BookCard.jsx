function BookCard() {
    // Replace with dynamic data
    const book = null
  
    if (!book) return <h2>Book not found.</h2>
  
    return (
      <div>
        <h2>{book.title}</h2>
        <p>🖊️ Author: {book.author}</p>
        <p>📄 Pages: {book.pages}</p>
      </div>
    )
}
  
export default BookCard
  