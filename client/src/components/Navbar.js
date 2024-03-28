import React from 'react'
import Logo from '../assets/Logo.png'
import ProfilePhoto from '../assets/profilePhoto.png'
import { useState } from 'react';

const Navbar = () => {

    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const pathname = window.location.pathname; // Get current pathname
    
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b">
        <div className="max-w-screen-xl flex flex-wrap mx-auto p-4 justify-between items-center">
            <div className="flex">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={Logo} className="h-8" alt="Stockify Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Stockify</span>
                </a>
            </div>        
            
            <div className='flex flex-row md:order-2 space-x-2 md:space-x-0 rtl:space-x-reverse'>
                {/* User Profile Toggle */}
                <div>
                    <button type="button" className="flex text-sm mt-1 bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" onClick={toggleUserMenu}>
                        <span className="sr-only">Open user menu</span>
                        <img className="w-8 h-8 rounded-full" src={ProfilePhoto} alt="user"/>
                    </button>
                    <div className={`${isUserMenuOpen ? "" : "hidden"} z-[100] absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`} id="user-dropdown">
                        <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 dark:text-white">Alex</span>
                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">alex@gmail.com</span>
                        </div>
                        <ul className="py-2" aria-labelledby="user-menu-button">
                        <li>
                            <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Subscription</a>
                        </li>
                        <li>
                            <a href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                        </li>
                        </ul>
                    </div>
                </div>
                
                {/* Main Menu Toggle for Mobile */}
                <button type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={toggleMenu}>
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
            </div>
            <div className={`${isMenuOpen ? "" : "hidden"} mr-[7%] items-center justify-between w-full md:flex md:w-auto md:order-1 md:justify-start mr-25`} id="navbar-user">
                <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                    <a href="/" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname === '/' ? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`} aria-current="page">
                        Home
                    </a>
                </li>
                <li>
                            <a href="/news" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${(pathname.startsWith("/news/") || pathname == "/news")? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`} >
                        News
                    </a>
                </li>
                <li>
                    <a href="/portfolio" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathname === '/portfolio' ? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`}>
                        Portfolio
                    </a>
                </li>
                <li>
                    <a href="/analyze" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${(pathname === '/analyze' || pathname === '/report') ? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`}>
                        Analyze
                    </a>
                </li>
                <li>
                    <a href="/learn" className={`block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${(pathname.startsWith("/learn/") || pathname == "/learn")? 'md:bg-transparent md:text-blue-700 bg-blue-700 text-white' : ''}`}>
                        Learn
                    </a>
                </li>
                </ul>
            </div>    
            
        </div>
        </nav>
    )
}

export default Navbar