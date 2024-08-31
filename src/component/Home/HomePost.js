

import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { clearErrors, getPost } from '../Action/postAction';
import Loader from '../Layout/Loader';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import PostCard from '../Post/PostCard';
const HomePost = () => {

    const dispatch = useDispatch();

    const {
        loading,
        posts,
        error,

    } = useSelector((state) => state.posts)

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        dispatch(getPost())

    }, [dispatch, error])

    const homePost = posts?.slice(0, 4);
    // console.log(homePost);

    // animation
    useEffect(() => {
        AOS.init({
            duration: 1000,
            delay: 100,
        });
    },
        [])

    return (
        <Fragment>
            {
                loading ?
                    (<Loader />)
                    :
                    (<Fragment>
                        <div data-aos="fade-right"
                            data-aos-offset="300"
                            data-aos-easing="ease-in-sine" className='container py-10 mx-auto'>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-500'>Popular Blog</h1>
                                <Link to="/blogs" className='text-white'> View All </Link>
                            </div>
                            <div data-aos="fade-up"
                                data-aos-anchor-placement="top-bottom" className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10'>
                                {
                                    homePost &&
                                    homePost?.map((item) => (
                                        <PostCard
                                            key={item?._id}
                                            item={item}
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

export default HomePost;