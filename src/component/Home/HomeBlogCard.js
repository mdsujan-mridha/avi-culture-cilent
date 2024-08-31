import React, { Fragment } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const HomeBlogCard = ({ blog }) => {
    // console.log(blog);

    return (
        <Fragment>
            <Link to={`/blogs/${blog._id}`} style={{height:"400px"}}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={blog?.images[0]?.url}
                            alt="green iguana"
                            style={{height:'120px'}}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {blog?.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {blog?.metaDescription}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>
        </Fragment>
    );

};

export default HomeBlogCard;