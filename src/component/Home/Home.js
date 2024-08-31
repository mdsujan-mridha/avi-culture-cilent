import React, { Fragment, useEffect } from 'react';
import Hero from './Hero';
import HomeProduct from './HomeProduct';
import RecentProduct from './RecentProduct';
import BestSell from './BestSelll';
import HomePost from './HomePost';


const Home = () => {



    return (
        <Fragment>
            <Hero />
            < HomeProduct />
            <RecentProduct />
            <BestSell />
            <HomePost />
        </Fragment>
    );
};

export default Home;