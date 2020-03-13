import React from 'react';
import ContestCard from './Card.js';
import Pages from './Pagination.js'
import { render } from '@testing-library/react';

const Search = ({type, postsPerPage,paginate, search, posts})=>
{
    render()
    {
        let filteredResults = posts.filter((post)=> post.type===type?post.name.toUpperCase().indexOf(search.toUpperCase()) !== -1: null);
        return(
            <div className='container mt-5'>
            <Pages
                postsPerPage={postsPerPage} 
                totalPosts={filteredResults.length}
                paginate={paginate}
            />
            {filteredResults.map(data=>
                (<ContestCard id={data.id} name={data.name} type={data.type} phase={data.phase} duration={data.durationSeconds/3600} startTime={data.startTime} />))}
            </div>
        );
    }
}

export default Search;