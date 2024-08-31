import { Edit, Launch } from '@mui/icons-material';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors, myProducts } from '../Action/productAction';
import { toast } from 'react-toastify';
import MetaData from '../Layout/MetaData';
import SellerSidebard from './SellerSidebard';
import { DataGrid } from '@mui/x-data-grid';

const SellerProductList = () => {


    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.myProducts);

    const { user } = useSelector((state) => state.user);


    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                const orderId = params.row.id; // Corrected: Access row.id instead of getValue(params.id, "id")
                return (
                    <Link to={`/products/${orderId}`}>
                        <Launch />
                    </Link>
                );
            },
        },
    ]

    const rows = [];
    products &&
        products.forEach((item) => {
            rows.push({
                id: item?._id,
                stock: item?.Stock,
                price: item?.price,
                name: item?.name,
            })
        })

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        dispatch(myProducts());
    }, [dispatch, error])

    // console.log(orders);
    console.log(products);


    return (
        <Fragment>
            <MetaData title={`ALL Products - ${user?.name}`} />
            <div className="dashboard">
                <SellerSidebard />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        pageSizeOptions={[15]}
                        disableRowSelectionOnClick
                        autoHeight
                        className='productListTable'
                    >
                    </DataGrid>
                </div>
            </div>
        </Fragment>
    );
};

export default SellerProductList;