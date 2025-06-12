import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
// import Outlet, and import Link
import { Outlet, Link } from "react-router-dom"

const BookstoreContainer = () => {
  const [bookstores, setBookstores] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/bookstores")
      .then((r) => r.json())
      .then(setBookstores)
      .catch(console.error)
  }, [])

  //Add a Bookstore
  const addBookstore = (newBookstore) => {
    setBookstores(previousStores => [...previousStores, newBookstore])
  }
  
  //Update a bookstore
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
         {/* update a tag to Link component */}
        <Link to="new">Add a new Bookstore</Link>
        {/* add Outlet component */} 
        {/* Now add context for bookstore, addBookstore, and updateBookstore */}
        <Outlet context={{bookstores, addBookstore, updateBookstore}}/>
      
      </main>
    </>
  )
}

export default BookstoreContainer