import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  name: string;
  leadImage: { id: string };
  pricing: { customerPrice: { unitPrice: { value: number } } };
  manufacturer: { name: string };
  url : string;
}

interface CatergoryProductsProps {
  categoryId: string | null;
}

const CategoryDetails: React.FC<CatergoryProductsProps> = ({ categoryId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    setProducts([])
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
         'X-RapidAPI-Key': '584b5764admshb43673630f37666p197c98jsn5122825d9985',
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
     {products.length>0 ? (<h2 className='sub-headings'>RESULTS</h2>):(<h2></h2>)} 
      <div className='search-result-wrap'>
        {products.map((product, index) => (
           <a href={product.url}>
          <div className='search-result-card' key={index}>
            <img
              src="https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
            <p className='display-name'>
              <b>{product.name}</b>
            </p>
            <div className='ireId'>{product.leadImage.id}</div>
            <p>
              <b className='price'>${product.pricing.customerPrice.unitPrice.value}</b>
              <span className='ireId'>/each</span>
            </p>
            <div>
              <b className='green'>Saving % 9.08</b>
            </div>
            <div className='display-name'>
              <b>Supplier:</b> {product.manufacturer.name} Supplier
            </div>
            <div>
              <b>Delivery by:</b> 12 Dec 2023
            </div>
            <button className='button flex cart'>Add to Cart</button>
          </div>
          </a>
        ))}
        
      </div>
      {loading && <div className="loading-spinner-container">
     <div className="loading-spinner"></div>
   </div>}
    </div>
  );
};

export default CategoryDetails;

