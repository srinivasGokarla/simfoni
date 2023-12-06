// ParentSharing.tsx
import React from 'react';
import  Categories  from '../Components/Categories';
import  CatergoryProducts  from '../Components/CatergoryProducts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState,setSelectedCategory } from '../redux/store';


const ParentSharing: React.FC = () => {
  const dispatch = useDispatch();
  const selectedCategoryId = useSelector((state: RootState) => state.selectedCategoryId);

  const handleSelectCategory = (categoryId: string | null) => {
    dispatch(setSelectedCategory(categoryId));
  };

  return (
    <div>
      <Categories onSelectCategory={handleSelectCategory} />
      <CatergoryProducts categoryId={selectedCategoryId} />
    </div>
  );
};

export default ParentSharing;
