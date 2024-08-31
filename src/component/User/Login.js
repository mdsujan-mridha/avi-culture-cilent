import React, { Fragment, useEffect, useRef } from 'react';
import loginBgImage from "../images/login & Register/login.jpg";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login } from "../Action/userAction";
import { toast } from 'react-toastify';
import Loader from '../Layout/Loader';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector((state) => state.user);
    const emailRef = useRef();
    const passwordRef = useRef();
    const location = useLocation();
    const loginHandler = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        dispatch(login(email, password));
    }

//  redirect user 
const redirect=location.search?location.search.split("=")[1]:"/profile";
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            toast.success("Logged in");
            navigate(redirect);
        }
    }, [dispatch, error, isAuthenticated, navigate,redirect])


    return (
        <Fragment>
            {
                loading ?
                    (<Loader />)
                    :
                    (<Fragment>
                        <div
                            style={{
                                backgroundImage: `url(${loginBgImage})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '100%',
                                zIndex: 99999,
                                minHeight: '90vh'
                            }}
                            className='w-full h-full'
                        >
                            <div className="w-full h-full flex justify-center items-center backdrop-blur-md flex-col" style={{ minHeight: '90vh' }}>
                                <h1 className='text-5xl text-white font-bold'> Login </h1>
                                <hr style={{ borderBottom: '5px solid #fff', width: '20vh', marginTop: 15 }} />
                                <div className="w-96 mt-10">
                                    <form
                                        onSubmit={loginHandler}
                                        className='flex flex-col gap-5'>
                                        <input
                                            ref={emailRef}
                                            type="email"
                                            class="border-b border-white focus:border-white focus:outline-none w-full bg-transparent p-5 text-xl font-bold text-white"
                                            placeholder='Enter your email'

                                        />
                                        <input
                                            ref={passwordRef}
                                            type="password"
                                            class="border-b border-white focus:border-white focus:outline-none w-full bg-transparent p-5 text-xl font-bold text-white"
                                            placeholder='Enter your password'

                                        />
                                        <input

                                            type="submit"
                                            value="Login"
                                            className='btn  text-white font-bold text-lg w-full bg-transparent hover:bg-accent'
                                            style={{ border: '2px solid #fff' }} />
                                    </form>
                                    <div className='flex flex-col lg:flex-row lg:justify-between items-center pt-10 text-lg font-bold text-white'>
                                        <p> <Link to="">Forgot password? </Link> </p>
                                        <p> <Link to="/register">Not account yet? </Link> </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>)
            }
        </Fragment>
    );
};

export default Login;