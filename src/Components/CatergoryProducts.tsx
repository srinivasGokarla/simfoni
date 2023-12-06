

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  name: string;
  leadImage: { id: string };
  pricing: { customerPrice: { unitPrice: { value: number } } };
  manufacturer: { name: string };
}

interface CatergoryProductsProps {
  categoryId: string | null;
}

const CatergoryProducts: React.FC<CatergoryProductsProps> = ({ categoryId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 20) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);

      const options = {
        method: 'GET',
        url: 'https://wayfair.p.rapidapi.com/products/list',
        params: {
          categoryId: categoryId,
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
        const newProducts: Product[] = response.data.response.data.category.browse.products;
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      } catch (error) {
        console.error('Error fetching data cannot able to get products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      getProducts();
    }
  }, [categoryId, page]);

  return (
    <div>
      <h2>Search Results</h2>
      <div className='search-result-wrap'>
        {products.map((product, index) => (
          <div className='search-result-card' key={index}>
            <img
              src="https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <p className='display-name'>
              <b>{product.name}</b>
            </p>
            <div className='grey'>{product.leadImage.id}</div>
            <p>
              <b className='price'>${product.pricing.customerPrice.unitPrice.value}</b>
              <span className='grey'>/each</span>
            </p>
            <div>
              <b className='green'>Saving % 4.06</b>
            </div>
            <div className='display-name'>
              <b>Supplier:</b> {product.manufacturer.name} Supplier
            </div>
            <div>
              <b>Delivery by:</b> 24 Dec 2023
            </div>
            <button className='button flex cart'>Add to Cart</button>
          </div>
        ))}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default CatergoryProducts;

