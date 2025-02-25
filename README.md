# React Router v6 Putting it all Together Codealong

## Introduction 
In this technical walkthrough, we will create a Bookstore Directory application that demonstrates essential React Router v6 concepts. You'll build client-side routing that allows users to navigate between bookstores, explore books in each store, and add new bookstores and books.

This exercise will reinforce the key skills needed for the upcoming lab by practicing:

* Setting up BrowserRouter, Routes, and Route components.
* Creating nested routes for hierarchical navigation.
* Using NavLinks and Links for intuitive navigation.
* Sharing data between nested components using useOutletContext.
* Implementing programmatic navigation using the useNavigate hook.


## Instructions
### Set Up
Before we begin coding, let's complete the initial setup for this lesson: 

1. Fork and Clone
    * For this lesson you will need following GitHub Repo: https://github.com/learn-co-curriculum/react-router-v6-putting-it-all-together-code-along 
        * Go to the provided GitHub repository link.
        * Fork the repository to your GitHub account.
        * Clone the forked repository to your local machine.
2. Open and Run File
    * Open the project in VSCode.
    * Run npm install to install all necessary dependencies.

### Instructions
#### Task 1: Define the Problem
We need to build a Bookstore Directory where users can:

* View a list of bookstores.
* Add new bookstores.
* Click on a bookstore to see its details and books.
* Add new books to a store.
* View detailed information for individual books.

The application must use client-side routing to ensure navigation without page reloads and should provide nested routes for intuitive browsing.

#### Task 2: Determine the Design
The routing structure will look like:
```
/                → Home  
/about           → About  
/bookstores      → BookstoreContainer  
/bookstores/new  → BookstoreForm  
/bookstores/:id  → BookstoreCard  
/bookstores/:id/books/new → BookForm  
/bookstores/:id/books/:bookId → BookCard  
```

Key decisions:
* Nested Routing: Books will be nested within each bookstore.
* Programmatic Navigation: Redirect users after adding a new bookstore or book.
* State Sharing: Use useOutletContext for passing state between nested routes.

#### Task 3: Develop, Test, and Refine the Code

1. Step 1: Create Feature Branch, Install React Router
```bash
git checkout -b feature/routing-setup
npm install react-router-dom@6
```

2. Step 2: Set Up BrowserRouter and Main Routes
* In App.jsx:
```javascript
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import BookstoreContainer from "./pages/BookstoreContainer"

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/bookstores" element={<BookstoreContainer />} />
    </Routes>
  </BrowserRouter>
)

export default App
```
* Test that the routes are working in browser
* Commit your changes
```bash
git add .
git commit -m "Set up routing structure with main routes"
```

3. Step 3: Implement NavBar with NavLinks
* In NavBar.jsx, change a tags to NavLinks and include the route.
```javascript
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/bookstores">Bookstores</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
  );
}

export default NavBar;
```
* Commit your changes
```bash
git add .
git commit -m "Added NavBar with NavLinks"
```

4. Step 4: Set Up Nested Routes and Outlet Components
* Add first level of nested routes
```javascript
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import BookstoreContainer from "./pages/BookstoreContainer"
import BookstoreCard from "./pages/BookstoreCard"
import BookForm from "./pages/BookForm"
import BookCard from "./pages/BookCard"
import BookstoreList from "./pages/BookForm"
import BookstoreForm from "./pages/BookstoreForm"

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/bookstores" element={<BookstoreContainer />}>
        <Route path="" element={<BookstoreList />} />
        <Route path="new" element={<BookstoreForm />} />
        <Route path=":id" element={<BookstoreCard />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default App
```
* Add Outlet to BookstoreContainer
```javascript
import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
// import Outlet
import { Outlet } from "react-router-dom"

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
        {/* add Outlet component */} 
        <Outlet />
      </main>
    </>
  )
}

export default BookstoreContainer
```
* Add Book routes under BookstoreCard
```javascript
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import BookstoreContainer from "./pages/BookstoreContainer"
import BookstoreCard from "./pages/BookstoreCard"
import BookForm from "./pages/BookForm"
import BookCard from "./pages/BookCard"
import BookstoreList from "./pages/BookForm"
import BookstoreForm from "./pages/BookstoreForm"

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/bookstores" element={<BookstoreContainer />}>
        <Route path="" element={<BookstoreList />} />
        <Route path="new" element={<BookstoreForm />} />
        <Route path=":id" element={<BookstoreCard />}>
          <Route path="books/new" element={<BookForm />} />
          <Route path="books/:bookId" element={<BookCard />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
)

export default App
```
* Add Outlet to BookstoreCard
```javascript
import { Outlet } from "react-router-dom"

function BookstoreCard() {
    const bookstore = null
  
    if (!bookstore) return <h2>Bookstore not found.</h2>
  
    return (
      <div>
        <h2>{bookstore.name}</h2>
        <p>{bookstore.location}</p>
        <h3>📚 Available Books:</h3>
        <ul>
          {bookstore.books.map(book => (
            <li key={book.id}>
              <a>{book.title}</a>
            </li>
          ))}
        </ul>
        <a>Add New Book</a>
	 {/* add Outlet component */}
        <Outlet />
      </div>
    )
}

export default BookstoreCard
```
* Commit your changes
```bash
git add .
git commit -m "Add nested pages/routes"
```

