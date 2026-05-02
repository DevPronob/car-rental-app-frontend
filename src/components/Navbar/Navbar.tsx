import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout, selectCurrentUser, useCurrentToken } from '../../redux/features/auth/authSlice';
import { Button, message } from 'antd';
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";

function Navbar() {
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectCurrentUser);
    const token = useAppSelector(useCurrentToken);
    const [dark, setDark] = useState(false);
    const navigate = useNavigate();

    const handleOnClick = () => {
        setOpen(!open);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
        message.success('Logged out successfully');
    };

    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-6 py-4">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </div>
                    <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter italic">AVIS</span>
                </Link>

                <div className="flex items-center gap-4 md:order-2">
                    <button 
                        onClick={darkModeHandler}
                        className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                    >
                        {dark ? <IoSunny size={20} /> : <IoMoon size={20} />}
                    </button>

                    {token ? (
                        <div className="flex items-center gap-4">
                            <Link 
                                to={`/${user?.role}/dashboard`}
                                className="hidden md:block text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                Dashboard
                            </Link>
                            <Button 
                                onClick={handleLogout} 
                                className='h-11 px-6 bg-red-500 hover:bg-red-600 text-white border-none rounded-xl font-bold transition-all'
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Link to="/login">
                            <Button className='h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white border-none rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all'>
                                Sign In
                            </Button>
                        </Link>
                    )}

                    <button
                        onClick={handleOnClick}
                        className="inline-flex items-center p-2 text-gray-500 rounded-xl md:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>

                <div className={`${open ? 'block shadow-2xl scale-100 opacity-100' : 'hidden md:block scale-95 opacity-0 md:scale-100 md:opacity-100'} w-full md:w-auto transition-all duration-300`}>
                    <ul className="font-bold flex flex-col md:flex-row p-4 md:p-0 mt-4 border border-gray-100 rounded-2xl bg-gray-50 md:space-x-10 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        {['Home', 'Car Listing', 'About Us', 'Contact Us'].map((item) => (
                            <li key={item}>
                                <Link 
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} 
                                    className="block py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors md:p-0"
                                    onClick={() => setOpen(false)}
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                        {user && (
                            <li className="md:hidden">
                                <Link 
                                    to={`/${user?.role}/dashboard`}
                                    className="block py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                                    onClick={() => setOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
