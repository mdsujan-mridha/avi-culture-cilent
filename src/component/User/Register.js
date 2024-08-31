import React, { Fragment, useEffect, useRef, useState } from 'react';
import registerBgImage from "../images/login & Register/register.jpg";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, register } from '../Action/userAction';
import { toast } from 'react-toastify';
import Loader from '../Layout/Loader';
import profileImage from "../images/user.jpg";


const Register = () => {
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const location = useLocation();
    const [avatar, setAvatar] = useState(profileImage);
    const [avatarPreview, setAvatarPreview] = useState(profileImage);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });
    const { name, email, password } = user;

    const registerHandler = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const myForm = {
            name,
            email,
            password,
            avatar
        }
       
        dispatch(register(myForm))
    }

    // image 
    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[[0]]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }

    };

    //  redirect user 
    const redirect = location.search ? location.search.split("=")[1] : "/profile";
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }
        if (isAuthenticated) {
            toast.success("Register successfully");
            navigate(redirect);
        }
    }, [error, dispatch, isAuthenticated, navigate, redirect]);
    return (
        <Fragment>
            {
                loading ?
                    (<Loader />)
                    :
                    (<Fragment>
                        <div
                            style={{
                                backgroundImage: `url(${registerBgImage})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '100%',
                                zIndex: 99999,
                                minHeight: '90vh'
                            }}
                            className='w-full h-full'
                        >
                            <div className="w-full h-full flex justify-center items-center backdrop-blur-md flex-col" style={{ minHeight: '90vh' }}>
                                <h1 className='text-5xl text-white font-bold'> Register </h1>
                                <hr style={{ borderBottom: '5px solid #fff', width: '20vh', marginTop: 15 }} />
                                <div className="w-96 mt-10">
                                    <form
                                        onSubmit={registerHandler}
                                        className='flex flex-col gap-5'>
                                        <input
                                            ref={nameRef}
                                            type="text"
                                            required
                                            class="border-b border-white focus:border-white focus:outline-none w-full bg-transparent p-5 text-xl font-bold text-white"
                                            placeholder='Enter your name'

                                        />
                                        <input
                                            ref={emailRef}
                                            type="email"
                                            required
                                            class="border-b border-white focus:border-white focus:outline-none w-full bg-transparent p-5 text-xl font-bold text-white"
                                            placeholder='Enter your email'

                                        />
                                        <input
                                            ref={passwordRef}
                                            required
                                            type="password"
                                            class="border-b border-white focus:border-white focus:outline-none w-full bg-transparent p-5 text-xl font-bold text-white"
                                            placeholder='Enter your password'

                                        />
                                        <div id="registerImage" className='w-56 h-34'>
                                            <img src={avatarPreview} alt="Avatar Preview" />
                                            <input
                                                type="file"
                                                name="avatar"
                                                accept="image/*"
                                                onChange={registerDataChange}
                                            />
                                        </div>

                                        <input type="submit" value="Register" className=' text-white font-bold text-lg w-full bg-gray-600' style={{ outline: 'none', border: 'none', height: '45px', borderRadius: 8, cursor: 'pointer' }} />
                                    </form>
                                    <div className='flex flex-col lg:flex-row lg:justify-between items-center pt-10 text-lg font-bold text-white'>
                                        <p> <Link to="">Forgot password? </Link> </p>
                                        <p> <Link to="/login">Already account? </Link> </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>)
            }
        </Fragment>
    );
};

export default Register;