import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import Home from '../pages/Home/Home';
import CarListing from '../pages/CarListing/CarListing';
import AboutUs from '../pages/AboutUs/AboutUs';
import ContactUs from '../pages/ContactUs/ContactUs';
import CarDetail from '../pages/CarDetails/CarDetail';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import Booking from '../pages/Booking/Booking';
import Dashboard from '../components/Layout/Dashboard';
import UserOverview from '../pages/userDashboard/UserOverview';
import BookingManagement from '../pages/userDashboard/BookingManagement';
import PaymentManagement from '../pages/userDashboard/PaymentManagement';
import AdminOverview from '../pages/adminManagement/AdminOverview';
import ManageCar from '../pages/adminManagement/ManageCar';
import ManageBookings from '../pages/adminManagement/ManageBookings';
import ManageReturnCar from '../pages/adminManagement/ManageReturnCar';
import UserManagement from '../pages/adminManagement/UserManagement';
import Reports from '../pages/adminManagement/Reports';
import DriverRequests from '../pages/adminManagement/DriverRequests';
import ProtectedRoute from '../components/Layout/ProtectedRoute';
import Payment from '../pages/userDashboard/Payment/Payment';
import PaymentSuccess from '../pages/userDashboard/Payment/PaymentSuccess';
import PaymentFailure from '../pages/userDashboard/Payment/PaymentFailure';
import Callback from '../pages/userDashboard/Payment/Callback';
import ChangePassword from '../pages/Auth/ChangePassword';
import NotFound from '../components/NotFound';
import DriverOverview from '../pages/driverDashboard/DriverOverview';
import AssignedTrips from '../pages/driverDashboard/AssignedTrips';
import AvailableTrips from '../pages/driverDashboard/AvailableTrips';
import RequestForDriver from '../pages/RequestForDriver';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/request-for-driver',
                element: <RequestForDriver />,
            },
            {
                path: '/car-listing',
                element: <CarListing />,
            },
            {
                path: '/about-us',
                element: <AboutUs />,
            },
            {
                path: '/contact-us',
                element: <ContactUs />,
            },
            {
                path: '/car/:id',
                element: <CarDetail />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/sign-up',
                element: <Signup />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
            {
                path: '/booking',
                element: (
                    <ProtectedRoute role='user'>
                        <Booking></Booking>
                    </ProtectedRoute>
                )
            },
            {
                path: '/success/:tran_id',
                element: <PaymentSuccess />

            },
            {
                path: '/payment-failure',
                element: <PaymentFailure />
            },
            {
                path: '/callback',
                element: <Callback />,
            },
            {
                path: '/change-password',
                element: <ChangePassword />,
            },
            {
                path: '*',
                element: <h2 className='max-h-full flex items-end justify-center'>No Route Found</h2> // Create a NotFound component for a custom 404 page
            }
        ],
    },
    {
        path: '/user/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: '',
                element: (
                    <ProtectedRoute role='user'>
                        <UserOverview />
                    </ProtectedRoute>

                ),
            },
            {
                path: 'booking-management',
                element: (
                    <ProtectedRoute role='user'>
                        <BookingManagement />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'payment-management',
                element: (
                    <ProtectedRoute role='user'>
                        <PaymentManagement />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'payment',
                element: (
                    <ProtectedRoute role='user'>
                        <Payment />
                    </ProtectedRoute>
                ),
            },

        ],
    },
    {
        path: '/admin/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: '',
                element: (
                    <ProtectedRoute role='admin'>
                        <AdminOverview />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'manage-cars',
                element: (
                    <ProtectedRoute role='admin'>
                        <ManageCar />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'manage-bookings',
                element: (
                    <ProtectedRoute role='admin'>
                        <ManageBookings />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'manage-return-car',
                element: (
                    <ProtectedRoute role='admin'>
                        <ManageReturnCar />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'user-management',
                element: (
                    <ProtectedRoute role='admin'>
                        <UserManagement />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'driver-requests',
                element: (
                    <ProtectedRoute role='admin'>
                        <DriverRequests />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'reports',
                element: (
                    <ProtectedRoute role='admin'>
                        <Reports />
                    </ProtectedRoute>
                ),
            },

        ],
    },
    {
        path: '/driver/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: '',
                element: (
                    <ProtectedRoute role='driver'>
                        <DriverOverview />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'assigned-trips',
                element: (
                    <ProtectedRoute role='driver'>
                        <AssignedTrips />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'available-trips',
                element: (
                    <ProtectedRoute role='driver'>
                        <AvailableTrips />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);
