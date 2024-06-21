import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../Context/Firebase';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';

const Details = () => {
  const params = useParams();
  const firebase = useFirebase();
  const [qty, setQty] = useState(1);
  const [data, setData] = useState(null);
  const [url, setURL] = useState('');
  const [showToast, setShowToast] = useState(false); // State to control Toast visibility
  const [toastMessage, setToastMessage] = useState(''); // State to set Toast message

  useEffect(() => {
    firebase.getBookById(params.bookId).then((value) => setData(value.data()));
  }, []);

  useEffect(() => {
    if (data) {
      const cover = data.cover;
      firebase.getImageURL(cover).then((url) => setURL(url));
    }
  }, [data]);

  const placeOrder = async () => {
    try {
      const result = await firebase.placeOrder(params.bookId, qty);
      if (result.success) {
        setToastMessage(result.message);
        setShowToast(true);
      } else {
        setToastMessage(result.message);
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setToastMessage('Failed to place order. Please try again.');
      setShowToast(true);
    }
  };

  if (data === null) return <h1>Loading...</h1>;

  return (
    <div className="container mt-2 mb-5">
      <h1>{data.name}</h1>
      <br />
      <img src={url} width="200px" style={{ borderRadius: '10px' }} alt={data.name} />
      <br />
      <br />
      <h1>Details</h1>

      <p>Price: Rs.{data.price}</p>
      <p>ISBN Number: {data.isbn}</p>

      <h1>Owner Details</h1>
      <p>Name : {data.displayName} </p>
      <p>Email : {data.userEmail}</p>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Quantity</Form.Label>
        <Form.Control onChange={(e) => setQty(e.target.value)} value={qty} type="number" placeholder="Quantity" />
      </Form.Group>

      {firebase.isLoggedin && (
        <Button onClick={placeOrder} variant="success">
          Place Order
        </Button>
      )}

      {/* Toast to display order message */}
      <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Order Status</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default Details;