5. Step 5: Set up Link components
* In BookstoreContainer:
```javascript
import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
// import Link
import { Outlet, Link } from "react-router-dom"

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
        {/* update a tag to Link component */}
        <Link to="new">Add a new Bookstore</Link>
        <Outlet />
      </main>
    </>
  )
}

export default BookstoreContainer
```
* In BookstoreCard:
```javascript
// import Link
import { Link, Outlet } from "react-router-dom"

function BookstoreCard() {
    const bookstore = null
  
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
```
* In BookstoreList:
```javascript
// import Link
import { Link } from "react-router-dom";

const BookstoreList = () => {
    const bookstores = null

   // update a tag to Link component
    const displayBookstores = bookstores.map(store => (
        <li key={store.id}><Link to={store.id}>{store.name}</Link></li>
    ))

    return (
        <ul>
            {displayBookstores}
        </ul>
    );
}

export default BookstoreList;
```
* In Home:
```javascript
// import Link
import { Link } from "react-router-dom"
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
          {/* update to Link components */}
          <Link to="/bookstores">View Bookstores</Link> |{" "}
          <Link to="/about">Learn More About This App</Link>
        </nav>
      </main>
    </>
  )
}

export default Home
```

6. Step 6: Step up Outlet Context
* Next, we need to share the bookstore data from BookstoreContainer to child routes along with any necessary functionality to change the bookstore state (add a bookstore or add a book to a bookstore)
* Starting in Bookstore Container, we need to create Outlet context for the bookstores state, the function to add a bookstore, and the function to update a bookstore (when a new book is created)
```javascript
import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import { Outlet, Link } from "react-router-dom"

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
        <Link to="new">Add a new Bookstore</Link>
	 {/* add context for bookstore, addBookstore, and updateBookstore */}
        <Outlet context={{bookstores, addBookstore, updateBookstore}}/>
      </main>
    </>
  )
}

export default BookstoreContainer
```
* Next, use outlet context in the BookList component:
```javascript
// import useOutletContext
import { Link, useOutletContext } from "react-router-dom";

const BookstoreList = () => {
    {/* use useOutletContext and destructure bookstores value */}
    const { bookstores } = useOutletContext()

    const displayBookstores = bookstores.map(store => (
        <li key={store.id}><Link to={store.id}>{store.name}</Link></li>
    ))

    return (
        <ul>
            {displayBookstores}
        </ul>
    );
}

export default BookstoreList;
```
* In BookstoreForm, use useOutletContext to set up form functionality.
```javascript
// src/pages/BookstoreForm.jsx
import { useState } from "react"
// import useOutletContext
import { useOutletContext } from "react-router-dom"

function BookstoreForm() {
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  {/* destructure addBookstore from useOutletContext */}
  const { addBookstore } = useOutletContext()

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
        {/* use addBookstore to update state */}
        addBookstore(store)
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
```
* In BookStoreCard, with useOutletContext and useParams, find the individual bookstore.
```javascript
// import useOutletContext and useParams
import { Link, Outlet, useOutletContext, useParams } from "react-router-dom"

function BookstoreCard() {
    {/* get value of bookstores from outlet context */}
    const { bookstores } = useOutletContext()
    {/* get id of bookstore from route params */}
    const { id } = useParams()

    {/* find bookstore id and all bookstores */}
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
              <Link to={`books/${book.id}`}>{book.title}</Link>
            </li>
          ))}
        </ul>
        <Link to="books/new">Add New Book</Link>
        <Outlet />
      </div>
    )
}

export default BookstoreCard 
```
* In BookstoreCard, pass bookstores and updateBookstore to child routes in the Outlet component.
```javascript
import { Link, Outlet, useOutletContext, useParams } from "react-router-dom"

function BookstoreCard() {
    {/* destructure updateBookstore as well for BookForm */}
    const { bookstores, updateBookstore } = useOutletContext()
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
              <Link to={`books/${book.id}`}>{book.title}</Link>
            </li>
          ))}
        </ul>
        <Link to="books/new">Add New Book</Link>
        {/* add bookstores and updateBookstore to context */}
        <Outlet context={{bookstores, updateBookstore}} />
      </div>
    )
}

export default BookstoreCard
```
* In BookCard, use params and outlet context to find and display a book
```javascript
// import useOutletContext and useParams
import { useOutletContext, useParams } from "react-router-dom"

function BookCard() {
    // destructure bookstores from outlet context
    const { bookstores } = useOutletContext()
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
```
* In BookForm, set up form functionality with outlet context
```javascript
import { useState } from "react"
// import useOutletContext and useParams
import { useOutletContext, useParams } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'

function BookForm() {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [pages, setPages] = useState("")
  // get bookstore id from params
  const {id} = useParams()
  // destructure bookstores and updateBookstore from outlet context
  const { bookstores, updateBookstore } = useOutletContext()

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
        // use updateBookstore to set state from api response
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
```
* Commit your changes
```bash
git add .
git commit -m "Implement outlet context to share state management of bookstores between routes"
```

