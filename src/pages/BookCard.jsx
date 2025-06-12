// import useOutletContext and useParams
import { useOutletContext, useParams } from "react-router-dom"

function BookCard() {
  //const bookstores = []
  // destructure bookstores from outlet context
  const { bookstores } = useOutletContext()

  //const id = null
  // get id and bookId from params
  const { id, bookId } = useParams()

  // find bookstore from id and bookstores
  const bookstore = bookstores.find(store => store.id === id)
  if (!bookstore) return <h2>Bookstore not found.</h2>

  // find book from bookId and bookstore
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
