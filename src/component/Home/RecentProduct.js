import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, getProduct } from '../Action/productAction';
import Loader from '../Layout/Loader';
import BirdCard from '../products/BirdCard';
import { Link } from 'react-router-dom';
import AOS from 'aos';

const RecentProduct = () => {
    const dispatch = useDispatch();
    const {
        loading,
        products,
        error,

    } = useSelector((state) => state.products);

    useEffect(() => {

        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }

        dispatch(getProduct())

    }, [dispatch, error]);

    // animation 

    useEffect(() => {

        AOS.init({
            duration: 1000,
            delay: 100,
        });

    }, [])

    const recentProducts = products?.slice(4, 8)

    return (
        <Fragment>
            {
                loading ?
                    (<Loader />)
                    :
                    (<Fragment>
                        <div data-aos="fade-up"
                            data-aos-duration="3000" className='container py-10 mx-auto'>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-500'>Recent Product</h1>
                                <Link to="/products" className='text-white'> View All </Link>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10'>
                                {
                                    recentProducts &&
                                    recentProducts?.map((bird) => (
                                        <BirdCard
                                            key={bird?._id}
                                            bird={bird}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </Fragment>)
            }
        </Fragment>
    );
};

export default RecentProduct;