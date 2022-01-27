import { useEffect, useState } from 'react';
import api from '../api';

const BookingGrid = ({counter, setCounter}) => {

    const [bookings, setBookings] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        fetchBookings()
      }, [counter])

    const fetchBookings = () => {
        api.listBookings().then((response) => {
            setBookings(response.data)
        }).catch((error) => {
            setErrorMessage(error.response.data.message)
         });
    }
    
    const updateBooking = (booking_id, apartment_id, status) => {
        return api.updateBooking({booking_id: booking_id, apartment_id: apartment_id, status: status}).then(() => {
            fetchBookings()
            if(counter > 0){
                setCounter(counter-1)
            }
        }).catch((error) => {
            Object.keys(error.response.data.message).forEach(key => {
                setErrorMessage(error.response.data.message[key])
            })
         });
    }

    return <div class="grid-container">
        <div className={errorMessage !== '' ? 'error-message active' : 'error-message'}>{errorMessage}</div>
        {bookings.map(item => (
            <div class="grid-item">
                <div class="item-description">
                    <div><span class="item-label">Name: </span>{item.name}</div>
                    <div><span class="item-label">Description: </span>{item.birth_date}</div>
                </div>
                <div class="action-container">
                    <div class="submit-button" onClick={() => updateBooking(item.id, item.apartment.id, 'approved')}>Accept</div>
                    <div class="submit-button" onClick={() => updateBooking(item.id, item.apartment.id, 'rejected')}>Reject</div>
                </div>
            </div>
        ))}
    </div>
}

export default BookingGrid;
