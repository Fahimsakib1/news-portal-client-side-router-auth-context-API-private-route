import React from 'react';
import { useLoaderData } from 'react-router-dom';
import NewsSummaryCard from '../../Shared/NewsSummaryCard/NewsSummaryCard';

const Home = () => {
    const allNews = useLoaderData()
    //console.log(allNews)
    return (
        <div>
            <h3> Total Available News: {allNews.length}</h3>

            {
                allNews.map(news => <NewsSummaryCard key={news._id} news ={news}></NewsSummaryCard>)
            }
        </div>
    );
};

export default Home;