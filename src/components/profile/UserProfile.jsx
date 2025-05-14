import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateUserInDynamoDB, getUserFromDynamoDB } from '../../utils/dynamodbService';
import Button from '../auth/Button';
import FormInput from '../auth/FormInput';

const UserProfile = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [profileData, setProfileData] = useState({
        fullName: '',
        email: '',
        birthdate: '',
        gender: '',
        phoneNumber: '',
        address: '',
        city: '',
        country: '',
        bio: '',
    });

    useEffect(() => {
        const loadUserData = async () => {
            if (user && user.attributes?.email) {
                try {
                    // Get data from DynamoDB using email as key
                    const dynamoDbData = await getUserFromDynamoDB(user.attributes.email);

                    if (dynamoDbData) {
                        setProfileData({
                            fullName: dynamoDbData.fullName || user.attributes?.name || '',
                            email: dynamoDbData.email || user.attributes?.email || '',
                            birthdate: dynamoDbData.birthdate || user.attributes?.birthdate || '',
                            gender: dynamoDbData.gender || user.attributes?.gender || '',
                            phoneNumber: dynamoDbData.phoneNumber || user.attributes?.phone_number || '',
                            address: dynamoDbData.address || '',
                            city: dynamoDbData.city || '',
                            country: dynamoDbData.country || '',
                            bio: dynamoDbData.bio || '',
                        });
                    } else {
                        // Fallback to Cognito attributes if DynamoDB data doesn't exist
                        setProfileData({
                            fullName: user.attributes?.name || '',
                            email: user.attributes?.email || '',
                            birthdate: user.attributes?.birthdate || '',
                            gender: user.attributes?.gender || '',
                            phoneNumber: user.attributes?.phone_number || '',
                            address: '',
                            city: '',
                            country: '',
                            bio: '',
                        });
                    }
                } catch (error) {
                    console.error('Error loading user data:', error);
                    setErrorMessage('Failed to load profile data. Please try again later.');
                }
            }
            setLoading(false);
        };

        loadUserData();
    }, [user]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProfileData({
            ...profileData,
            [id]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            if (user && user.attributes?.email) {
                // Update user in DynamoDB using email as key
                await updateUserInDynamoDB(user.attributes.email, {
                    fullName: profileData.fullName,
                    phoneNumber: profileData.phoneNumber,
                    address: profileData.address,
                    city: profileData.city,
                    country: profileData.country,
                    bio: profileData.bio,
                    profileCompleted: true,
                });

                setSuccessMessage('Profile updated successfully!');

                // Clear success message after 3 seconds
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setErrorMessage('Failed to update profile. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin h-8 w-8 border-4 border-indigo-600 rounded-full border-t-transparent"></div>
            </div>
        );
    }

    return (<div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Creator Profile</h2>

        {successMessage && (
            <div className="bg-green-50 text-green-800 p-4 rounded-md mb-4">
                {successMessage}
            </div>
        )}

        {errorMessage && (
            <div className="bg-red-50 text-red-800 p-4 rounded-md mb-4">
                {errorMessage}
            </div>
        )}

        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                    id="fullName"
                    label="Full Name"
                    type="text"
                    value={profileData.fullName}
                    onChange={handleChange}
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    }
                />

                <FormInput
                    id="email"
                    label="Email Address"
                    type="email"
                    value={profileData.email}
                    readOnly
                    disabled
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                    }
                />

                <FormInput
                    id="birthdate"
                    label="Birth Date"
                    type="date"
                    value={profileData.birthdate}
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                    }
                />

                <FormInput
                    id="gender"
                    label="Gender"
                    type="text"
                    value={profileData.gender === 'male' ? 'Male' : profileData.gender === 'female' ? 'Female' : profileData.gender}
                    disabled
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    }
                />

                <FormInput
                    id="phoneNumber"
                    label="Phone Number"
                    type="tel"
                    value={profileData.phoneNumber}
                    onChange={handleChange}
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                    }
                />

                <FormInput
                    id="address"
                    label="Address"
                    type="text"
                    value={profileData.address}
                    onChange={handleChange}
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                    }
                />

                <FormInput
                    id="city"
                    label="City"
                    type="text"
                    value={profileData.city}
                    onChange={handleChange}
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                    }
                />

                <FormInput
                    id="country"
                    label="Country"
                    type="text"
                    value={profileData.country}
                    onChange={handleChange}
                    icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 011 1v12a1 1 0 01-1 1H6a3 3 0 01-3-3V6zm3-2a1 1 0 00-1 1v10a1 1 0 001 1h9V4H6z" clipRule="evenodd" />
                        </svg>
                    }
                />
            </div>

            <div className="mt-6">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                </label>
                <textarea
                    id="bio"
                    rows="4"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300"
                    placeholder="Tell us about yourself..."
                    value={profileData.bio}
                    onChange={handleChange}
                ></textarea>
            </div>

            <div className="mt-8">
                <Button type="submit" isLoading={saving}>
                    Save Profile
                </Button>
            </div>
        </form>
    </div>
    );
};

export default UserProfile;
