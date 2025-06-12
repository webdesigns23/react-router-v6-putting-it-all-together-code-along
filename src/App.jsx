import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import BookstoreContainer from "./pages/BookstoreContainer"
import BookstoreCard from "./pages/BookstoreCard"
import BookForm from "./pages/BookForm"
import BookstoreList from "./pages/BookstoreList"
import BookCard from "./pages/BookCard"
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
          <Route path="books/new" element={<BookForm />} />
          <Route path="books/:bookId" element={<BookCard />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default App