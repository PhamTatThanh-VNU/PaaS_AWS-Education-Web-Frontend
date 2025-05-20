import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { useState, useEffect } from 'react';

const Home = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const testimonials = [
        {
            quote: "EduConnect has completely transformed my teaching approach. I've been able to reach thousands of students worldwide with my programming courses.",
            name: "Sarah Johnson",
            position: "Programming Instructor",
            company: "Tech Academy",
            image: "https://randomuser.me/api/portraits/women/32.jpg"
        },
        {
            quote: "The platform makes it so easy to create and share educational content. The analytics tools help me understand what my students need most.",
            name: "David Chen",
            position: "Mathematics Teacher",
            company: "Learning Hub",
            image: "https://randomuser.me/api/portraits/men/46.jpg"
        },
        {
            quote: "As a student, I've found amazing courses here that weren't available anywhere else. The interactive lessons and community support are outstanding.",
            name: "Maya Patel",
            position: "Computer Science Student",
            company: "State University",
            image: "https://randomuser.me/api/portraits/women/65.jpg"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <MainLayout>
            {/* Hero Section with animated background */}
            <div className="relative bg-gray-900 text-white overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-80 -right-20 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-24 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <div className="container mx-auto px-4 py-14 md:py-16 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="max-w-2xl">
                            <div className="inline-block px-3 py-1 rounded-full bg-indigo-600/30 text-indigo-300 text-sm font-medium mb-4">
                                #1 Education Platform for Creators
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5">
                                <span className="block">Share Your Knowledge</span>
                                <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-transparent bg-clip-text">Empower Learners Worldwide</span>
                            </h1>
                            <p className="text-base md:text-lg text-gray-300 mb-6">
                                Create and share educational content on our platform. Build your audience, track your impact, and transform the way people learn online.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    to="/register"
                                    className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium text-base shadow-sm hover:bg-indigo-700 transition-all duration-200 hover:-translate-y-1"
                                >
                                    Join as Creator
                                </Link>
                                <Link
                                    to="/login"
                                    className="px-5 py-2.5 rounded-lg bg-white/10 text-white font-medium text-base border border-white/30 hover:bg-white/20 transition-all duration-200"
                                >
                                    Sign In
                                </Link>                                
                            </div>
                            <div className="mt-6 flex items-center">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <img
                                            key={i}
                                            src={`https://randomuser.me/api/portraits/men/${20 + i}.jpg`}
                                            alt="User"
                                            className="w-8 h-8 rounded-full border border-indigo-500"
                                        />
                                    ))}
                                </div>
                                <div className="ml-3">
                                    <span className="text-indigo-400 font-bold">50,000+</span>
                                    <span className="ml-1 text-gray-300">creators & learners</span>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:block relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-indigo-700/20 rounded-xl transform rotate-2"></div>
                            <div className="relative bg-gray-800 border border-gray-700 shadow-xl rounded-xl overflow-hidden p-1">
                                <div className="bg-gray-900 rounded-lg p-3">
                                    <div className="flex space-x-1.5 mb-3">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                    </div>
                                    <img
                                        src="https://via.placeholder.com/600x400/5a67d8/ffffff?text=Course+Dashboard"
                                        alt="Course Creator Dashboard"
                                        className="rounded shadow-md w-full"
                                    />
                                    <div className="mt-4 space-y-2">
                                        <div className="h-6 bg-gray-700 rounded-md w-3/4"></div>
                                        <div className="h-16 bg-gray-700 rounded-md"></div>
                                        <div className="flex space-x-2">
                                            <div className="h-8 bg-indigo-600 rounded-md w-1/3"></div>
                                            <div className="h-8 bg-gray-700 rounded-md w-1/3"></div>
                                            <div className="h-8 bg-gray-700 rounded-md w-1/3"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-4 -right-4 bg-indigo-600 rounded-lg shadow-lg p-2 text-white transform rotate-3">
                                <div className="flex items-center space-x-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-xs font-medium">Easy Content Creation</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave separator */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#ffffff">
                        <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,96C960,107,1056,117,1152,112C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </div>

            {/* Features Section with card grid */}
            <div className="bg-white py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                            Why Create on Our Platform?
                        </h2>
                        <p className="text-lg text-gray-600">
                            Everything you need to create, share, and monetize your educational content.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature Card 1 */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
                            <div className="p-6">
                                <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Content Creation</h3>
                                <p className="text-gray-600 mb-6">
                                    Create engaging video courses, series, and tutorials with our intuitive tools. No technical expertise required.
                                </p>
                                <Link to="/create-series" className="text-indigo-600 font-medium hover:text-indigo-700 inline-flex items-center">
                                    Create a Series
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Feature Card 2 */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
                            <div className="p-6">
                                <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Audience Analytics</h3>
                                <p className="text-gray-600 mb-6">
                                    Track engagement, completion rates, and feedback to understand what your audience loves and how to improve your content.
                                </p>
                                <Link to="/my-courses" className="text-indigo-600 font-medium hover:text-indigo-700 inline-flex items-center">
                                    Manage Your Content
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Feature Card 3 */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
                            <div className="p-6">
                                <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Monetization Options</h3>
                                <p className="text-gray-600 mb-6">
                                    Earn from your expertise with flexible monetization options including subscriptions, one-time purchases, and membership tiers.
                                </p>
                                <Link to="/explore" className="text-indigo-600 font-medium hover:text-indigo-700 inline-flex items-center">
                                    Explore Courses
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="bg-gray-50 py-14 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                            What Our Creators Say
                        </h2>
                        <p className="text-lg text-gray-600">
                            Join thousands of educators and content creators who are sharing knowledge on our platform.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative bg-white rounded-lg shadow-md p-6 md:p-8">
                            <div className="absolute top-0 left-0 transform -translate-x-3 -translate-y-3">
                                <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M32 0C14.327 0 0 14.327 0 32C0 49.673 14.327 64 32 64C49.673 64 64 49.673 64 32C64 14.327 49.673 0 32 0ZM20.513 40.938C16.456 40.938 13.166 37.647 13.166 33.591C13.166 26.245 19.184 20.226 26.53 20.226V24.953C21.843 24.953 17.894 28.903 17.894 33.591C17.894 34.967 18.983 36.211 20.513 36.211C22.043 36.211 23.287 35.121 23.287 33.591H28.014C28.014 37.647 24.57 40.938 20.513 40.938ZM41.987 40.938C37.93 40.938 34.64 37.647 34.64 33.591C34.64 26.245 40.658 20.226 48.004 20.226V24.953C43.317 24.953 39.367 28.903 39.367 33.591C39.367 34.967 40.457 36.211 41.987 36.211C43.517 36.211 44.76 35.121 44.76 33.591H49.488C49.488 37.647 46.044 40.938 41.987 40.938Z" fill="#EFF6FF" />
                                </svg>
                            </div>

                            <div className="relative">
                                <div className="overflow-hidden">
                                    <div className="transition-all duration-500 ease-in-out" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                                        <div className="flex">
                                            {testimonials.map((testimonial, index) => (
                                                <div key={index} className="min-w-full">
                                                    <p className="text-lg md:text-xl text-gray-700 italic mb-6">
                                                        "{testimonial.quote}"
                                                    </p>
                                                    <div className="flex items-center">
                                                        <img
                                                            src={testimonial.image}
                                                            alt={testimonial.name}
                                                            className="w-12 h-12 rounded-full mr-3 border border-indigo-500"
                                                        />
                                                        <div>
                                                            <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                                            <p className="text-sm text-gray-600">{testimonial.position}, {testimonial.company}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center mt-6">
                                    {testimonials.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveTestimonial(index)}
                                            className={`w-2 h-2 rounded-full mx-1 ${activeTestimonial === index ? 'bg-indigo-600' : 'bg-gray-300'}`}
                                        ></button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Courses Section */}
            <div className="bg-white py-14 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            Discover Popular Courses
                        </h2>
                        <p className="text-lg text-gray-600">
                            Explore our highly-rated educational series from top creators across various topics
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                        {/* Featured Course 1 */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="relative">
                                <img 
                                    src="https://img-c.udemycdn.com/course/750x422/2381802_d805_10.jpg" 
                                    alt="AWS Course" 
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                                    24 lessons
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center mb-3">
                                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold mr-2">
                                        A
                                    </div>
                                    <span className="text-sm text-gray-600">AWS Expert</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                    AWS from Basics to Advanced
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    Learn AWS services and implement real applications with CloudFormation
                                </p>
                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-gray-500">
                                        <span>Cloud Computing</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="flex items-center text-amber-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="ml-1 font-semibold">4.8</span>
                                        </div>
                                        <div className="text-gray-500 text-sm">
                                            1,520 students
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Featured Course 2 */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="relative">
                                <img 
                                    src="https://img-c.udemycdn.com/course/750x422/1646980_23f7_2.jpg" 
                                    alt="MERN Stack" 
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                                    36 lessons
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center mb-3">
                                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold mr-2">
                                        T
                                    </div>
                                    <span className="text-sm text-gray-600">Web Developer</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                    Fullstack JavaScript with MERN Stack
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    Build complete web applications with MongoDB, Express, React, and Node.js
                                </p>
                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-gray-500">
                                        <span>Web Development</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="flex items-center text-amber-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="ml-1 font-semibold">4.9</span>
                                        </div>
                                        <div className="text-gray-500 text-sm">
                                            2,450 students
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Featured Course 3 */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className="relative">
                                <img 
                                    src="https://img-c.udemycdn.com/course/750x422/903744_8eb2.jpg" 
                                    alt="Python ML" 
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                                    42 lessons
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex items-center mb-3">
                                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold mr-2">
                                        L
                                    </div>
                                    <span className="text-sm text-gray-600">Data Scientist</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                    Python for Data Science and ML
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    Learn Python libraries like NumPy, Pandas, and Scikit-Learn for data analysis and ML
                                </p>
                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-gray-500">
                                        <span>AI & ML</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="flex items-center text-amber-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="ml-1 font-semibold">4.8</span>
                                        </div>
                                        <div className="text-gray-500 text-sm">
                                            3,720 students
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <Link 
                            to="/explore" 
                            className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            Explore All Courses
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 text-white py-12 md:py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Share Your Knowledge?</h2>
                    <p className="text-lg text-indigo-100 mb-6 max-w-xl mx-auto">
                        Join thousands of educators creating impact and generating income through online courses.
                    </p>
                    <Link
                        to="/register"
                        className="inline-block px-6 py-3 text-lg font-medium bg-white text-indigo-700 rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200 hover:-translate-y-1"
                    >
                        Become a Creator
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
};

export default Home;
