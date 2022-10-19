import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import { FaEye, FaRegBookmark, FaShareAlt, FaStar } from "react-icons/fa";

const NewsSummaryCard = ({ news }) => {
    //console.log(news)
    const { _id, category_id, title, rating, details, total_view, thumbnail_url, author, image_url } = news;

    const { name, published_date, img } = news.author;

    return (
        <div>
            <Card className="my-5">
                <Card.Header className='d-flex justify-content-between align-items-center'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <Image
                            roundedCircle
                            src={img}
                            style={{ height: "60px" }}
                        >
                        </Image>
                        <div className='ms-3 mt-2'>
                            <p className='mb-0 fw-bold'>{name ? name : 'No Name Found'}</p>
                            <p>{published_date ? published_date : 'No Date Found'}</p>
                        </div>
                    </div>

                    <div className=''>
                        <FaRegBookmark className='me-2'></FaRegBookmark>
                        <FaShareAlt></FaShareAlt>
                    </div>
                </Card.Header>

                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Img variant="top" src={image_url} />
                    <Card.Text>
                        {

                            details.length > 200 ? <p>{details.slice(0, 200) + '...'} <Link to={`/news/${_id}`}>Read More</Link></p> : <p>{details}</p>

                        }
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted d-flex justify-content-between align-items-center">

                    <div className='d-flex justify-content-between align-items-center'> 
                        <FaStar className='text-warning'></FaStar>
                        <p className='my-auto ms-1'>{rating.number}</p>
                    </div>

                    <div className='d-flex justify-content-between align-items-center'>
                        <FaEye></FaEye>
                        <p className='my-auto ms-1'>{total_view}</p>
                    </div>
                
                </Card.Footer>
            </Card>
        </div>
    );
};

export default NewsSummaryCard;