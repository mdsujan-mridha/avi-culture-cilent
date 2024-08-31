import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, deletePost, getAdminPost } from '../Action/postAction';
import { toast } from 'react-toastify';
import { DELETE_POST_RESET } from '../constant/postConstant';
import { Delete, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import MetaData from '../Layout/MetaData';
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';

const BlogList = () => {

    const dispatch = useDispatch();
    const { error, posts } = useSelector((state) => state.posts)
    const { error: deleteError, isDeleted } = useSelector((state) => state.post);
    // console.log(products);

    const navigate = useNavigate()
    const deleteProductHandler = (id) => {
        dispatch(deletePost(id));
    }
    useEffect(() => {

        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors())
        }
        if (isDeleted) {
            toast.success("Post delete successfully")
            dispatch({ type: DELETE_POST_RESET })
            navigate("/admin/dashboard")
        }
        dispatch(getAdminPost())

    }, [dispatch, error, deleteError, isDeleted, navigate]);



    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/post/${params.row.id}`}>
                            <Edit />
                        </Link>

                        <Button
                            onClick={() => deleteProductHandler(params.row.id)}
                        >
                            <Delete />
                        </Button>
                    </Fragment>
                );
            },
        },
    ]

    const rows = [];
    posts &&
        posts.forEach((item) => {
            rows.push({
                id: item?._id,
                name: item?.title
            })
        })

    return (
        <Fragment>
            <MetaData title={`ALL Post - Admin`} />
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL Blogs</h1>
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

export default BlogList;