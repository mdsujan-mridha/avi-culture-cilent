
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearErrors, createPost } from '../Action/postAction';
import { NEW_POST_RESET } from '../constant/postConstant';
import MetaData from '../Layout/MetaData';
import Sidebar from './Sidebar';
import { AccountTree, Description, Spellcheck } from '@mui/icons-material';
import { Button } from '@mui/material';

const NewBlogPost = () => {

    const dispatch = useDispatch();
    const { error, loading, success } = useSelector((state) => state.newPost);
    const navigate = useNavigate()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [metaDescription, setMetaDescription] = useState("")
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
            dispatch({ type: NEW_POST_RESET })
        }
    }, [dispatch, error, success, navigate])

    const createProductSubmitHandler = (e) => {
        e.preventDefault()

        const productData = {
            title,
            metaDescription,
            description,
            category,
            images

        };
        dispatch(createPost(productData));
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
            <MetaData title="Create Post" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Create post</h1>

                        <div>
                            <Spellcheck />
                            <input
                                type="text"
                                placeholder="Post Name"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <Description />
                            <textarea
                                placeholder="Meta Description"
                                value={metaDescription}
                                onChange={(e) => setMetaDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <Description />

                            <textarea
                                placeholder="Post Description"
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

export default NewBlogPost;