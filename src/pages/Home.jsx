import { useEffect, useState } from 'react';
import BookCard from '../components/Card';
import { useFirebase } from '../Context/Firebase';
import './HomePage.css';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const firebase = useFirebase();

  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books.docs));
  }, [firebase]);

  return (
    <div className='home-page-container'>
      <h1 className='page-title'>Welcome to Bookify!</h1>
      <div className='card-container'>
        {books.map((book) => (
          <BookCard
            link={`/book/view/${book.id}`}
            key={book.id}
            id={book.id}
            {...book.data()}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
