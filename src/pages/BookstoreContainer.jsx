import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"

const BookstoreContainer = () => {
  const [bookstores, setBookstores] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/bookstores")
      .then((r) => r.json())
      .then(setBookstores)
      .catch(console.error)
  }, [])

  const addBookstore = (newBookstore) => {
    setBookstores(previousStores => [...previousStores, newBookstore])
  }

  const updateBookstore = (updatedBookstore) => {
    setBookstores(previousStores => previousStores.map(store => {
        if (store.id === updatedBookstore.id) {
            return updatedBookstore
        }
        return store
    }))
  }

  return (
    <>
      <NavBar />
      <main>
        <h1>🏬 Bookstores Directory</h1>
        <a>Add a new Bookstore</a>
      </main>
    </>
  )
}

export default BookstoreContainer