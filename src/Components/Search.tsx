import React, { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

interface SearchResultItem {
  displayName: string;
  ireId: string;
 
}

interface SearchResult {
  [categoryId: string]: SearchResultItem;
}

export const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult>({});

  const fetchData = async (searchKeyword: string) => {
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
        'X-RapidAPI-Key': '94734f0ae6mshe175d77ec61599cp193ccbjsn3fdf6eb678ce',
        'X-RapidAPI-Host': 'wayfair.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setSearchResults(response.data.response.categoryAppData.categories);
      console.log(response.data.response.categoryAppData.categories);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    fetchData(searchTerm);
  };

  return (
    <div>
      <div className='search-wrap'>
        <br />
        <div className='flex'>
          <input
            type="text"
            placeholder="Search..."
            className='search-bar'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className='button flex' onClick={handleSearch}>Search</button>
        </div>
        <div className='search-result-wrap'>
          {Object.keys(searchResults).map((categoryId, index) => {
            const resultItem = searchResults[categoryId];
            return (
              <div className='search-result-card' key={index}>
                <img src="https://images.pexels.com/photos/5760872/pexels-photo-5760872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                <p className='display-name'><b>{resultItem.displayName}</b></p>
                <div className='grey'>{resultItem.ireId}</div>
                <p><b className='price'>$0.83</b><span className='grey'>/each</span></p>
                <div><b className='green'>Saving % 4.06</b></div>
                <div><b>Supplier:</b> Supplier</div>
                <div><b>Delivery by:</b> 24 dec 2023</div>
                <button className='button flex cart'>Add to Cart</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
