import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Logo from '../assets/Logo.png'

// Replace these with your own social media URLs
const socialMediaLinks = {
  facebook: '#',
  twitter: '#',
  instagram: '#',
};

const Footer = () => {
  return (
    <footer className="bg-white-100 text-black body-font w-full border-t border-gray-300  dark:focus:ring-gray-600">
      {/* <div className="container mx-auto mt-10 flex items-start justify-between w-full"> */}
      <div className="container px-5 mx-auto mt-5 flex flex-col lg:flex-row items-start justify-between w-full">
        <div className="mr-5 mb-5">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} alt="Logo" className="w-10 h-10" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-black">Stockify</span>
          </a>
        </div>
        <div className="mr-5">
          <h2 className="font-medium text-gray-900 title-font mb-2">Product</h2>
          <nav className="list-none mb-10">
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">Stocks</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">Analysis</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">Pricing</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">FAQ</a>
            </li>
          </nav>
        </div>
        <div className="mr-5">
          <h2 className="font-medium text-gray-900 title-font mb-2">Company</h2>
          <nav className="list-none mb-10">
            <li>
              <a href="/" className="text-gray-600 hover:text-gray-800">About Us</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">Careers</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">Sponsors</a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">Terms of Service</a>
            </li>
          </nav>
        </div>
        <div className="mr-5">
          <h2 className="font-medium text-gray-900 title-font mb-2">Social Media</h2>
          <div className="flex">
            <a href={socialMediaLinks.facebook} className="text-gray-600 hover:text-gray-800 mr-4">
              <FaFacebook className="w-6 h-6" />
            </a>
            <a href={socialMediaLinks.twitter} className="text-gray-600 hover:text-gray-800 mr-4">
              <FaTwitter className="w-6 h-6" />
            </a>
            <a href={socialMediaLinks.instagram} className="text-gray-600 hover:text-gray-800">
              <FaInstagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="bg-white mt-5 mb-5">
          <p className="text-sm text-center text-gray-600">© 2024 Stockify. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
