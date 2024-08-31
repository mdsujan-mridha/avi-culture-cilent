

import React, { useEffect } from 'react';
import "./SellerDashboard.css";
import SellerSidebard from './SellerSidebard';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, Title, Legend, BarController, LineController, PointElement, BarElement, LineElement, ArcElement } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors } from '../Action/userAction';
import Loader from '../Layout/Loader';
import { Typography } from '@mui/material';

// / Register necessary controllers and elements
Chart.register(CategoryScale, LinearScale, Title, Legend, BarController, LineController, PointElement, BarElement, LineElement, ArcElement);

const SellerDashboard = () => {

    const dispatch = useDispatch();

    const { user, loading, error } = useSelector((state) => state.user);


    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

    }, [error, dispatch])


    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["DeepPink"],
                hoverBackgroundColor: ["red"],
                data: [0, 4000],
            },
        ],
    };

    return (
        <div className='dashboard min-h-screen'>
            <SellerSidebard />
            <>
                {
                    loading ?
                        (<Loader />)
                        :
                        (
                            <div className="dashboardContainer">
                                <h4 className='text-center font-semibold text-xl'> Hi {user?.name} Welcome to you </h4>
                                <h1>Dashboard</h1>
                                <div className='px-12 flex gap-5 mb-10'>
                                </div>

                                <div> <h1 className='text-4xl font-bold text-center border-b-2 py-5'> Total Earned Amount </h1> </div>
                                <div className='lineChart'>
                                    <Line data={lineState} />
                                </div>
                                <div> <h1 className='text-4xl font-bold text-center border-b-2 py-5'> In stock or Out of Stock </h1> </div>

                            </div>
                        )
                }
            </>
        </div>
    );
};

export default SellerDashboard;