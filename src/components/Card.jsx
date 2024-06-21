import {useState,useEffect}from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../Context/Firebase'
import { useNavigate } from 'react-router-dom';

const BookCard = (props) => {
    const navigate=useNavigate();
    const firebase=useFirebase();
    const [url,setURL]=useState('');
    // console.log(props);
    useEffect(() => {
    firebase.getImageURL(props.cover).then((url)=>setURL(url))
    },[]);
  return (
    <Card style={{ width: '18rem' ,margin:"20px"}}>
    <Card.Img variant="top" src={url}  />
    <Card.Body>
      <Card.Title>{props.name}</Card.Title>
      <Card.Text>
        This book costs {props.price}
      </Card.Text>
      <Button onClick={e=>navigate(props.link)}variant="primary">view</Button>
    </Card.Body>
  </Card>
  )
}

export default BookCard
