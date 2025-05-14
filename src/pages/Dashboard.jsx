import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/auth/Button';
import MainLayout from '../components/layout/MainLayout';

const Dashboard = () => {
    const { user, loading } = useAuth();
    const [userAttributes, setUserAttributes] = useState({});
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        // Extract user attributes from Cognito user object
        if (user && user.attributes) {
            setUserAttributes(user.attributes);
        }
    }, [user]);

    const courseData = [
        {
            id: 1,
            title: "Creating Engaging Video Courses",
            progress: 65,
            image: "https://via.placeholder.com/300x160/5a67d8/ffffff?text=Video+Courses",
            lessons: 48,
            level: "Intermediate"
        },
        {
            id: 2,
            title: "Educational Content Marketing",
            progress: 30,
            image: "https://via.placeholder.com/300x160/5a67d8/ffffff?text=Content+Marketing",
            lessons: 56,
            level: "Intermediate"
        },
        {
            id: 3,
            title: "Basics of Online Teaching",
            progress: 100,
            image: "https://via.placeholder.com/300x160/5a67d8/ffffff?text=Online+Teaching",
            lessons: 32,
            level: "Beginner",
            completed: true
        }
    ];

    const certifications = [
        {
            id: 1,
            name: "Certified Online Educator",
            status: "Completed",
            date: "2023-09-15",
            icon: "https://via.placeholder.com/60x60/5a67d8/ffffff?text=COE"
        }
    ];

    const upcomingEvents = [
        {
            id: 1,
            title: "Building Engaging Educational Content",
            date: "2023-11-10",
            time: "10:00 AM - 11:30 AM",
            type: "Webinar"
        },
        {
            id: 2,
            title: "Interactive Learning Workshops",
            date: "2023-11-15",
            time: "1:00 PM - 3:00 PM",
            type: "Workshop"
        }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Overview Stats */}
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-lg shadow p-5 flex flex-col">
                                <div className="text-gray-500 text-sm mb-1">In Progress</div>
                                <div className="text-2xl font-bold text-gray-900 mb-2">2</div>
                                <div className="text-sm text-gray-600">Courses</div>
                                <div className="mt-3 pt-3 border-t">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">This Week</span>
                                        <span className="text-sm font-semibold text-green-600">+2 hrs</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-5 flex flex-col">
                                <div className="text-gray-500 text-sm mb-1">Completed</div>
                                <div className="text-2xl font-bold text-gray-900 mb-2">1</div>
                                <div className="text-sm text-gray-600">Certification</div>
                                <div className="mt-3 pt-3 border-t">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Next Goal</span>
                                        <span className="text-sm font-semibold text-indigo-600">ADE</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-5 flex flex-col">
                                <div className="text-gray-500 text-sm mb-1">Content Created</div>
                                <div className="text-2xl font-bold text-gray-900 mb-2">7</div>
                                <div className="text-sm text-gray-600">Items</div>
                                <div className="mt-3 pt-3 border-t">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">Total Views</span>
                                        <span className="text-sm font-semibold text-indigo-600">2.4K</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* User Profile Card */}
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="bg-indigo-600 px-6 py-8 text-white">
                                <div className="flex justify-center">
                                    <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
                                        <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-indigo-600">
                                            {userAttributes.name ? userAttributes.name.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 text-center">
                                    <h3 className="text-xl font-bold">{userAttributes.name || 'User'}</h3>
                                    <p className="text-indigo-100 mt-1">{userAttributes.email || 'No email provided'}</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between mb-4">
                                    <span className="text-gray-600">Membership</span>
                                    <span className="font-semibold text-gray-900">Pro Plan</span>
                                </div>
                                <div className="flex justify-between mb-4">
                                    <span className="text-gray-600">Join Date</span>
                                    <span className="font-semibold text-gray-900">Oct 2023</span>
                                </div>
                                <div className="pt-4 border-t">
                                    <Link to="/account-settings" className="block w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-center rounded-md text-gray-700 font-medium transition-colors">
                                        Edit Profile
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Continue Learning */}
                        <div className="lg:col-span-3 mt-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Continue Learning</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {courseData.filter(course => !course.completed).slice(0, 2).map(course => (<div key={course.id} className="bg-white rounded-lg shadow overflow-hidden transition-transform hover:shadow-md hover:-translate-y-1 duration-200">
                                    <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
                                    <div className="p-5">
                                        <h4 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h4>
                                        <div className="flex items-center text-sm text-gray-600 mb-3">
                                            <span className="mr-3">{course.lessons} lessons</span>
                                            <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">{course.level}</span>
                                        </div>
                                        <div className="mb-4">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-gray-600">Progress</span>
                                                <span className="font-semibold text-indigo-600">{course.progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                                            </div>
                                        </div>
                                        <Link to={`/course/${course.id}`} className="block w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-center rounded-md text-white font-medium transition-colors">
                                            Continue
                                        </Link>
                                    </div>
                                </div>
                                ))}
                                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 hover:bg-gray-100 transition-colors">
                                    <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </div>
                                    <h4 className="text-lg font-medium text-gray-900 mb-2">Create New Content</h4>
                                    <p className="text-sm text-gray-600 text-center mb-4">
                                        Start creating and sharing your educational content
                                    </p>
                                    <Link to="/courses" className="py-2 px-4 bg-white border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                                        Browse Courses
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Certifications and Events */}
                        <div className="lg:col-span-2 mt-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Certifications</h3>
                            {certifications.length > 0 ? (
                                <div className="bg-white rounded-lg shadow">
                                    <div className="divide-y divide-gray-200">
                                        {certifications.map(cert => (
                                            <div key={cert.id} className="p-4 flex items-center">
                                                <img src={cert.icon} alt={cert.name} className="w-12 h-12 rounded-lg mr-4" />
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-900">{cert.name}</h4>
                                                    <div className="flex items-center mt-1">
                                                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mr-2">
                                                            {cert.status}
                                                        </span>
                                                        <span className="text-xs text-gray-500">Achieved on {new Date(cert.date).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                                <Link to={`/certification/${cert.id}`} className="text-indigo-600 hover:text-indigo-700">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-4 border-t border-gray-200">
                                        <Link to="/certifications" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
                                            <span>View all certifications</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-lg shadow p-6 text-center">
                                    <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <h4 className="text-lg font-medium text-gray-900 mb-2">No certifications yet</h4>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Get certified as an educational content creator to boost your credibility
                                    </p>
                                    <Link to="/certifications" className="inline-block py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors">
                                        Explore Certifications
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-1 mt-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h3>
                            {upcomingEvents.length > 0 ? (
                                <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
                                    {upcomingEvents.map(event => (
                                        <div key={event.id} className="p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="inline-block px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                                                    {event.type}
                                                </span>
                                                <span className="text-xs text-gray-500">{event.date}</span>
                                            </div>
                                            <h4 className="font-medium text-gray-900 mb-1">{event.title}</h4>
                                            <p className="text-sm text-gray-600">{event.time}</p>
                                        </div>
                                    ))}
                                    <div className="p-4">
                                        <Link to="/events" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center">
                                            <span>View all events</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-lg shadow p-6 text-center">
                                    <p className="text-gray-600">No upcoming events</p>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 'courses':
                return (
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Your Educational Content</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courseData.map(course => (
                                <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:shadow-xl hover:-translate-y-1">
                                    <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
                                    <div className="p-6">
                                        <h4 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h4>
                                        <div className="flex items-center text-sm text-gray-600 mb-4">
                                            <span className="mr-3">{course.lessons} lessons</span>
                                            <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">{course.level}</span>
                                        </div>
                                        <div className="mb-4">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-gray-600">Progress</span>
                                                <span className="font-semibold text-indigo-600">{course.progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                                            </div>
                                        </div>
                                        <Link to={`/course/${course.id}`} className="block w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-center rounded-md text-white font-medium transition-colors">
                                            {course.completed ? 'Review Content' : 'Continue Editing'}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'profile':
                return (
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Account Information</h3>
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                                <dl className="sm:divide-y sm:divide-gray-200">
                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Full name</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {userAttributes.name || 'Not provided'}
                                        </dd>
                                    </div>
                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {userAttributes.email || 'Not provided'}
                                        </dd>
                                    </div>
                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                        <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            {userAttributes.phone_number || 'Not provided'}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        <div className="mt-6 flex space-x-4">
                            <Link
                                to="/change-password"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Change Password
                            </Link>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => alert('Edit profile feature coming soon!')}
                            >
                                Edit Profile
                            </Button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin h-12 w-12 rounded-full border-t-4 border-indigo-600 border-solid"></div>
            </div>
        );
    }

    return (
        <MainLayout>
            <div className="bg-gray-50 min-h-screen pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
                        <p className="mt-1 text-gray-600">Welcome back, {userAttributes.name || 'User'}!</p>
                    </div>                        <div className="bg-white rounded-lg shadow mb-6">
                        <div className="border-b border-gray-200">
                            <nav className="flex overflow-x-auto">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className={`whitespace-nowrap py-3 px-5 border-b-2 font-medium text-sm ${activeTab === 'overview'
                                        ? 'border-indigo-600 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    Overview
                                </button>
                                <button
                                    onClick={() => setActiveTab('courses')}
                                    className={`whitespace-nowrap py-3 px-5 border-b-2 font-medium text-sm ${activeTab === 'courses'
                                        ? 'border-indigo-600 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    My Content
                                </button>
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`whitespace-nowrap py-3 px-5 border-b-2 font-medium text-sm ${activeTab === 'profile'
                                        ? 'border-indigo-600 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    Profile
                                </button>
                            </nav>
                        </div>
                        <div className="p-6">
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Dashboard;
