import React, { useEffect ,useState} from 'react'
import { useFirebase } from '../Context/Firebase'
import BookCard from '../components/Card';


const ViewOrders = () => {
    const firebase = useFirebase();
const [books, setBooks] = useState([]);
    useEffect(() => {
        if(firebase.isLoggedin) 
        firebase.fetchMyBooks(firebase.user.uid)?.then((books) => {
            setBooks(books.docs);
        })
    }, [firebase]);

    console.log(books);
    if(!firebase.isLoggedin)
        return ;

  return (
    <div>
         <h1 className='container ml-10 mb-10' style={{textAlign:"center", marginTop:"10px"}}> Tap on View to see the orders placed </h1>
    <div className='row'  style={{ marginLeft: "20px" }}>
       
        <br/>
       {books.map((book) => (
        <BookCard
          link={`/books/orders/${book.id}`}
          key={book.id}
          id={book.id}
          {...book.data()}
          
        />
      ))}
    </div>
    </div>
  )
}

export default ViewOrders
