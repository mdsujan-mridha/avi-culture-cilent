

import React, { Fragment, useEffect, useState } from 'react';

import "./SellerAddNewPost.css";
import MetaData from '../Layout/MetaData';
import SellerSidebard from './SellerSidebard';
import { AccountTree, AttachMoney, Description, Spellcheck, Storage } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors } from '../Action/userAction';
import { NEW_PRODUCT_RESET } from '../constant/productConstant';
import { createProduct } from '../Action/productAction';


const SellerAddNewPost = () => {

    const dispatch = useDispatch();

    const { error, loading, success } = useSelector((state) => state.newProduct);
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    // set category 
    const categories = [
        "Parrots",
        "Birds of Prey ",
        "Passerines",
        "Game Bird",
        "Sea Bird",
        "Wading Bird",
        "Columbidae",
        "Bird Cage",
        "Bird Perch",
        " Bird Feeder",
        "Bird Toy",
        "Bird Bath",
        "Bird Swing",
        "Bird Food"

    ];

    useEffect(() => {
        if (error) {
            toast.error(error)
            console.log(error)
            dispatch(clearErrors());

        }
        if (success) {
            toast.success("Product create successfully")
            navigate("/admin/dashboard")
            dispatch({ type: NEW_PRODUCT_RESET })
        }
    }, [dispatch, error, success, navigate])

    const createProductSubmitHandler = (e) => {
        e.preventDefault();
        const productData = {
            name,
            price,
            discount,
            description,
            category,
            Stock,
            images
        };
        console.log(productData);
        dispatch(createProduct(productData));
    }

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);

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
    }


    return (
        <Fragment>
            <MetaData title="Create Product" />
            <div className="dashboard">
                <SellerSidebard />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Create Product</h1>

                        <div>
                            <Spellcheck />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoney />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoney />
                            <input
                                type="number"
                                placeholder="discount Price"
                                required
                                onChange={(e) => setDiscount(e.target.value)}
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
                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Storage />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={createProductImagesChange}
                                multiple
                            />
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

export default SellerAddNewPost;