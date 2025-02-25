function BookCard() {
    const bookstores = []
    const id = null

    const bookstore = bookstores.find(store => store.id === id)

    if (!bookstore) return <h2>Bookstore not found.</h2>

    const book = bookstore.books.find(b => b.id === bookId)
  
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
  