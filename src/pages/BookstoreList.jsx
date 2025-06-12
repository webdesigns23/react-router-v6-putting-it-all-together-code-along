// import Link and import useOutletContext
import { Link, useOutletContext } from "react-router-dom";

const BookstoreList = () => {
    //const bookstores = []
    // Now use useOutletContext and destructure bookstores value:
    const { bookstores } = useOutletContext()

    // const displayBookstores = bookstores.map(store => (
    //     <li key={store.id}><a>{store.name}</a></li>
    // ))

    // update a tag above to Link component
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