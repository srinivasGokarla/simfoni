import React from 'react';
import  {AllItems}  from './AllItems'
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const dummyImages = [
    'https://images.pexels.com/photos/601169/pexels-photo-601169.jpeg',
    'https://images.pexels.com/photos/94865/pexels-photo-94865.jpeg',
    'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg',
    'https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg',
    'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg',
    'https://images.pexels.com/photos/1128426/pexels-photo-1128426.jpeg'
  ];
export const HomePage: React.FC = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      };
    
    return (
        <div>
            <div className="home-body">
            <Slider {...settings}>
        {dummyImages.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`slide-${index}`} style={{ width: '80%', margin:"auto" }} />
          </div>
        ))}
      </Slider>
                <AllItems />
            </div>
        </div>
    );
};
