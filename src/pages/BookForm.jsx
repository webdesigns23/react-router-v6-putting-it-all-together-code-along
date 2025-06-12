import { useState } from "react"
// import useOutletContext and useParams
import { useOutletContext, useParams } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'

function BookForm() {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [pages, setPages] = useState("")

  //const bookstores = []
   // destructure bookstores and updateBookstore from outlet context
  const { bookstores, updateBookstore } = useOutletContext()

  //const id = null
  // get bookstore id from params
  const {id} = useParams()

  // find bookstore using id and all bookstores
  const bookstore = bookstores.find(store => store.id === id)  
  if (!bookstore) { return <h2>Bookstore not found.</h2>}


  const handleSubmit = (e) => {
    e.preventDefault()
    const newBook = { 
        id: uuidv4(),
        title, 
        author, 
        pages: parseInt(pages) 
    }
    console.log(newBook)
    fetch(`http://localhost:4000/bookstores/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({books: [...bookstore.books, newBook]})
    })
    .then(r => {
        if (!r.ok) { throw new Error("failed to add book") }
        return r.json()
    })
    .then(updatedBookstore => {
        //console.log(updatedBookstore)
        //Now use updateBookstore to set state from api response
        updateBookstore(updatedBookstore)
    })
    .catch(console.log)
  }

  return (
    <div>
      <h2>Add New Book 📚</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Pages"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          required
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  )
}

export default BookForm
