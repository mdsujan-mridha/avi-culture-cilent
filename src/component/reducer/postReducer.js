
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
    DELETE_POST_RESET,
    DELETE_POST_SUCCESS,
    NEW_POST_FAIL,
    NEW_POST_REQUEST,
    NEW_POST_RESET,
    NEW_POST_SUCCESS,
    POST_DETAILS_FAIL,
    POST_DETAILS_REQUEST,
    POST_DETAILS_SUCCESS,
    UPDATE_POST_FAIL,
    UPDATE_POST_REQUEST,
    UPDATE_POST_RESET,
    UPDATE_POST_SUCCESS
} from "../constant/postConstant"



export const postReducer = (state = { posts: [] }, action) => {

    switch (action.type) {

        case ALL_POST_REQUEST:
        case ADMIN_POST_REQUEST:
            return {
                loading: true,
                posts: [],
            }
        case ALL_POST_SUCCESS:
            return {
                loading: false,
                posts: action.payload.posts,
                postCount: action.payload.postCount,
                filteredPostCount: action.payload.filteredPostCount,
                resultPerPage: action.payload.resultPerPage,
            }
        case ADMIN_POST_SUCCESS:
            return {
                loading: false,
                posts: action.payload,
            }
        case ALL_POST_FAIL:
        case ADMIN_POST_FAIL:

            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;

    }

}
export const postDetails = (state = { post: {} }, action) => {
    switch (action.payload) {
        case POST_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case POST_DETAILS_SUCCESS:
            return {
                loading: false,
                post: action.payload,
            }
        case POST_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

// / delete product by admin 
export const updatePostReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_POST_REQUEST:
        case UPDATE_POST_REQUEST:

            return {
                ...state,
                loading: true
            }
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            }
        case UPDATE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdate: action.payload,
            }

        case DELETE_POST_FAIL:
        case UPDATE_POST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case DELETE_POST_RESET:
            return {
                ...state,
                isDeleted: false,
            }
        case UPDATE_POST_RESET:
            return {
                ...state,
                isUpdate: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}


// create new product 
export const newPostReducer = (state = { post: {} }, action) => {

    switch (action.type) {

        case NEW_POST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_POST_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                post: action.payload.post
            }

        case NEW_POST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case NEW_POST_RESET:
            return {
                ...state,
                loading: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state

    }

}