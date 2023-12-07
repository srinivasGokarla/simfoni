import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { RootState,setProducts, setLoading } from '../redux/store';

export const AllItems = () => {
  const dispatch = useDispatch();
  const { products, loading,page } = useSelector((state: RootState) => state);

  useEffect(() => {
    const getProducts = async () => {
      dispatch(setLoading(true));
      const options = {
        method: 'GET',
        url: 'https://wayfair.p.rapidapi.com/products/list',
        params: {
          categoryId:"45974",
          itemsPerPage: '40',
          page: '1',
        },
        headers: {
         'X-RapidAPI-Key': '584b5764admshb43673630f37666p197c98jsn5122825d9985',
          'X-RapidAPI-Host': 'wayfair.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        dispatch(setProducts(response.data.response.data.category.browse.products));
      } catch (error) {
        console.error('Error fetching data cannot able to get products:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    getProducts();
  }, [dispatch,page]);

  const displayedProducts = products.slice(0, 10);

  return (
    <div>
    <br />
    <br />
 <Link to={"/products"} ><div className='see-more flex'>See more &#10148;</div> </Link> 
    <h2 className='sub-headings'>All items</h2>
    
    <div className='search-result-wrap'>
      {displayedProducts.map((product, index) => (
        <a href={product.url}>
        <div className='search-result-card' key={index}>
        <img src="https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
       <p className='display-name'><b>{product.name}</b></p>
        <div className='ireId'>{product.leadImage.id}</div>
        <p ><b className='price'>${product.pricing.customerPrice.unitPrice.value}</b><span className='ireId'>/each</span></p>
        <div><b className='green'>Saving % 4.06</b></div>
        <div className='display-name' ><b>Supplier:</b> {product.manufacturer.name}Supplier</div>
        <div><b>Delivery by:</b> 24 dec 2023</div>
        <button className='button flex cart'>Add to Cart</button>
      </div>
      </a>
      ))}
     
    </div>
    {loading && 
     <div className="loading-spinner-container">
     <div className="loading-spinner"></div>
   </div>}
  </div>
  );
};
