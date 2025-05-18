import { createContext, useContext, useState, useEffect } from 'react';
import {
    signIn as amplifySignIn, signUp as amplifySignUp, confirmSignUp as amplifyConfirmSignUp,
    signOut as amplifySignOut, resetPassword, confirmResetPassword,
    updatePassword, getCurrentUser, fetchUserAttributes
} from 'aws-amplify/auth';
// import { saveUserToDocumentDB, getUserFromDocumentDB } from '../utils/mongodbService';

// Create Authentication Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if user is already authenticated
    useEffect(() => {
        const checkAuthState = async () => {
            try {
                const userData = await getCurrentUser();
                const attributes = await fetchUserAttributes();
                setUser({ ...userData, attributes });
            } catch (err) {
                // User is not authenticated, which is fine
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuthState();
    }, []);

    // Sign in function
    const signIn = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const { isSignedIn, nextStep } = await amplifySignIn({ username: email, password });

            if (isSignedIn) {
                const userData = await getCurrentUser();
                const attributes = await fetchUserAttributes();

                // Thiết lập thông tin người dùng chỉ từ Cognito, không cần DocumentDB
                setUser({
                    ...userData,
                    attributes,
                    // Có thể thêm các trường mặc định ở đây nếu cần
                    profileData: {
                        email: attributes.email,
                        fullName: attributes.name || '',
                        birthdate: attributes.birthdate || '',
                        gender: attributes.gender || '',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        profileCompleted: false
                    }
                });
            }

            return { isSignedIn, nextStep };
        } catch (err) {
            setError(err.message || 'Failed to sign in');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Sign up function
    const signUp = async (email, password, attributes = {}) => {
        setLoading(true);
        setError(null);
        try {
            // Format the birthdate as required by Cognito (ISO format)
            let userAttributes = { ...attributes, email };

            // Handle the cognito required attributes
            if (attributes.birthdate) {
                userAttributes['birthdate'] = attributes.birthdate;
            }

            if (attributes.gender) {
                userAttributes['gender'] = attributes.gender;
            }

            // Store password temporarily in session storage for automatic login after confirmation
            sessionStorage.setItem(`temp_password_${email}`, password);

            const result = await amplifySignUp({
                username: email,
                password,
                options: {
                    userAttributes
                }
            });
            return result;
        } catch (err) {
            setError(err.message || 'Failed to sign up');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Confirm sign up function
    const confirmSignUp = async (email, code) => {
        setLoading(true);
        setError(null);
        try {
            const result = await amplifyConfirmSignUp({
                username: email,
                confirmationCode: code
            });

            // We only confirm the account, not automatically sign in
            // Clean up the temporary password
            sessionStorage.removeItem(`temp_password_${email}`);

            return result;
        } catch (err) {
            setError(err.message || 'Failed to confirm sign up');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Sign out function
    const signOut = async () => {
        setLoading(true);
        setError(null);
        try {
            await amplifySignOut();
            setUser(null);
        } catch (err) {
            setError(err.message || 'Failed to sign out');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Reset password function (previously forgotPassword)
    const forgotPassword = async (email) => {
        setLoading(true);
        setError(null);
        try {
            return await resetPassword({ username: email });
        } catch (err) {
            setError(err.message || 'Failed to initiate password reset');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Complete password reset function (previously forgotPasswordSubmit)
    const forgotPasswordSubmit = async (email, code, newPassword) => {
        setLoading(true);
        setError(null);
        try {
            return await confirmResetPassword({
                username: email,
                confirmationCode: code,
                newPassword
            });
        } catch (err) {
            setError(err.message || 'Failed to reset password');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Change password function
    const changePassword = async (oldPassword, newPassword) => {
        setLoading(true);
        setError(null);
        try {
            return await updatePassword({
                oldPassword,
                newPassword
            });
        } catch (err) {
            setError(err.message || 'Failed to change password');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        loading,
        error,
        signIn,
        signUp,
        confirmSignUp,
        signOut,
        forgotPassword,
        forgotPasswordSubmit,
        changePassword,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
