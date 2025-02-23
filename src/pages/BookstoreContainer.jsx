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

  return (
    <>
      <NavBar />
      <main>
        <h1>🏬 Bookstores Directory</h1>
        {/* Students will add Outlet here for nested routes */}
      </main>
    </>
  )
}

export default BookstoreContainer