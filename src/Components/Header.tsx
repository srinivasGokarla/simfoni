import React from 'react';
import { Link } from 'react-router-dom';

import { IoNotificationsOutline,IoCartOutline,IoSearchOutline, IoPersonOutline, IoHeartOutline, IoWalletOutline,IoMenuOutline } from 'react-icons/io5';
import '../App.css';

const Header: React.FC = () => {
  return (
    <header className='flex header-wrap'>
      <div className='flex header-left'>
        <IoMenuOutline size={22} color="black" />
        <img src="https://simfoni.com/wp-content/uploads/2021/03/Artboard-1-2.png" alt="" />
        <Link to={"/"}><p className='teal'>Home</p></Link>

        <p>Catalog</p>
        <p>BuyDesk</p>
        <p>History<span className='drop-icon'> ▼</span></p>
        <p>Dashboard</p>
       
      </div>
      <div className='flex header-right'>
        
        
        <Link to={"/search"} >
        <input type="text"  />
        </Link>
        <IoSearchOutline className='search-icon' size={18} stroke='grey'/>
        <br />
        <button className='help-btn flex'>Help</button>
        <br />
    <IoCartOutline size={26} stroke='grey'/>
<IoHeartOutline size={26} stroke='grey'/>
<IoWalletOutline size={26} stroke='grey'/> 
<IoNotificationsOutline size={26} stroke='grey' />
<IoPersonOutline size={26} stroke='grey' />
<img src="https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/profile-pic-male_2fd3e8.svg" alt="" />
<div className='ireId'>Srinivas Gokarla</div>
    </div>
    </header>
  );
};

export default Header;
