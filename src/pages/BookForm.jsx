import { useState } from "react"

function BookForm() {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [pages, setPages] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const newBook = { title, author, pages: parseInt(pages) }
    console.log(newBook)
    // Students will add fetch, state handling, and navigation
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
