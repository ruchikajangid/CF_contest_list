import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {debounce} from "lodash";

import ContestCard from './Card.js';
import Pages from './Pagination.js'
import Search from './Search.js';

const MainPage = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(100);
    const [search, setSearch] = useState('');
    const [type, setType]= useState('CF');

    const numberOfItems = (e) =>
    {
      if(e.target.value < 15)
      setPostsPerPage(15);
      else
      setPostsPerPage(e.target.value);
    }

    const updateSearch = debounce((text)=>
    {
      setSearch(text);
    },1000)

    const updateType=(e)=>
    {
      setType(e.target.value);
    }
 
  
    useEffect(() => {
      const fetchPosts = async () => {
        setLoading(true);
        const contestData = await axios.get("https://codeforces.com/api/contest.list");
        setPosts(contestData.data.result);
        setLoading(false);
      };
  
      fetchPosts();
    }, []);
  

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    
    return (
       <React.Fragment>
         <div className='container mt-5'>
         <form>
        Number of Items per page <input type="text" placeholder={postsPerPage + " (Minimum 15)"}  onChange={(e)=>{numberOfItems(e)}}/>
        {" "}
        Search for Items <input type="text" placeholder="Search"  onChange={(e)=>{updateSearch(e.target.value)}}/>
        {" "} 
        Type
        <select name="Type" onChange={(e)=>{updateType(e)}}>
        <option value="CF">CF</option>
        <option value="ICPC">ICPC</option>
        </select>
        {" "}
        
        </form>
  
    {search==='' || search.length<3?
      <>
        <Pages
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        />
        {currentPosts.map(data=>data.type===type?(<ContestCard id={data.id} name={data.name} type={data.type} phase={data.phase} duration={data.durationSeconds/3600} startTime={data.startTime} />):null)}</>
        :<>
        <Search type={type} postsPerPage={postsPerPage} paginate={paginate} search={search} posts={posts}/>
        </>
      }
      </div>
      </React.Fragment> 
    );
  };
  
  export default MainPage;