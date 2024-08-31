

import React, { Fragment, useEffect } from 'react';
import birdImg from "../images/bird-2.png";
import AOS from 'aos';

const BestSell = () => {

    useEffect(() => {

        AOS.init({
            duration: 1000,
        });

    }, [])

    return (
        <Fragment>
            <div data-aos="zoom-out-up" className='flex container py-10 mx-auto w-full justify-between items-center'>
                <div data-aos="fade-up"
                    data-aos-duration="3000" className='w-1/2'>
                    <h1 className='text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-500 py-5'> Deals Of The Month </h1>
                    <p className='py-10 text-white'> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin  </p>
                    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                            <span className="countdown font-mono text-5xl">
                                <span style={{ "--value": 15 }}></span>
                            </span>
                            days
                        </div>
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                            <span className="countdown font-mono text-5xl">
                                <span style={{ "--value": 10 }}></span>
                            </span>
                            hours
                        </div>
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                            <span className="countdown font-mono text-5xl">
                                <span style={{ "--value": 24 }}></span>
                            </span>
                            min
                        </div>
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                            <span className="countdown font-mono text-5xl">
                                <span style={{ "--value": 7 }}></span>
                            </span>
                            sec
                        </div>
                    </div>
                </div>

                <div data-aos="fade-down"
                    data-aos-easing="linear"
                    data-aos-duration="1500">
                    <img src={birdImg} alt="bird" />
                </div>

            </div>
        </Fragment>
    );
};

export default BestSell;