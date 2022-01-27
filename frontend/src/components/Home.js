import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import api from '../api';

const Home = ({user}) => {

    const [apartments, setApartments] = useState([])
    const [filters, setFilters] = useState([])
    const [features, setFeatures] = useState([])

    useEffect(() => {
        fetchApartments()
        fetchFeatures()
      }, [filters])

    const fetchApartments = () => {
        api.listApartment(filters).then((response) => {
            setApartments(response.data)
        })
    }

    const fetchFeatures = () => {
        api.listFeatures().then((response) => {
            setFeatures(response.data)
        })
    }

    const updateFilters = (event, feature_id) => {
        if(event.target.checked){
            setFilters(filters => [...filters, feature_id]);
        }else{
            setFilters(filters.filter(item => item !== feature_id));
        }
    }

    const renderRequestBooking = (item) => {
        if(user && user.role == 'user'){
            return <div class="action-container"><Link class="submit-button" to={"/booking"} state={{apartment: item}}>
                Request Booking
                </Link>
            </div>
        }
        return null
    }

    return <div class="main-container">
        <div class="filters">
            <div class="filters-title">Filters</div>
            <div class="filters-container">
                {features.map(item => (
                    <div class="features">
                        <input type="checkbox" name="features" value={item.id} onChange={(event) => updateFilters(event, item.id)}/>{item.name}<br/>
                    </div>
                ))}
            </div>
        </div>
        <div class="grid-container">
            {apartments.map(item => (
                <div class="grid-item">
                    <div class="item-description">
                        <div><span class="item-label">Title: </span>{item.title}</div>
                        <div><span class="item-label">Description: </span>{item.description}</div>
                        <div><span class="item-label">Features: </span>{item.features.map(item => item.name+" ")}</div>
                    </div>
                {renderRequestBooking(item)}
                </div>
            ))}
        </div>
    </div>
}

export default Home;
