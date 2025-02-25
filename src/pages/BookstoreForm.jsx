import { useState } from "react"

function BookstoreForm() {
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const newStore = { name, location, books: [] }
    console.log(newStore)
    fetch("http://localhost:4000/bookstores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newStore)
    })
    .then(r => {
        if (!r.ok) { throw new Error("failed to save bookstore") }
        return r.json()
    })
    .then(store => {
        console.log(store)
    })
    .catch(console.log)
  }

  return (
    <div>
      <h2>Add New Bookstore 🏬</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Bookstore Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <button type="submit">Add Bookstore</button>
      </form>
    </div>
  )
}

export default BookstoreForm
