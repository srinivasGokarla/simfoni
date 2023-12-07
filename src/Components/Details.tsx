
import React from 'react';
import  Categories  from './Categories';
import  CategoryDetails  from './CatergoryDetails';
import { useDispatch, useSelector } from 'react-redux';
import { RootState,setSelectedCategory } from '../redux/store';


const Details: React.FC = () => {
  const dispatch = useDispatch();
  const selectedCategoryId = useSelector((state: RootState) => state.selectedCategoryId);

  const handleSelectCategory = (categoryId: string | null) => {
    dispatch(setSelectedCategory(categoryId));
  };

  return (
    <div>
      <Categories onSelectCategory={handleSelectCategory} />
      <CategoryDetails categoryId={selectedCategoryId} />
    </div>
  );
};

export default Details;
