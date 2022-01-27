import { Routes, Route, Link, useNavigate} from "react-router-dom";
import { useEffect, useState} from 'react';
import Echo from 'laravel-echo';
import "./App.css";
import Login from './components/Login';
import Publish from './components/Publish';
import Booking from './components/Booking';
import BookingGrid from './components/BookingGrid';
import Home from './components/Home';
import api from './api';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: '4886899d56bb5b04d768',
  cluster: 'eu',
});

function App() {

  const [user, setUser] = useState(null)
  const [counter, setCounter] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
  }, [])

  window.Echo.channel('booking-apartment').listen('BookingStatusEvent', (event) => {
      setCounter(event.booking)
  })

  const renderPublish = () => {
    return user && user.role == 'landlord' ? <Link to="/publish">publish</Link> : null
  }

  const renderLogin = () => {
    return user ? <a href="#" onClick={() => logout()}>logout</a> : <Link to="/login">login</Link>
  }

  const renderBookingList = () => {
    return user && user.role == 'landlord' ? <span>
        <Link to="/bookingList">bookings</Link><span className={counter ? 'counter active' : 'counter'}>{counter}</span>
      </span> : null
  }

  const logout = () => {
    api.logout().then(() => {
      localStorage.clear();
      setUser(null)
      navigate('/home');
    })
  }

  return (
    <div className="App">
      <nav class="navbar">
        <Link to="/home">home</Link>
        {renderPublish()}
        {renderLogin()}
        {renderBookingList()}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home user={user}/>} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/bookingList" element={<BookingGrid counter={counter} setCounter={setCounter}/>} />
      </Routes>
    </div>
  );
}

export default App;
