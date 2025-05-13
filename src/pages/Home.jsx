import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { useState, useEffect } from 'react';

const Home = () => {
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const testimonials = [
        {
            quote: "AWS Education Platform has transformed my career. I went from knowing nothing about cloud computing to passing three AWS certifications in 6 months.",
            name: "Sarah Johnson",
            position: "Cloud Solutions Architect",
            company: "TechInnovate Inc",
            image: "https://randomuser.me/api/portraits/women/32.jpg"
        },
        {
            quote: "The hands-on labs made all the difference in my learning journey. Being able to practice in real AWS environments helped me truly understand the concepts.",
            name: "David Chen",
            position: "DevOps Engineer",
            company: "CloudScale Systems",
            image: "https://randomuser.me/api/portraits/men/46.jpg"
        },
        {
            quote: "As a university student, this platform gave me the skills I needed to stand out in the job market. I landed a cloud internship within weeks of completing my first certification path.",
            name: "Maya Patel",
            position: "Junior Cloud Engineer",
            company: "DataFlow Networks",
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
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-80 -right-20 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-24 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <div className="container mx-auto px-4 py-14 md:py-16 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="max-w-2xl">
                            <div className="inline-block px-3 py-1 rounded-full bg-blue-600/30 text-blue-300 text-sm font-medium mb-4">
                                #1 AWS Education Platform
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-5">
                                <span className="block">Master AWS Cloud</span>
                                <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">Transform Your Career</span>
                            </h1>
                            <p className="text-base md:text-lg text-gray-300 mb-6">
                                Join our AWS education platform and gain hands-on experience with real-world projects. Learn from industry experts and accelerate your cloud journey.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    to="/register"
                                    className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-base shadow-sm hover:bg-blue-700 transition-all duration-200 hover:-translate-y-1"
                                >
                                    Start Learning Today
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
                                            className="w-8 h-8 rounded-full border border-blue-500"
                                        />
                                    ))}
                                </div>
                                <div className="ml-3">
                                    <span className="text-blue-400 font-bold">10,000+</span>
                                    <span className="ml-1 text-gray-300">students enrolled</span>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:block relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-700/20 rounded-xl transform rotate-2"></div>
                            <div className="relative bg-gray-800 border border-gray-700 shadow-xl rounded-xl overflow-hidden p-1">
                                <div className="bg-gray-900 rounded-lg p-3">
                                    <div className="flex space-x-1.5 mb-3">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                    </div>
                                    <img
                                        src="https://via.placeholder.com/600x400/0ea5e9/ffffff?text=AWS+Education+Platform"
                                        alt="AWS Platform Dashboard"
                                        className="rounded shadow-md w-full"
                                    />
                                    <div className="mt-4 space-y-2">
                                        <div className="h-6 bg-gray-700 rounded-md w-3/4"></div>
                                        <div className="h-16 bg-gray-700 rounded-md"></div>
                                        <div className="flex space-x-2">
                                            <div className="h-8 bg-blue-600 rounded-md w-1/3"></div>
                                            <div className="h-8 bg-gray-700 rounded-md w-1/3"></div>
                                            <div className="h-8 bg-gray-700 rounded-md w-1/3"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-4 -right-4 bg-blue-600 rounded-lg shadow-lg p-2 text-white transform rotate-3">
                                <div className="flex items-center space-x-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-xs font-medium">3 AWS Certifications</span>
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
                            Why Choose Our Platform?
                        </h2>
                        <p className="text-lg text-gray-600">
                            Everything you need to master AWS cloud computing, from beginner to advanced levels.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature Card 1 */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
                            <div className="p-6">
                                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Comprehensive Courses</h3>
                                <p className="text-gray-600 mb-6">
                                    Access a wide range of courses covering everything from AWS basics to advanced services like Lambda, EKS, and more.
                                </p>
                                <Link to="#" className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center">
                                    Explore Courses
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Feature Card 2 */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
                            <div className="p-6">
                                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Hands-on Labs</h3>
                                <p className="text-gray-600 mb-6">
                                    Practice in real AWS environments with guided lab exercises that reinforce theoretical knowledge with practical experience.
                                </p>
                                <Link to="#" className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center">
                                    Try a Lab
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Feature Card 3 */}
                        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
                            <div className="p-6">
                                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Certification Prep</h3>
                                <p className="text-gray-600 mb-6">
                                    Structured learning paths to help you prepare for and pass AWS certification exams on your first attempt.
                                </p>
                                <Link to="#" className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center">
                                    View Certifications
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
                            What Our Students Say
                        </h2>
                        <p className="text-lg text-gray-600">
                            Join thousands of students who have transformed their careers with our platform.
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
                                                            className="w-12 h-12 rounded-full mr-3 border border-blue-500"
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
                                            className={`w-2 h-2 rounded-full mx-1 ${activeTestimonial === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                                        ></button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-12 md:py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your AWS Journey?</h2>
                    <p className="text-lg text-blue-100 mb-6 max-w-xl mx-auto">
                        Join thousands of students building cloud skills and advancing their careers.
                    </p>
                    <Link
                        to="/register"
                        className="inline-block px-6 py-3 text-lg font-medium bg-white text-blue-700 rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-200 hover:-translate-y-1"
                    >
                        Start Free Trial
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
};

export default Home;
