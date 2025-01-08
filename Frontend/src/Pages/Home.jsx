import React from 'react';
import FeaturedCakes from '../Components/FeaturedCakes';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import SweetItems from '../Components/SweetItems';

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-pink-300 via-red-200 to-pink-500 min-h-screen p-5 text-white">
      {/* Carousel Section */}
      <div className="mb-10">
        <Carousel 
          autoPlay 
          infiniteLoop 
          interval={5000} 
          showThumbs={false} 
          showStatus={false} 
          className="rounded-lg overflow-hidden shadow-lg"
        >
          {/* Discount Banner */}
          <div className="flex items-center justify-center bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 h-48 p-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center">
                <FontAwesomeIcon icon={faGift} className="mr-3" />
                Exciting Discounts!
              </h2>
              <p className="text-lg">
                <strong>Buy 5+ cakes</strong> and get a <span className="font-bold">10% discount</span> on your order!
              </p>
              <p className="mt-2 text-sm text-yellow-100">
                Don’t miss out on this sweet offer—treat your loved ones today!
              </p>
            </div>
          </div>

          {/* Career Opportunity Banner */}
          <div className="flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-500 h-48 p-6">
            <a 
              href="/careers" 
              className="text-center w-full h-full flex items-center justify-center text-white no-underline"
              target="_self" // Adjust as needed
              rel="noopener noreferrer"
            >
              <div>
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center">
                  <FontAwesomeIcon icon={faSuitcase} className="mr-3" />
                  Career Opportunities
                </h2>
                <p className="text-lg">
                  Join our team and help us spread joy with delicious cakes!
                </p>
                <p className="mt-2 text-sm text-blue-100">
                  Explore openings and apply today—be part of our story.
                </p>
              </div>
            </a>
          </div>
        </Carousel>
      </div>

      {/* Featured Cakes Section */}
      <FeaturedCakes />
      <SweetItems />
    </div>
  );
}
