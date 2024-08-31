import axios from "axios";
import {
    ADMIN_POST_FAIL,
    ADMIN_POST_REQUEST,
    ADMIN_POST_SUCCESS,
    ALL_POST_FAIL,
    ALL_POST_REQUEST,
    ALL_POST_SUCCESS,
    CLEAR_ERRORS,
    DELETE_POST_FAIL,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    NEW_POST_FAIL,
    NEW_POST_REQUEST,
    NEW_POST_SUCCESS,
    POST_DETAILS_FAIL,
    POST_DETAILS_REQUEST,
    POST_DETAILS_SUCCESS,
    UPDATE_POST_FAIL,
    UPDATE_POST_REQUEST,
    UPDATE_POST_SUCCESS

} from "../constant/postConstant";




export const getPost = (currentPage = 1, category) => async (dispatch) => {
    try {
        dispatch({ type: ALL_POST_REQUEST });

        let link = `http://localhost:5000/api/v1/posts?page=${currentPage}`;

        if (category) {
            link = `http://localhost:5000/api/v1/posts?page=${currentPage}&category=${category}`;
        }

        const { data } = await axios.get(link);

        dispatch({
            type: ALL_POST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_POST_FAIL,
            payload: error?.error?.response?.data?.message,
        });
    }
};

// get single products details 
export const getPostDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: POST_DETAILS_REQUEST });
        const { data } = await axios.get(`http://localhost:5000/api/v1/post/${id}`);
        // console.log(data.post);

        dispatch({
            type: POST_DETAILS_SUCCESS,
            // if i get product Which in need then set it on payload 
            payload: data.post
        })
    } catch (error) {
        dispatch({
            type: POST_DETAILS_FAIL,
            payload: error?.error?.response?.data?.message,
        });
    }
};



// get all product by admin  
export const getAdminPost = () => async (dispatch) => {

    try {
        dispatch({ type: ADMIN_POST_REQUEST })
        const { data } = await axios.get(`http://localhost:5000/api/v1/admin/posts`)
        dispatch({
            type: ADMIN_POST_SUCCESS,
            payload: data.posts,
        })
    } catch (error) {
        dispatch({
            type: ADMIN_POST_FAIL,
            payload: error.response.data.message
        })
    }

}


// delete product by admin 
export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_POST_REQUEST
        })
        const { data } = await axios.delete(`http://localhost:5000/api/v1/admin/post/${id}`)
        dispatch({
            type: DELETE_POST_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_POST_FAIL,
            payload: error.response.data.message
        })
    }

}
// create new product by admin 
export const createPost = (productData) => async (dispatch) => {

    try {
        dispatch({ type: NEW_POST_REQUEST })
        //   const config = {
        //     headers:{
        //         "Content-type":"application/json"
        //     }
        //   }
        const data = await axios.post(`http://localhost:5000/api/v1/admin/post/new`, productData)
        dispatch({
            type: NEW_POST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEW_POST_FAIL,
            payload: error.response?.data.message
        })
    }

}
export const updatePost = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_POST_REQUEST })
        const { data } = await axios.put(`http://localhost:5000/api/v1/admin/post/${id}`, productData)
        dispatch({
            type: UPDATE_POST_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: UPDATE_POST_FAIL,
            payload: error.response.data.message
        })
    }
}

// clear error 
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}