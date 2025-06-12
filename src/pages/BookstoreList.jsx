// import Link
import { Link } from "react-router-dom";

const BookstoreList = () => {
    const bookstores = []

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