import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { FaStar } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import useTitle from '../../../Hooks/useTitle';


const News = () => {
    
    useTitle('News Details')
    
    const news = useLoaderData()
    console.log(news);
    const { details, image_url, title, author, rating, category_id } = news;
    const { name, published_date } = news.author

    
    return (
        <div>
            <Card className='mb-5'>
                <Card.Img variant="top" src={image_url} />
                <Card.Title className='text-center my-3'>{title}</Card.Title>
                <div className='d-flex justify-content-evenly align-items-center mt-3 mb-2'>
                    <p className='mb-0'><span className='fw-bold'>Author: </span> {name}</p>
                    <p className='mb-0'><span className='fw-bold'>Published Date: </span>{published_date}</p>
                    <div className='d-flex justify-content-center align-items-center'>
                        <FaStar className='text-warning me-2'></FaStar>
                        <p className='mb-0'>{rating.number}</p>
                    </div>
                </div>
                <Card.Body>
                    <Card.Text>
                        <span>{details}</span>
                    </Card.Text>
                </Card.Body>
                <div className='mx-auto mb-4'>
                    <Link to={`/category/${category_id}`}>
                        <Button variant="primary" className='text-center '>All News For This Category</Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default News;