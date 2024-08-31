import { cartReducer } from "./component/reducer/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./component/reducer/orderReducer";
import { newPostReducer, postDetails, postReducer, updatePostReducer } from "./component/reducer/postReducer";
import { myProductReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewReducer, productsReducer, reviewReducer } from "./component/reducer/productReducer";
import { allUserReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./component/reducer/userReducer";
import { legacy_createStore as createStore } from "redux";
const { combineReducers, applyMiddleware } = require("redux");
const { composeWithDevTools } = require("redux-devtools-extension");
const { default: thunk } = require("redux-thunk");


const reducer = combineReducers({
    // get all products  
    products: productsReducer,
    // get single products details 
    productDetails: productDetailsReducer,
    // user reducer 
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    // product:productsReducer,
    product: productReducer,
    newProduct: newProductReducer,
    // all orders for admin 
    allOrders: allOrdersReducer,
    // update & delete order by admin 
    order: orderReducer,
    productReviews: productReviewReducer,
    review: reviewReducer,
    allUsers: allUserReducer,
    userDetails: userDetailsReducer,
    posts: postReducer,
    postDetails: postDetails,
    post: updatePostReducer,
    newPost: newPostReducer,
    myProducts: myProductReducer,

})

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ?
            JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    }
};

const middleware = [thunk]


const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;