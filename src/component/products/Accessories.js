import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProduct } from '../Action/productAction';
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import BirdCard from './BirdCard';
import { Slider } from '@mui/material';
import Loader from '../Layout/Loader';

const categories = [
    "Bird Cage",
    "Bird Perch",
    " Bird Feeder",
    "Bird Toy",
    "Bird Bath",
    "Bird Swing",
    "Bird Food"
]

const Accessories = () => {

    const dispatch = useDispatch();
    const {
        loading,
        products,
        error,
        productCount,
        resultPerPage,
        filteredProduct
    } = useSelector((state) => state.products);


    // state for category 
    const [category, setCategory] = useState("Bird Cage");
    const [price, setPrice] = useState([10, 25000]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const handlePrice = (newPrice) => {
        setPrice(newPrice);
    }
    const count = filteredProduct;
    // console.log(products);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);

    }
    const clearFilter = () => {
        setPrice([0, 25000]);
        setCategory("Bird Cage");

    }

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
            toast.error(error, "You got some error");

        }
        dispatch(getProduct(currentPage, price, category));
    }, [dispatch, currentPage, price, category, error]);

    console.log(filteredProduct);
    // console.log(keyword)
    const filterProduct = products?.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    )


    const setCurrentPageNo = (e) => {
        setCurrentPage(e)

    }

    return (
        <Fragment>
            {
                loading ?
                    (<Loader />)
                    :
                    (
                        <Fragment>
                            <div className='pt-10'> <h1 className='text-center text-4xl text-orange-500 font-bold'> Our Available Products </h1> </div>
                            <div className='mt-24 flex gap-10 flex-col lg:flex-row'>
                                <div className='w-full lg:w-96 bg-secondary h-screen rounded-md lg:mt-[-170px] '>
                                    <div className='flex justify-between px-12 items-center border-b-2 border-accent pb-5 pt-5'>
                                        <h2 className='text-neutral text-2xl font-bold'> Filter </h2>
                                        <button onClick={clearFilter} className='btn btn-accent'>Reset </button>
                                    </div>
                                    <div className='py-10 border-b-2 border-accent'>
                                        <p className='text-neutral text-2xl font-bold px-2 lg:px-12'> Search Product </p>
                                        <div className='px-5 pt-10'>
                                            <input
                                                type="text"
                                                placeholder='Search your product'
                                                className='w-full border-2 p-4 rounded-xl border-gray-500'
                                                onChange={handleSearch}
                                                value={search}

                                            />
                                        </div>
                                    </div>
                                    <div className='py-10 border-b-2 border-accent'>
                                        <p className='text-neutral text-2xl font-bold px-2 lg:px-12 md:px-2'> Filter by category </p>
                                        <div className='flex flex-col px-5 lg:px-12 md:px-5 gap-5 pt-5'> {
                                            categories &&
                                            categories?.map((category, index) => (
                                                <li key={index}
                                                    onClick={() => setCategory(category)}
                                                    className=' list-none text-md font-bold text-white opacity-70 cursor-pointer hover:text-neutral hover:opacity-100'> {category} </li>
                                            ))
                                        } </div>
                                    </div>
                                    <div className='py-10 border-b-2 border-accent'>
                                        <p className='text-neutral text-2xl font-bold px-2 lg:px-12'> Filtered by Price </p>
                                        <div className='px-5 pt-10'>
                                            <Slider
                                                value={price}
                                                onChange={handlePrice}
                                                valueLabelDisplay="auto"
                                                aria-labelledby='range-slider'
                                                min={0}
                                                max={25000}

                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-secondary h-auto pb-12 rounded-md w-full'>
                                    <div>

                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-12 pt-12'>
                                        {
                                            filterProduct &&
                                            filterProduct?.map((bird) => (
                                                <BirdCard key={bird._id} bird={bird} />
                                            ))
                                        }
                                    </div>
                                    {
                                        resultPerPage < count && (
                                            <div className="paginationBox">
                                                <Pagination
                                                    activePage={currentPage}
                                                    itemsCountPerPage={resultPerPage}
                                                    totalItemsCount={productCount}
                                                    onChange={setCurrentPageNo}
                                                    nextPageText="Next"
                                                    prevPageText="Prev"
                                                    firstPageText="First"
                                                    lastPageText="Last"
                                                    itemClass='page-item'
                                                    linkClass='page-link'
                                                    activeClass='pageItemActive'
                                                    activeLinkClass='pageLinkActive'
                                                />
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

export default Accessories;