import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import About from './components/About';
import Shop from './components/Shop';
import Contact from './components/Contact';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Thankyou from './components/Thankyou';
import ShopSingle from './components/ShopSingle';
import FetchData from './components/FetchData';
import Login from './components/Login';
import Registration from './components/Registration';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Payment from './components/Payment';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/sign-up' element={<Registration />}></Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/shop' element={<Shop />}></Route>
        <Route path='contact' element={<Contact />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path='/cart/checkout' element={<Checkout />}></Route>
        <Route path='/thankyou' element={<Thankyou />}></Route>
        <Route path='/shop-single/:id' element={<ShopSingle />}></Route>
        <Route path='/cart/:id' element={<Cart />}></Route>
        <Route path='/payment' element={<Payment/>}></Route>
        <Route path='/checkout-success' element={<Thankyou/>}></Route>
      </Routes>
      <Footer />
      <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;
