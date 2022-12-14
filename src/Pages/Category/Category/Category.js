import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useTitle from '../../../Hooks/useTitle';
import NewsSummaryCard from '../../Shared/NewsSummaryCard/NewsSummaryCard';

const Category = () => {
    const categoryNews = useLoaderData()
    //console.log(categoryNews);
    useTitle('News Categories')

    return (
        <div>
            <h3 className='mb-5'>Total News of this category: {categoryNews.length}</h3>

            {
                categoryNews.map(news => <NewsSummaryCard news={news} key={news._id}></NewsSummaryCard>)
            }

        </div>
    );
};

export default Category;