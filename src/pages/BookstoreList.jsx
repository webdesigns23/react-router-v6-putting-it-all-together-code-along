const BookstoreList = () => {
    const bookstores = []

    const displayBookstores = bookstores.map(store => (
        <li key={store.id}><a>{store.name}</a></li>
    ))

    return (
        <ul>
            {displayBookstores}
        </ul>
    );
}

export default BookstoreList;