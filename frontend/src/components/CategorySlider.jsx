import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

const categories = [
  { name: "womens-dresses", img: "https://b0bcebf4-d767-420b-9f5a-cccfc5015c46.selstorage.ru/iblock/49b/bu6511f8k62f684xggbodhupqfcq1l80.jpg" },
  { name: "Sarees", img: "https://puzzleit.ru/files/puzzles/223/222930/_background.jpg" },
  { name: "Kurtas", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi7HDVEZqNPH3M1Hn-YuROUGIgOBUsYEMKbzZb36MRfg0Iw3LRPjfqO95F_67g9_PG6Sdpps9JkDgpK-gGCRhRntPz57Ypp1knkgCjmc0H4jHnyzFlrEqPy5DPNSRwjsm6SjftveIO8s5Y/s1600/salwaar1.jpg" },
  { name: "Sports", img: "https://www.10wallpaper.com/wallpaper/1366x768/1801/Nike_Brand_Ads_Poster_Running_Girl_1366x768.jpg" },
  { name: "Salwar Sets", img: "https://i.ytimg.com/vi/OqW6ns-iKnI/maxresdefault.jpg" },
  { name: "Men", img: "https://wlooks.ru/images/article/orig/2016/11/belyj-muzhskoj-kostyum.jpg" },
  { name: "Kids", img: "https://i.pinimg.com/originals/4f/8b/da/4f8bda5454340c9215b974a2663f8fa7.jpg" },
];

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 2,
  arrows: true,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 4
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2
      }
    }
  ]
};

const CategoryCarousel = () => {
   const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/all-products?category=${category}`);
  };

  return (
    <div className="container mt-5">
      <div className='d-flex align-items-center'><h4 className="fw-bold mb-4 me-5">Shop By Category</h4>
      <span className='ms-5 text-secondary'>Swipe <BsArrowRight/></span></div>
      <Slider {...settings}>
        {categories.map((item, index) => (
          <div key={index} className="text-center px-2" onClick={() => handleClick(categories.name)} style={{ cursor: 'pointer' }}>
            <div className="rounded overflow-hidden mb-2">
              <img src={item.img} alt={item.name} className="img-fluid rounded shadow-sm" style={{ height: "140px", objectFit: "cover", width: "100%" }} />
            </div>
            <p className="fw-semibold">{item.name}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategoryCarousel;
