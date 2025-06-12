//import Outlet, and import Link
import { Link, Outlet } from "react-router-dom"

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
            {/* update to Link component */}
            <Link to={`books/${book.id}`}>{book.title}</Link>
          </li>
        ))}
      </ul>
        {/* update to Link component */}
        <Link to="books/new">Add New Book</Link>
        <Outlet />
    </div>
  )
}

export default BookstoreCard
