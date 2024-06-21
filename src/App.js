import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavbarComponent from './components/Navbar';
//pages
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import ListingPage from './pages/List';
import HomePage from './pages/Home';
import Details from './pages/Details';
import ViewOrders from './pages/ViewOrders';
import ViewOrderDetail from './pages/ViewOrderDetail';
//CSS

function App() {
  return (
    <div>
      <NavbarComponent/>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/book/list" element={<ListingPage/>} />
      <Route path="/book/view/:bookId" element={<Details/>} />
      <Route path="/book/orders" element={<ViewOrders/>} />
      <Route path="/books/orders/:bookId" element={<ViewOrderDetail/>} />
    </Routes>
    </div>
  );
}

export default App;
