import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import api from '../api';

const Booking = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const apartment = location.state ? location.state.apartment : {}
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        return api.book({
            name: event.target.name.value,
            birth_date: event.target.birth_date.value,
            apartment_id: parseInt(event.target.apartment_id.value),
        }).then(() => {
            navigate('/home');
        }).catch((error) => {
            Object.keys(error.response.data.message).forEach(key => {
                setErrorMessage(error.response.data.message[key])
            })
         });
    }

    return <div class="form-container form-booking">
            <div class="grid-container booking">
                <div class="grid-item">
                    <div class="item-description">
                        <div><span class="item-label">Title: </span>{apartment.title}</div>
                        <div><span class="item-label">Description: </span>{apartment.description}</div>
                        <div><span class="item-label">Features: </span>{apartment.features ?
                            apartment.features.map(item => item.name+" ") : null}
                         </div>
                    </div>
                </div>
            </div>
            <form class="main-form" onSubmit={(event) => handleSubmit(event)}>
                <input name="name" required/>
                <input type="date" name="birth_date" required/>
                <input type="hidden" name="apartment_id" value={apartment.id}/>
                <input type="submit" class="submit-button" value="Send"/>
            </form>
            <div className={errorMessage !== '' ? 'error-message active' : 'error-message'}>{errorMessage}</div>
        </div>
}

export default Booking;
