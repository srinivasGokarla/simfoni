import React, { useState } from 'react';
import Header from './Components/Header';
import './App.css';
import Categories from './Components/Categories';
import Products from './Components/Products';
import { Search } from './Components/Search';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from './Components/HomePage';
const App: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const handleSelectCategory = (categoryId: string | null) => {
    // Handle category selection logic here
    // You can update state, make API calls, or perform any other actions
    setSelectedCategoryId(categoryId);
  };
  return (
    <div className="App">
      
      {/* <Header />
     <Categories onSelectCategory={handleSelectCategory} />
     <br/>
     <br/>
     <br/>
     <Search />
     <Products /> */}
     <Header/>
     <Products/>
     {/* <Search/> */}
     <hr/>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage/>}/>
      {/* <Route path="/search" element={<Search/>}/> */}
      <Route path="/categories" element={<Categories onSelectCategory={handleSelectCategory} />}/>
      {/* <Route path="/products" element={<Products/>}/> */}

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
