

import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, getPostDetails, updatePost } from '../Action/postAction';
import { toast } from 'react-toastify';
import { UPDATE_POST_RESET } from '../constant/postConstant';
import MetaData from '../Layout/MetaData';
import Sidebar from './Sidebar';
import { AccountTree, Description, Spellcheck } from '@mui/icons-material';
import { Button } from '@mui/material';

const UpdateBlog = () => {


    const { id } = useParams();
    const dispatch = useDispatch();
    // const { error, post } = useSelector((state) => state.productDetails);
    const { loading, error: updateError, isUpdate } = useSelector((state) => state.post);
    const [post, setPost] = useState({})
    const navigate = useNavigate()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const productId = id;

    useEffect(() => {

        fetch(`http://localhost:5000/api/v1/post/${id}`)
            .then(res => res.json())
            .then(data => setPost(data.post))

    }, [id])
    useEffect(() => {

        if (post && post?._id !== productId) {
            dispatch(getPostDetails(productId))
        } else {
            setTitle(post?.title);
            setDescription(post?.description);
            setCategory(post?.category);
            setOldImages(post?.images);
        }
        // if (error) {
        //     toast.error(error)
        //     dispatch(clearErrors());
        // }
        if (updateError) {
            toast.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdate) {
            toast.success("Update product successful");
            navigate("/admin/dashboard")
            dispatch({ type: UPDATE_POST_RESET });
        }

    }, [post, updateError, dispatch, isUpdate, navigate, productId])
    // update product handler 
    const updateProductHandlerSubmit = (e) => {
        e.preventDefault();

        const productData = {
            title,
            description,
            category,
            images
        };
        console.log(productData);

        dispatch(updatePost(productId, productData));

    }
    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];

    return (
        <Fragment>
            <MetaData title="Create Product" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateProductHandlerSubmit}
                    >
                        <h1>Update post</h1>
                        <div>
                            <Spellcheck />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <Description />

                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <AccountTree />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>



                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {oldImages &&
                                oldImages.map((image, index) => (
                                    <img key={index} src={image.url} alt="Old Product Preview" />
                                ))}
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateBlog;