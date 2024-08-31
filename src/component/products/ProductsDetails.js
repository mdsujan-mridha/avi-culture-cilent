import React, { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material';

import styled from '@emotion/styled';
import { addItemToCart } from '../Action/cartAction';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getProductDetails, newReview } from '../Action/productAction';
import Carousel from 'react-material-ui-carousel';
import Loader from '../Layout/Loader';
import { NEW_REVIEW_RESET } from '../constant/productConstant';


const StyledRating = styled(Rating)({
    '& .MuiRating-icon': {
        color: '#FFA500'
    }
})

const ProductsDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { loading, product, error } = useSelector((state) => state.productDetails);
    const { success, error: reviewError } = useSelector((state) => state.newReview);
    const { user } = useSelector((state) => state.user);
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    // ratting 
    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,

    };


    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    }
    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);

    }

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    }
    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);
        dispatch(newReview(myForm));
        setOpen(false);

    }

    const addToCartHandler = () => {
        dispatch(addItemToCart(id, quantity));
        toast.success("Item added to cart");
    };

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors());
        }

        if (reviewError) {
            toast.error(reviewError);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success(success);
            dispatch({ type: NEW_REVIEW_RESET });
        }

        dispatch(getProductDetails(id));


    }, [dispatch, id, error, reviewError, success]);

    // console.log(product);
    console.log(user);

    return (
        <Fragment>
            {
                loading ?
                    (<Loader />)
                    :
                    (
                        <Fragment>
                            <div>
                                <div className='w-full  flex flex-col lg:flex-row justify-evenly lg:items-center px-12' style={{ minHeight: '90vh' }}>
                                    <div className='w-full lg:w-1/2 pb-5 lg:pb-0'>
                                        <div
                                            className='flex lg:justify-center lg:items-center shadow-xl rounded-md bg-secondary'
                                            style={{
                                                width: '600px', height: '600px', border: '2px solid #fff'
                                            }}>
                                            <Carousel className='w-full h-full'>
                                                {
                                                    product?.images &&
                                                    product?.images.map((item, i) => (
                                                        <img
                                                            key={item.url}
                                                            src={item?.url}
                                                            alt={`${i} Slide`}
                                                            className='w-full h-full'
                                                        />
                                                    ))
                                                }

                                            </Carousel>
                                        </div>
                                    </div>
                                    <div className='w-full lg:w-1/2 flex flex-col  justify-start items-start p-5'>
                                        <p className='text-4xl pb-3 font-bold text-white'> {product?.name} </p>
                                        <p className='text-xl font-bold opacity-60 border-b border-gray-500 w-full text-gray-400'>  productID: #{product?._id} </p>

                                        <div className="w-full flex items-center justify-start py-10 border-b border-gray-500">
                                            <StyledRating
                                                {...options}

                                            /> <span className='text-lg font-semibold text-neutral'> ({product?.numOfReviews} Reviews) </span>
                                        </div>
                                        <div>
                                            <h1 className='text-4xl font-bold py-7 text-white'> BDT {product?.price} /- </h1>
                                            <div className='flex justify-start items-center border-b border-gray-500 pb-7'>
                                                <button
                                                    className='text-white font-bold text-2xl bg-accent'
                                                    style={{
                                                        width: 45, height: 45
                                                    }}
                                                    onClick={decreaseQuantity}
                                                > - </button>
                                                <input
                                                    type="number"
                                                    value={quantity}
                                                    readOnly
                                                    style={{ width: 60, height: 45, textAlign: 'center', outline: 'none' }}
                                                />
                                                <button
                                                    className='text-white font-bold text-2xl bg-accent' style={{
                                                        width: 45, height: 45
                                                    }}
                                                    onClick={increaseQuantity}
                                                > + </button>
                                                <button
                                                    className='btn btn-accent ml-7 rounded-full text-md'
                                                    disabled={product.Stock <= 1 ? true : false}
                                                    onClick={addToCartHandler}
                                                > Add to cart </button>
                                            </div>
                                            <div className='py-7 border-b border-gray-500'>
                                                <p className=' text-2xl font-bold text-gray-500'> status:
                                                    <span className={product?.Stock <= 1 ? "text-red-700" : "text-white"}> {product.Stock < 1 ? "OutOfStock" : "InStock"} </span> </p>
                                            </div>
                                            <div className='py-7'>
                                                <p className='text-xl font-bold text-white'> Description </p>
                                                <p className='py-4 text-justify font-semibold opacity-70 text-white'> {product?.description} </p>
                                            </div>
                                            <button
                                                onClick={submitReviewToggle}
                                                className='btn w-52 bg-accent text-white outline-none border-0 rounded-full'> Submit Review </button>
                                        </div>
                                    </div>

                                    <Dialog
                                        aria-labelledby='simple-dialog-title'
                                        open={open}
                                        onClose={submitReviewToggle}
                                    >
                                        <DialogTitle>Submit Review</DialogTitle>
                                        <DialogContent className="submitDialog"
                                            style={{ display: 'flex', flexDirection: "column-reverse" }}
                                        >
                                            <Rating
                                                onChange={(e) => setRating(e.target.value)}
                                                value={rating}
                                                size="large"

                                            />

                                            <textarea
                                                className="submitDialogTextArea border-primary" // Add border-primary class here
                                                style={{ border: "1px solid black", padding: "10px" }} // Add inline style for border
                                                cols="30"
                                                rows="5"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder="Write your review here"

                                            ></textarea>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={submitReviewToggle} color="secondary">
                                                Cancel
                                            </Button>
                                            <Button onClick={reviewSubmitHandler} color="primary">
                                                Submit
                                            </Button>
                                        </DialogActions>
                                    </Dialog>

                                </div>
                                <div>
                                    <h1 className='text-center py-7 text-3xl font-bold  uppercase pb-4 text-neutral'> Reviews </h1>
                                    <hr style={{ width: 200, border: '2px solid gray', alignItems: 'center', margin: '0 auto' }} />
                                </div>
                                <div className='flex gap-5 items-center justify-center mt-24 overflow-x-scroll pb-5 px-12'>

                                    {
                                        product?.reviews && product?.reviews[0] ? (
                                            <div>
                                                {
                                                    product?.reviews &&
                                                    product?.reviews?.map((review) => (
                                                        <div key={review?._id} className="w-72 h-80 bg-secondary flex flex-col items-center rounded-md px-5">
                                                            <img src={user?.avatar?.url} alt="" className='w-32 h-32 rounded-full mt-5' />
                                                            <h2 className='py-4 text-xl font-bold text-white'> {review?.name} </h2>
                                                            <p className=' text-justify font-semibold text-sm opacity-70 text-white'> {review?.comment} </p>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        ) : (
                                            <p className='text-2xl font-semibold text-orange-700'> Now Review Yest </p>
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

export default ProductsDetails;