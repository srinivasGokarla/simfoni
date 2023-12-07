import React, { useState } from 'react';
import Header from './Components/Header';
import './App.css';
import Products from './Components/Products';
import { Search } from './Components/Search';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from './Components/HomePage';

import  Menu from './Components/Menu';
import Details from "./Components/Details"
const App: React.FC = () => {

  return (
    <div className="App">
      
     <BrowserRouter>
      <Header/>
      <Menu/>
     
      <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/categories" element={<Details/>}/>
      <Route path="/products" element={<Products/>}/>

      </Routes>
      </BrowserRouter>
   
    </div>
  );
}

export default App;
