import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const BirdCard = ({ bird }) => {

    // console.log(bird);

    return (
        <Fragment>
            <Link to={`/products/${bird?._id}`} className="w-auto h-auto bg-primary rounded-lg shadow-2xl relative overflow-hidden group pb-5">
                <img src={bird.images[0]?.url} alt={bird.name}
                    className='p-1 rounded-2xl  transform transition-transform duration-300 scale-100 group-hover:scale-110  top-0 left-0 w-full h-80' />
                <div className='mt-5 px-5'>
                    <div className="flex px-2 justify-between items-center pb-3 gap-2">
                        <p className='font-bold text-neutral'> {bird?.name} </p>
                        <p className='text-neutral'>Price: <del className='text-gray-500'> {bird?.discount} </del>{bird?.price} </p>
                    </div>

                </div>
            </Link>
        </Fragment>
    );
};

export default BirdCard;