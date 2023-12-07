
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Slider from 'react-slick';

import { FETCH_CATEGORIES_SUCCESS } from '../redux/ActionTypes';
import {  setLoading,  setSelectedCategory } from '../redux/store';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
interface Category {
  categoryId: string;
  displayName: string;
 
}
interface CategoriesProps {
    onSelectCategory: (categoryId: string | null) => void;
  }
  const Categories: React.FC<CategoriesProps> = ({ onSelectCategory }) => {
  const dispatch = useDispatch();
  const categories: Category[] = useSelector((state: any) => state.categories);

  useEffect(() => {
    const getCategories = async () => {
      dispatch(setLoading(true));
      const options = {
        method: 'GET',
        url: 'https://wayfair.p.rapidapi.com/categories/list',
        params: { caid: '214970' },
        headers: {
          'X-RapidAPI-Key': '584b5764admshb43673630f37666p197c98jsn5122825d9985',
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
  const handleSelectCategory = (categoryId: string | null) => {
    dispatch(setSelectedCategory(categoryId));
  };


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

return (
    <div>
      <h2 className='sub-headings'>Best Selling</h2>
      <div>
        <Slider {...settings}>
        {categories.map((category : Category) => (
            <div
              className="category"
              key={category.categoryId}
              onClick={() => handleSelectCategory(category.categoryId)}
            >
              <div className="image flex">
                <img
                  src="https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt=""
                />
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
