import React, { Fragment, useEffect, useState } from 'react';
import "./Posts.css";
import Loader from '../Layout/Loader';
import MetaData from '../Layout/MetaData';

import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors } from '../Action/productAction';
import { getPost } from '../Action/postAction';
import PostCard from './PostCard';

const productCategory = [
    "Ornithology",
    "Birdwatching",
    "Techniques",
    "Nectar",
    "Live Insects",
    "Grit",
    "Suet"

]

const Posts = () => {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState('');

    const {
        loading,
        posts,
        error,
        postCount,
        resultPerPage,
        filteredPostCount
    } = useSelector((state) => state.posts)

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }

        dispatch(getPost(currentPage, category))

    }, [dispatch, currentPage, category, error])

    let count = filteredPostCount;
    // console.log(filteredProductsCount);

    //  pagination 
    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    // console.log(posts);

    const handleReset = () => {
        setCategory("")
        setCurrentPage("")
    }

    return (
        <Fragment>
            {
                loading ?
                    (<Loader />)
                    :
                    (
                        <Fragment>
                            <MetaData title={`All Blogs`} />
                            <div className='pt-10'> <h1 className='text-center text-4xl text-orange-500 font-bold'> Our all content for you </h1> </div>
                            <div className='mt-24 flex gap-10 flex-col lg:flex-row'>
                                <div className='w-full lg:w-96 bg-secondary h-screen rounded-md lg:mt-[-170px] '>
                                    <div className='flex justify-between px-12 items-center border-b-2 border-accent pb-5 pt-5'>
                                        <h2 className='text-neutral text-2xl font-bold'> Filter </h2>
                                        <button onClick={handleReset} className='btn btn-accent'>Reset </button>
                                    </div>

                                    <div className='py-10 border-b-2 border-accent'>
                                        <p className='text-neutral text-2xl font-bold px-2 lg:px-12 md:px-2'> Filter by category </p>
                                        <div className='flex flex-col px-5 lg:px-12 md:px-5 gap-5 pt-5'> {
                                            productCategory &&
                                            productCategory?.map((category, index) => (
                                                <li key={index}
                                                    onClick={() => setCategory(category)}
                                                    className=' list-none text-md font-bold text-white opacity-70 cursor-pointer hover:text-neutral hover:opacity-100'> {category} </li>
                                            ))
                                        } </div>
                                    </div>

                                </div>
                                <div className='bg-secondary h-auto pb-12 rounded-md w-full'>
                                    <div>

                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-12 pt-12'>
                                        {
                                            posts &&
                                            posts?.map((item) => (
                                                <PostCard key={item._id} item={item} />
                                            ))
                                        }
                                    </div>
                                    {
                                        resultPerPage < count && (
                                            <div className='paginationBox'>
                                                <Pagination
                                                    activePage={currentPage}
                                                    itemsCountPerPage={resultPerPage}
                                                    totalItemsCount={postCount}
                                                    onChange={setCurrentPageNo}
                                                    nextPageText="Next"
                                                    prevPageText="Prev"
                                                    firstPageText="First"
                                                    lastPageText="Last"
                                                    itemClass='page-item'
                                                    linkClass='page-link'
                                                    activeClass='pageItemActive'
                                                    activeLinkClass='pageLinkActive'
                                                ></Pagination>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </Fragment>
                    )
            }
        </Fragment>
    );
};

export default Posts;