import  { useEffect ,useState} from 'react'
import {useParams} from 'react-router-dom'
import { useFirebase } from '../Context/Firebase';

const ViewOrderDetail = () => {
    const params=useParams();
    const firebase=useFirebase();
    const [orders,setOrders]=useState([]);

    useEffect(() => {
        firebase.getOrders(params.bookId).then((orders)=>setOrders(orders.docs))
    }, []);

  return (
    
    <div className="container mt-3">
    <h1>Orders</h1>
    
    {orders.length === 0 ? (
      <p>No orders placed for this Book</p>
    ) : (
      orders.map((order) => {
        const data = order.data();
        return (
          <div
            key={order.id}
            className="mt-5"
            style={{ border: "1px solid", padding: "10px" }}
          >
            <h5>Order By: {data.displayName}</h5>
            <h6>Qty: {data.qty}</h6>
            <p>Email: {data.userEmail}</p>
          </div>
        );
      })
    )}
  </div>
  )
}

export default ViewOrderDetail
