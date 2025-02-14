import React from "react";

const AboutUs = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
  <div className="relative w-full pt-[35%] md:pt-[50%] lg:pt-[60%]"> 
    <img
      src="/assets/aboutbanner.png"
      alt="aboutbanner"
      className="absolute inset-0 w-full h-full object-cover object-center"
    />
    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
    <h2 className="absolute top-1/4 md:top-1/3 lg:top-1/5 text-white text-2xl md:text-4xl lg:text-6xl font-bold text-center px-6 md:px">
  About Us
</h2>


    </div>
  </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-lg text-gray-900 leading-relaxed text-justify mb-6">
          Clothico is your ultimate destination for premium fashion and style.
          We believe that clothing is more than just fabric - it's an expression
          of individuality, confidence, and personality.
        </p>

        <p className="text-lg text-gray-900 leading-relaxed text-justify mb-6">
          At Clothico, we're dedicated to redefining the way you experience
          fashion. Our collections are thoughtfully designed to combine timeless
          elegance with modern trends, ensuring that every piece resonates with
          your unique sense of style. From casual essentials to show-stopping
          outfits, we cater to every occasion, empowering you to look and feel
          your best.
        </p>

        
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 text-xl mb-2">Our Promise</h3>
          <p className="text-lg text-gray-900 leading-relaxed text-justify">
            We take pride in using high-quality materials and sustainable
            practices to create clothing that is not only stylish but also
            comfortable and durable. Every thread is a commitment to exceptional
            craftsmanship, ensuring that our garments reflect excellence in
            every detail.
          </p>
        </div>

       
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 text-xl mb-2">Our Mission</h3>
          <p className="text-lg text-gray-900 leading-relaxed text-justify">
            To inspire confidence and individuality through fashion, providing
            our customers with a seamless shopping experience, exceptional
            value, and styles that make a statement.
          </p>
        </div>

       
        <div>
          <h3 className="font-bold text-gray-900 text-xl text-center mb-4">
            Why Choose Clothico?
          </h3>
          <ul className="list-disc pl-6 text-lg text-gray-900 space-y-3">
            <li>
              <strong className="text-gray-900">Unmatched Quality:</strong>
              We prioritize quality in every stitch to ensure lasting comfort
              and satisfaction.
            </li>
            <li>
              <strong className="text-gray-900">Exclusive Designs:</strong>
              Our team works tirelessly to bring you unique and trend-setting
              styles.
            </li>
            <li>
              <strong className="text-gray-900">Sustainability Matters:</strong>
              We're committed to eco-friendly practices that make fashion more
              responsible.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;





