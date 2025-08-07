import { Carousel } from 'react-bootstrap';

const BannerCarousel = () => {
  return (
    <Carousel fade interval={3000} pause={false} className="mt-5">
      <Carousel.Item>
        <img
          className="d-block w-100 banner-img"
          src="https://static.vecteezy.com/system/resources/previews/003/240/364/non_2x/shopping-online-on-phone-paper-art-modern-pink-background-gifts-box-free-vector.jpg"
          alt="First slide"
        />
       
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 banner-img"
          src="https://static.fibre2fashion.com/articleresources/images/96/9553/retail-big_Big.jpg"
          alt="Second slide"
        />
        
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 banner-img"
          src="https://i.pinimg.com/originals/5c/7a/51/5c7a515af18946223d48e930e4763508.jpg"
          alt="Third slide"
        />
        
      </Carousel.Item>
    </Carousel>
  );
};

export default BannerCarousel;
