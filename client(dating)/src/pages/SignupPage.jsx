import React, { useState } from 'react';
import InputField from '../components/common/InputField';

const SignupPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result); // base64 image data
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl">
                <h2 className="text-2xl font-semibold text-center mb-6">Create your account</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="First name" name="firstName" placeholder="Enter your first name" />
                    <InputField label="Last name" name="lastName" placeholder="Enter your last name" />
                </div>

                <div className="mt-4">
                    <InputField label="Email" type="email" name="email" placeholder="you@example.com" />
                </div>

                <div className="mt-4">
                    <InputField label="Password" type="password" name="password" placeholder="Enter a secure password" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <InputField label="Date of birth" type="date" name="dob" />

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-600">Gender</label>
                        <select className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="mt-4">
                    <InputField label="City" name="city" placeholder="Enter your city" />
                </div>

                {/* Upload and Preview */}
                <label htmlFor="file" className="mt-6 border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center cursor-pointer">
                    {selectedImage ? (
                        <img src={selectedImage} alt="Preview" className="w-24 h-24 object-cover rounded-full mb-2" />
                    ) : (
                        <>
                            <div className="text-gray-400 text-3xl mb-2">⬆️</div>
                            <p className="text-sm text-gray-600 font-medium mb-1">Upload profile picture</p>
                            <p className="text-xs text-gray-400 mb-3">PNG, JPG, GIF up to 10MB.</p>
                        </>
                    )}
                </label>
                <input
                    type="file"
                    name="file"
                    id="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                />

                <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
                    Sign up
                </button>

                <p className="text-xs text-center text-gray-400 mt-3">
                    By clicking Sign up, you agree to our <span className="text-blue-500">Terms of Service</span> and <span className="text-blue-500">Privacy Policy</span>.
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
