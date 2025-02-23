import NavBar from "../components/NavBar"

function Home() {
  return (
    <>
      <NavBar />
      <main>
        <h1>📚 Welcome to the Bookstore Directory 📖</h1>
        <p>
          Discover your favorite bookstores and explore their collections. Click below to start browsing!
        </p>
        <nav>
          {/* Students will add Links for navigation */}
          <a>View Bookstores</a> |{" "}
          <a>Learn More About This App</a>
        </nav>
      </main>
    </>
  )
}

export default Home
