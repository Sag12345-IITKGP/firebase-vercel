import {useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useFirebase } from '../Context/Firebase'
import { useNavigate } from 'react-router-dom'


const ListingPage = () => {
   const navigate=useNavigate();
   const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [isbnNumber, setIsbnNumber] = useState('');
    const [price, setPrice] = useState('');
    const [coverPic, setCoverpic] = useState('');
    const firebase = useFirebase();

  

    const handleSubmit =async  (e)=>{
        e.preventDefault();
       await firebase.handleCreateNewListing(name,isbnNumber,price,coverPic);
    }


  return (
    <div className='container mt-5'>
    <Form onSubmit={handleSubmit}>
   <Form.Group className="mb-3" controlId="formBasicEmail">
     <Form.Label>Enter book Name</Form.Label>
     <Form.Control onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="Enter Book name" />
     <Form.Text className="text-muted">
       We'll never share your email with anyone else.
     </Form.Text>
   </Form.Group>

   <Form.Group className="mb-3" controlId="formBasicPassword">
     <Form.Label>ISBN number</Form.Label>
     <Form.Control  onChange={(e)=>setIsbnNumber(e.target.value)} value={isbnNumber}type="text" placeholder="Enter Isbn Number" />
   </Form.Group>

   <Form.Group className="mb-3" controlId="formBasicPassword">
     <Form.Label>Price</Form.Label>
     <Form.Control  onChange={(e)=>setPrice(e.target.value)} value={price}type="text" placeholder="Enter the price" />
   </Form.Group>

   <Form.Group className="mb-3" controlId="formBasicPassword">
     <Form.Label>Price</Form.Label>
     <Form.Control  onChange={(e)=>setCoverpic(e.target.files[0])} type="file"  />
   </Form.Group>
   
   <Button variant="primary" type="submit">
     Create
   </Button>
 </Form>
 
 </div>
  )
}

export default ListingPage
