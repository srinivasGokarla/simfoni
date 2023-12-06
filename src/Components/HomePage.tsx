import React,{useState} from 'react';
//import  {AllItems}  from './AllItems'
import Categories  from "./Categories"
import { Search } from './Search';


export const HomePage: React.FC = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const handleSelectCategory = (categoryId: string | null) => {
        // Handle category selection logic here
        // You can update state, make API calls, or perform any other actions
        setSelectedCategoryId(categoryId);
      };
    return (
        <div>
            <div className="home-body">
            <Search/>
            <Categories onSelectCategory={handleSelectCategory} />
                {/* <AllItems /> */}
            </div>
        </div>
    );
};
