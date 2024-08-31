import { Home, LocationCity, Phone, PinDrop, Public, TransferWithinAStation } from '@mui/icons-material';
import React, { Fragment, useState } from 'react';
import { Country, State } from "country-state-city";
import CheckutSteps from './CheckutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { saveShippingInfo } from '../Action/cartAction';
import "./shipping.css";

const Shipping = () => {
    const dispatch = useDispatch();
    const { shippingInfo } = useSelector((state) => state.cart);
    // navigation 
    const navigate = useNavigate();
    // state 
    const [address, setAddress] = useState(shippingInfo?.address);
    const [city, setCity] = useState(shippingInfo?.city);
    const [state, setState] = useState(shippingInfo?.state);
    const [country, setCountry] = useState(shippingInfo?.country);
    const [pinCode, setPinCode] = useState(shippingInfo?.pinCode);
    const [phoneNumber, setPhoneNumber] = useState(shippingInfo?.phoneNumber);

    const shippingSubmit = (e) => {

        e.preventDefault();
        if (phoneNumber.length < 10 || phoneNumber.length > 10) {
            toast.warn("Phone number must be 10 digit");
            return;
        }
        dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNumber }))
        navigate("/order/confirm");
    }

    return (
        <Fragment>
            {/* <MetaData title="Shipping Details" /> */}
            <CheckutSteps activeStep={0} />
            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">  Shipping Details </h2>
                    <form
                        className='shippingForm'
                        onSubmit={shippingSubmit}
                        encType="multipart/form-data"
                    >
                        <div>
                            <Home />
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div>
                            <LocationCity />
                            <input
                                type="text"
                                placeholder="City"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div>
                            <PinDrop />
                            <input
                                type="number"
                                placeholder="Pin Code"
                                required
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                        </div>
                        <div>
                            <Phone />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                required
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                size="10"
                            />
                        </div>
                        <div>
                            <Public />

                            <select
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        {country && (
                            <div>
                                <TransferWithinAStation />

                                <select
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {State &&
                                        State.getStatesOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}
                        <input
                            type="submit"
                            value="Continue"
                            className="shippingBtn"
                            disabled={state ? false : true}
                        />
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Shipping;