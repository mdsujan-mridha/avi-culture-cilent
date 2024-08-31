import React from 'react';
import "./postCard.css";
import { Link } from 'react-router-dom';

const PostCard = ({ item }) => {
    // console.log(item);

    return (
        <Link to={`/blogs/${item._id}`} className='productCard' >
            <img src={item.images[0]?.url} alt={item.name}/>
            <p> {item.title} </p>
            <div>
            </div>
        </Link>
    );
};

export default PostCard;