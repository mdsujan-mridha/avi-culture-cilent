import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadUser, logout } from '../Action/userAction';
import store from "../../store";
import { Dashboard, ListAlt, Logout, PersonOutline, ShoppingCart } from '@mui/icons-material';
import { toast } from 'react-toastify';

const Navbar = () => {
    const dispatch = useDispatch();

    const { isAuthenticated, user } = useSelector((state) => state.user);

    const logoutUser = () => {
        dispatch(logout())
        toast.success("Your are logout!")
    }

    useEffect(() => {

        store.dispatch(loadUser())
    }, [dispatch])
    // console.log(user);

    return (
        <Fragment>
            <div className="navbar bg-primary text-white" style={{ borderBottom: '1px solid #583ee6' }}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-secondary rounded-box w-52">
                            <li><Link to="/" className=' hover:text-orange-500'>Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/products">Shop</Link></li>
                            <li><Link to="/blogs"> Articles </Link></li>
                            <li><Link to="/accessories"> Accessories </Link></li>

                        </ul>
                    </div>
                    <Link className="btn btn-ghost normal-case text-3xl text-white">AVI <span className='text-orange-500'> CULTURE</span> </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-xl font-bold">
                        <li><Link to="/" className=' hover:text-orange-500'>Home</Link></li>
                        <li><Link to="/about" className=' hover:text-orange-500'>About</Link></li>
                        <li><Link to="/contact" className=' hover:text-orange-500'>Contact</Link></li>
                        <li><Link to="/blogs" className=' hover:text-orange-500'> Articles </Link></li>
                        <li><Link to="/products" className=' hover:text-orange-500'>Shop</Link></li>
                        <li><Link to="/accessories" className=' hover:text-orange-500'> Accessories </Link></li>

                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        isAuthenticated === true && user ?
                            <Fragment>
                                <div className="dropdown dropdown-end ">
                                    <label tabIndex={0} className="btn m-1"> {user ? user?.name : "Hi"} </label>
                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-secondary gap-8 rounded-box w-52 mt-5 px-12">
                                        <li><Link to="/profile"> <PersonOutline /> Profile</Link></li>
                                        <li><Link to="/orders"><ListAlt /> Orders</Link></li>
                                        <li> <Link to="/cart"> <ShoppingCart /> cart </Link> </li>
                                        {
                                            user && isAuthenticated && user.role === "admin" && (
                                                <li>
                                                    <Link to="/admin/dashboard"><Dashboard /> Dashboard</Link>
                                                </li>
                                            )
                                        }
                                        <li><button onClick={logoutUser} ><Logout /> Logout</button></li>
                                    </ul>
                                </div>
                            </Fragment>
                            :
                            <Fragment>
                                <Link to="/login" className="btn btn-secondary text-white">Login</Link>
                            </Fragment>
                    }
                </div>
            </div>
        </Fragment>
    );
};

export default Navbar;