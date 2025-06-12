//import Outlet, Link, useOutletContext, useParams
import { Link, Outlet, useOutletContext, useParams } from "react-router-dom"

function BookstoreCard() {
  //const bookstores = null
  // Now get value of bookstores from outlet context
  const { bookstores, updateBookstore } = useOutletContext()

  //const id = null
  // Now get id of bookstore from route params
  const { id } = useParams()

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
      {/* add bookstores and updateBookstore to context */}
      <Outlet context={{bookstores, updateBookstore}} />
    </div>
  )
}

export default BookstoreCard
