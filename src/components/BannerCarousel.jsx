import React from "react";
import Slider from "react-slick";

const BannerCarousel = () => {
  const banners = [
    { id: 1, imgSrc: "/assets/banner1.png", alt: "Banner 1" },
    { id: 2, imgSrc: "/assets/banner2.png", alt: "Banner 2" },
    { id: 3, imgSrc: "/assets/banner3.png", alt: "Banner 3" },
    { id: 4, imgSrc: "/assets/banner4.png", alt: "Banner 4" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    adaptiveHeight: true, 
  };

  return (
    <div className="banner-container relative w-full overflow-hidden">
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.id} className="banner-slide">
            <img
              src={banner.imgSrc}
              alt={banner.alt}
              className="banner-image object-cover w-full" 
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerCarousel;