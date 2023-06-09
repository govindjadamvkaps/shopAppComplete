// import logo from './logo.svg';
import './App.css';
import NavBar from './comonents/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './comonents/Home';
import Footer from './comonents/Footer';
import Post from './comonents/Post';
import Categories from './comonents/Categories';
import Users from './comonents/Users';
import Details from './comonents/Details';
import Profile from './comonents/Profile';
import Settings from './comonents/Settings';
import Login from './comonents/Login';
import CategoryDetail from './comonents/CategoryDetail';
import PostDetails from './comonents/PostDetails';
import UserDetail from './comonents/UserDetail';

function App() {
  return (
    <BrowserRouter>
    <NavBar></NavBar>
    <Routes>
      <Route exact path ='/deshboard' element={<Home/>}></Route>
      <Route exact path ='/posts' element={<Post/>}></Route>
      <Route exact path ='/categories' element={<Categories/>}></Route>
      <Route exact path ='/users' element = {<Users/>}></Route>
      <Route exact path ="/details" element={<Details/>}></Route>
      <Route exact path ='/profile' element={<Profile/>}></Route>
      <Route exact path = '/settings' element={<Settings/>}></Route>
      <Route exact path ='/' element={<Login/>}></Route>
      <Route exact path ='/details/:id' element={<Details/>}></Route>
      <Route exact path ='/category-details' element={<CategoryDetail/>}></Route>
      <Route exact path ='/category-details/:id' element={<CategoryDetail/>}></Route>
      <Route exact path = '/post-details' element={<PostDetails/>}></Route>
      <Route exact path = '/post-details/:id' element={<PostDetails/>}></Route>
      <Route exact path = '/user-details' element={<UserDetail/>}></Route>
      <Route exact path = '/user-details/:id' element={<UserDetail/>}></Route>
      
    </Routes>
    <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
