import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useFirebase } from '../Context/Firebase'
import {useState} from 'react'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'



const LoginPage = () => {


   const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const firebase = useFirebase();
    const navigate=useNavigate();

    useEffect(() => {
        if(firebase.isLoggedin) navigate('/');
    }, [firebase,navigate]);


    const handleSubmit =async  (e)=>{
        e.preventDefault();
       
     const result=await firebase.loginUserWithEmailAndPassword(email,password);
    
     
    }
    

    console.log(firebase);
  return (
    <div className='container mt-5'>
       <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control  onChange={(e)=>setPassword(e.target.value)} value={password}type="password" placeholder="Password" />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
    <br/>
    <Button onClick={firebase.signinWithGoogle} variant="danger" >
       Sigin with Google
      </Button>
    </div>
  )
}

export default LoginPage
