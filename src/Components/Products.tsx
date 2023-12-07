
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchProductsSuccess, setLoading,setPage } from '../redux/store';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products);
  const page = useSelector((state: any) => state.page);
  const loading = useSelector((state: any) => state.loading);

  useEffect(() => {
    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 20) {
          dispatch(setPage(page + 1)); // Dispatch the setPage action
        }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch]);

  useEffect(() => {
    const getProducts = async () => {
      dispatch(setLoading(true));
      const options = {
        method: 'GET',
        url: 'https://wayfair.p.rapidapi.com/products/list',
        params: {
          itemsPerPage: '48',
          page: page,
        },
        headers: {
          'X-RapidAPI-Key': '584b5764admshb43673630f37666p197c98jsn5122825d9985',
          'X-RapidAPI-Host': 'wayfair.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data,"checking")
        const newProducts = response.data.response.data.category.browse.products;
        dispatch(fetchProductsSuccess(newProducts));
      } catch (error) {
        console.error('Error fetching data cannot able to get products:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    getProducts();
  }, [page, dispatch]);

  return (
    <div>
   <h2 className='sub-headings'>SEE MORE ITEMS</h2>
      <div className='search-result-wrap'>
      
      {products.map((product: any, index : number) => (
        <a href={product.url}>
         <div className='search-result-card' key={index}>
         <img src="https://images.pexels.com/photos/163146/tablet-notes-coffee-work-desk-163146.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
         <p className='display-name'><b>{product.name}</b></p>
         <div className='grey'>{product.ireId}</div>
         <p ><b className='price'>$0.83</b><span className='grey'>/each</span></p>
         <div><b className='green'>Saving % 4.06</b></div>
         <div><b>Supplier:</b> Supplier</div>
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

export default Products;
