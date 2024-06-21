import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import { useFirebase } from '../Context/Firebase';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false); // State to control Toast visibility
  const [toastMessage, setToastMessage] = useState(''); // State to set Toast message
  const firebase = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (firebase.isLoggedin) navigate('/');
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.signupUserWithEmailAndPassword(email, password);
      setToastMessage('Account created successfully!');
      setShowToast(true);
    } catch (error) {
      console.error('Error signing up:', error);
      setToastMessage('Failed to create account. Please try again.');
      setShowToast(true);
    }
  };

  return (
    <div className='container mt-5'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>

      {/* Toast to display registration success message */}
      <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Registration Status</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default RegisterPage;
