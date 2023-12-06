// Products.tsx
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
          'X-RapidAPI-Key': '62ef5d8136msh78832de175babeap1f7b3ejsn8a47728230a4',
          'X-RapidAPI-Host': 'wayfair.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
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
      <h2>All items</h2>
      <div>
        {products.map((product: any, index: number) => (
          <div key={index}>
            <p>{product.name}</p>
          </div>
        ))}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Products;