6. Step 6: Programmatic Navigation After Form Submission
* In BookstoreForm.jsx, use useNavigate:
```javascript
import { useState } from "react"
// import useNavigate
import { useNavigate, useOutletContext } from "react-router-dom"

function BookstoreForm() {
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const { addBookstore } = useOutletContext()
  // call useNavigate hook to get navigate function
  const navigate = useNavigate()

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
        addBookstore(store)
        // navigate to new bookstore page
        navigate(`/bookstores/${store.id}`)
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
```
* Do the same in BookForm:
```javascript
import { useState } from "react"
// import useNavigate
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'

function BookForm() {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [pages, setPages] = useState("")
  const {id} = useParams()
  const { bookstores, updateBookstore } = useOutletContext()
  // call useNavigate hook to get navigate function 
  const navigate = useNavigate()

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
        updateBookstore(updatedBookstore)
        // navigate to new book page
        navigate(`/bookstores/${id}/books/${newBook.id}`)
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
```
* Commit your changes
```bash
git add .
git commit -m "Implemented programmatic navigation for form submissions"
```

7. Step 7: Push to GitHub, Submit PR, and Merge
* Push the branch to GitHub:
```bash
git push origin feature/routing-setup
```
* Create a Pull Request (PR) on GitHub:
    * Navigate to your repository on GitHub.
    * Click on "Compare & pull request."
    * Ensure you are requesting to merge your feature branch into the main branch of your own repo (you should see your GitHub username in both the branch you are merging and the one you are requesting to merge to.)
    * Add a brief description of the feature and submit the PR to yourself.
* Merge the PR:
    * Once reviewed, merge the feature-feature/routing-setup branch into main. You can safely delete the feature branch on GitHub when prompted once it is merged into main.
* On your local repo, pull new code from main on GitHub.
```bash
git checkout main
git pull origin main
```

#### Task 4: Document and Maintain
* Best Practice documentation steps:
    * Add comments to code to explain purpose and logic
    * Clarify intent / functionality of code to other developers
    * Add screenshot of completed work included in Markdown in README.
    * Update README text to reflect the functionality of the application following https://makeareadme.com. 
    * Delete any stale branches on GitHub
* Remove unnecessary/commented out code
* If needed, update git ignore to remove sensitive data
