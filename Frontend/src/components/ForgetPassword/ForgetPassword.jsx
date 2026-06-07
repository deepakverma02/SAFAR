import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgetPassword() {
    const navigate = useNavigate();

    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [isOtpVerified, setIsOtpVerified] = useState(false);

    const handleGenerateOtp = async () => {
        try {
            const response = await axios.post('https://safar-bus-booking-system.onrender.com/verifyMobile', { mobNum: mobileNumber, email: email });
            
            if (response.data.success) {
                const otp = Math.floor(1000 + Math.random() * 9000); // Generate 4-digit OTP
                setGeneratedOtp(otp);
                const subject = "Verification OTP";
               
                const text = `Dear User,

Your One-Time Password (OTP) for resetting your password is: ${otp}

Please use this OTP to verify your identity and proceed with resetting your password. This OTP is valid for 10 minutes. 

If you did not request this, please ignore this email.

Thank you,
Safar Support Team`; // Use the generated OTP here
                
                await axios.post('https://safar-bus-booking-system.onrender.com/sendGmail', {
                    text: text,
                    gmail: email,
                    Subject: subject
                });
                setIsOtpVerified(false); // Reset OTP verification status
                alert("OTP has been sent to your email.");
            } else {
                alert("Mobile number or email not found");
            }
        } catch (error) {
            console.error("Error verifying details", error);
            alert("Failed to verify details");
        }
    };

    const handleVerifyOtp = () => {
        if (parseInt(otp) === generatedOtp) {
            setIsOtpVerified(true);
            alert("OTP verified, you can now set a new password");
        } else {
            alert("Incorrect OTP, please try again");
        }
    };

    const handleResetPassword = async () => {
        try {
            const response = await axios.post('https://safar-bus-booking-system.onrender.com/resetPassword', {
                mobNum: mobileNumber,
                email: email,
                newPassword: newPassword
            });
            
            if (response.data.success) {
                alert("Password reset successful");
                navigate('/loginandReg'); // Redirect to login page
            } else {
                alert("Failed to reset password");
            }
        } catch (error) {
            console.error("Error resetting password", error);
            alert("Failed to reset password");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 backdrop-blur-sm z-50">
            <div className="relative w-full max-w-md p-8 bg-gray-100 rounded-lg border border-gray-300 shadow-lg transform transition-transform duration-500 ease-in-out hover:scale-105">
                <button
                    onClick={() => navigate('/loginandReg')}
                    className="absolute top-4 left-4 text-blue-800 text-2xl font-bold hover:text-blue-600 transition-colors"
                >
                    &larr;
                </button>

                <div className="mt-12">
                    {!generatedOtp ? (
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleGenerateOtp(); }}>
                            <h2 className="text-3xl font-extrabold text-center mb-4 text-blue-800">Forgot Password</h2>

                            <input
                                type="email"
                                placeholder="Enter Email ID"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Enter Mobile Number"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                            
                            <button type="submit" className="w-full py-3 text-lg font-semibold text-white bg-blue-800 rounded-lg shadow-md hover:bg-blue-900 transition-colors">Generate OTP</button>
                        </form>
                    ) : (
                        <>
                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(); }}>
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                />
                                <button type="submit" className="w-full py-3 text-lg font-semibold text-white bg-blue-800 rounded-lg shadow-md hover:bg-blue-900 transition-colors">
                                    {isOtpVerified ? "Verified Successfully" : "Verify OTP"}
                                </button>
                            </form>
                            {isOtpVerified && (
                                <form className="space-y-6 mt-4" onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }}>
                                    <input
                                        type="password"
                                        placeholder="Enter New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        required
                                        minLength={8}
                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                        title="Password must be at least 8 characters long and contain at least one number, one uppercase letter, and one lowercase letter."
                                    />
                                    <button type="submit" className="w-full py-3 text-lg font-semibold text-white bg-blue-800 rounded-lg shadow-md hover:bg-blue-900 transition-colors">Reset Password</button>
                                </form>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ForgetPassword;
