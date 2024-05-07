import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Location = () => {
    const {dispatch} = useContext(AppContext);

    const changeLocation = (val) => {
        dispatch({
            type:'CHG_LOCATION',
            payload: val,
        })
    }

    return (
        <div className='alert alert-secondary'>Location{
            <select name='Location' id='Location' onChange={(event) => changeLocation(event.target.value)}>
                <option value='gbp'>UK (GBP)</option>
                <option value='idr'>Indonesia (IDR)</option>
                <option value='eur'>Europe (EUR)</option>
                <option value='usd'>America (USD)</option>
            </select>
            }
        </div>
    );
};

export default Location;