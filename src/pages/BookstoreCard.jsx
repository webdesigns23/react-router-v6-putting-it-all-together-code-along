function BookstoreCard() {
    const bookstores = null
    const id = null

    const bookstore = bookstores.find(b => b.id === id)
  
    if (!bookstore) return <h2>Bookstore not found.</h2>
  
    return (
      <div>
        <h2>{bookstore.name}</h2>
        <p>{bookstore.location}</p>
        <h3>📚 Available Books:</h3>
        <ul>
          {bookstore.books.map(book => (
            <li key={book.id}>
              <a>{book.title}</a>
            </li>
          ))}
        </ul>
        <a>Add New Book</a>
      </div>
    )
}

export default BookstoreCard
  