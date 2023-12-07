import React, { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState,setProducts, setLoading } from '../redux/store';

interface SearchResultItem {
  displayName: string;
  ireId: string;
 
}

interface SearchResult {
  [categoryId: string]: SearchResultItem;
}

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult>({});
  const { products, loading,page } = useSelector((state: RootState) => state);
  

  const fetchData = async (searchKeyword: string) => {
    dispatch(setLoading(true));
    const options: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://wayfair.p.rapidapi.com/products/search',
      params: {
        keyword: searchKeyword,
        sortby: '0',
        curpage: '1',
        itemsperpage: '48',
      },
      headers: {
        'X-RapidAPI-Key': '584b5764admshb43673630f37666p197c98jsn5122825d9985',
        'X-RapidAPI-Host': 'wayfair.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setSearchResults(response.data.response.categoryAppData.categories);
      console.log(response.data.response.categoryAppData.categories);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSearch = () => {
    fetchData(searchTerm);
  };

  return (
    <div>
       <div className='search-wrap'>
        <br />
        <div className='flex search-input-wrap'>
      <input
      className='search-bar'
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className='button flex' onClick={handleSearch}>Search</button>
      </div>
      <br />
      </div>
        <div className='search-result-wrap'>
          {Object.keys(searchResults).map((categoryId, index) => {
            const resultItem = searchResults[categoryId];
            return (
              <div className='search-result-card' key={index}>
                <img src="https://images.pexels.com/photos/5760872/pexels-photo-5760872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                <p className='display-name'><b>{resultItem.displayName}</b></p>
                <div className='ireId'>{resultItem.ireId}</div>
                <p><b className='price'>$0.83</b><span className='ireId'>/each</span></p>
                <div><b className='green'>Saving % 4.06</b></div>
                <div><b>Supplier:</b> Supplier</div>
                <div><b>Delivery by:</b> 24 dec 2023</div>
                <button className='button flex cart'>Add to Cart</button>
              </div>
            );
          })}
        </div>
        {loading && 
     <div className="loading-spinner-container">
     <div className="loading-spinner"></div>
   </div>}
      </div>
    
  );
};
