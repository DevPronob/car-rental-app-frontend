import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logout, selectCurrentUser } from '../../redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { 
    HiOutlineViewGrid, 
    HiOutlineTruck, 
    HiOutlineClipboardList, 
    HiOutlineUsers, 
    HiOutlineChartBar, 
    HiOutlineLogout, 
    HiOutlineHome,
    HiOutlineMenuAlt2,
    HiOutlineLightningBolt,
    HiX
} from "react-icons/hi";
import { message } from 'antd';

function Dashboard() {
    const user = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
        message.success('Logged out successfully');
    };

    const adminItems = [
        { name: 'Overview', path: '/admin/dashboard', icon: <HiOutlineViewGrid size={22} /> },
        { name: 'Manage Cars', path: '/admin/dashboard/manage-cars', icon: <HiOutlineTruck size={22} /> },
        { name: 'Manage Bookings', path: '/admin/dashboard/manage-bookings', icon: <HiOutlineClipboardList size={22} /> },
        { name: 'Return Car', path: '/admin/dashboard/manage-return-car', icon: <HiOutlineClipboardList size={22} /> },
        { name: 'User Management', path: '/admin/dashboard/user-management', icon: <HiOutlineUsers size={22} /> },
        { name: 'Driver Requests', path: '/admin/dashboard/driver-requests', icon: <HiOutlineUsers size={22} /> },
        { name: 'Reports', path: '/admin/dashboard/reports', icon: <HiOutlineChartBar size={22} /> },
    ];

    const driverItems = [
        { name: 'Overview', path: '/driver/dashboard', icon: <HiOutlineViewGrid size={22} /> },
        { name: 'Available Trips', path: '/driver/dashboard/available-trips', icon: <HiOutlineLightningBolt size={22} /> },
        { name: 'My Trips', path: '/driver/dashboard/assigned-trips', icon: <HiOutlineTruck size={22} /> },
    ];

    const userItems = [
        { name: 'Overview', path: '/user/dashboard', icon: <HiOutlineViewGrid size={22} /> },
        { name: 'My Bookings', path: '/user/dashboard/booking-management', icon: <HiOutlineClipboardList size={22} /> },
        { name: 'Payments', path: '/user/dashboard/payment-management', icon: <HiOutlineChartBar size={22} /> },
    ];

    const menuItems = user?.role === 'admin' 
        ? adminItems 
        : user?.role === 'driver' 
            ? driverItems 
            : userItems;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a] transition-colors duration-300 flex">
            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700
                transition-transform duration-300 transform lg:translate-x-0 lg:static lg:inset-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex flex-col h-full p-6">
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-12 px-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </div>
                        <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter italic uppercase">AVIS</span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                end={item.path.endsWith('dashboard')}
                                className={({ isActive }) => `
                                    flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all group
                                    ${isActive 
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-blue-600 dark:hover:text-blue-400'
                                    }
                                `}
                            >
                                <span className="transition-transform group-hover:scale-110">{item.icon}</span>
                                {item.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Footer Actions */}
                    <div className="mt-auto space-y-2 pt-6 border-t border-gray-100 dark:border-gray-700">
                        <button 
                            onClick={() => navigate('/')}
                            className="flex items-center gap-4 w-full px-4 py-3.5 rounded-2xl font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all group"
                        >
                            <HiOutlineHome size={22} className="group-hover:text-blue-600 transition-colors" />
                            Go To Home
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-4 w-full px-4 py-3.5 rounded-2xl font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all group"
                        >
                            <HiOutlineLogout size={22} className="group-hover:scale-110 transition-transform" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Header */}
                <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 px-8 py-4">
                    <div className="flex justify-between items-center">
                        <button 
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl"
                        >
                            {isSidebarOpen ? <HiX size={24} /> : <HiOutlineMenuAlt2 size={24} />}
                        </button>

                        <div className="flex items-center gap-4 ml-auto">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">{user?.name}</p>
                                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{user?.role} Account</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-xl border border-blue-200 dark:border-blue-800">
                                {user?.name?.[0].toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}

export default Dashboard;
