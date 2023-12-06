// Products.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchProductsSuccess, setLoading,setPage } from '../redux/store';
import { Link } from 'react-router-dom';

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
          'X-RapidAPI-Key': '94734f0ae6mshe175d77ec61599cp193ccbjsn3fdf6eb678ce',
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
      {/* <Link to={"/products"} ><div className='see-more flex'>See more &#10148;</div> </Link> */}
      
      <div>
        {products.slice(0,10).map((product: any, index: number) => (
         <div className='search-result-card' key={index}>
         <img src="https://images.pexels.com/photos/5760872/pexels-photo-5760872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
         <p className='display-name'><b>{product.name}</b></p>
         <div className='grey'>{product.ireId}</div>
         <p ><b className='price'>$0.83</b><span className='grey'>/each</span></p>
         <div><b className='green'>Saving % 4.06</b></div>
         <div><b>Supplier:</b> Supplier</div>
         <div><b>Delivery by:</b> 24 dec 2023</div>
         <button className='button flex cart'>Add to Cart</button>
       </div>
        ))}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Products;
