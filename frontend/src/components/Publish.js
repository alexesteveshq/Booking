import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../api';

const Publish = () => {

    const navigate = useNavigate();
    const [features, setFeatures] = useState([])
    const [errorMessage, setErrorMessage] = useState('') 

    useEffect(() => {
        fetchFeatures()
      }, [])

    const fetchFeatures = () => {
        api.listFeatures().then((response) => {
            setFeatures(response.data)
        }).catch((error) => {
            setErrorMessage(error.response.data.message)
         });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let features = []
        event.target.features.forEach(function (feature) {
            if (feature.checked){
                features.push(parseInt(feature.value));
            }
        });
        return api.publish({
            title: event.target.title.value,
            description: event.target.description.value,
            features: features,
        }).then(() => {
            navigate('/home');
        }).catch((error) => {
            Object.keys(error.response.data.message).forEach(key => {
                setErrorMessage(error.response.data.message[key])
            })
         });
    }

    return <div>
        <div class="form-container">
            <h2>Publish Apparment</h2>
            <form class="main-form" onSubmit={(event) => handleSubmit(event)}>
                <input name="title" required/>
                <input name="description" required/>
                <div required>
                    {features.map(item => (
                        <div class="features">
                            <input type="checkbox" name="features" value={item.id}/>{item.name}<br/>
                        </div>
                    ))}
                </div>
                <input type="submit" class="submit-button" value="Publish"/>
            </form>
            <div className={errorMessage !== '' ? 'error-message active' : 'error-message'}>{errorMessage}</div>
        </div>
    </div>
}

export default Publish;
