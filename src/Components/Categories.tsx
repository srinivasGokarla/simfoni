// Categories.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Slider from 'react-slick';
import { Link } from 'react-router-dom'; 
import { ActionTypes, FETCH_CATEGORIES_SUCCESS } from '../redux/ActionTypes';
import { setCategories, setLoading, setProducts, setSearchResults, setSearchTerm, setSelectedCategory } from '../redux/store';  // Import actions directly

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
interface CategoriesProps {
    onSelectCategory: (categoryId: string | null) => void;
  }
  const Categories: React.FC<CategoriesProps> = ({ onSelectCategory }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state: any) => state.categories);

  useEffect(() => {
    const getCategories = async () => {
      dispatch(setLoading(true));
      const options = {
        method: 'GET',
        url: 'https://wayfair.p.rapidapi.com/categories/list',
        params: { caid: '214970' },
        headers: {
          'X-RapidAPI-Key': '94734f0ae6mshe175d77ec61599cp193ccbjsn3fdf6eb678ce',
          'X-RapidAPI-Host': 'wayfair.p.rapidapi.com',
        },
      };
      try {
        const response = await axios.request(options);
        dispatch({
            type: FETCH_CATEGORIES_SUCCESS,
            payload: response.data.response.categoryAppData.departmentCategories,
          });
      } catch (error) {
        console.error('Error fetching data cannot able to get categories :', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    getCategories();
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

return (
    <div>
      <h2>Best Selling</h2>
      <div>
        <Slider {...settings}>
          {categories.map((category: any) => (
            <div key={category.categoryId} onClick={() => onSelectCategory(category.categoryId)}>
              <div className='image-placeholder'>
                <p>{category.displayName}</p>
              </div>
              <p>{category.displayName}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Categories;
