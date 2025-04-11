import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signInSchema } from "../../utils/schema";
import { setToken } from "../../utils/auth";
import apple from "../../assets/apple.svg";
import facebook from "../../assets/facebook.svg";
import google from "../../assets/google.svg";
import mdi_eye_outline from "../../assets/mdi_eye_outline.png";
import Closedeyeicon from '../../assets/Closedeyeicon.svg';
import { notify } from "../../utils/utils";

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const navigate = useNavigate();

    const STATIC_CREDENTIALS = {
        email: "admin@example.com",
        password: "admin123",
    };

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberPassword: false,
        },
        validationSchema: signInSchema,
        onSubmit: (values) => {
            const { email, password } = values;
            if (
                email === STATIC_CREDENTIALS.email &&
                password === STATIC_CREDENTIALS.password
            ) {
                setToken("dummy-static-token");
                notify("Login successful! Redirecting to dashboard...", "success");
                setLoginSuccess(true);
            } else {
                notify("Invalid email or password", "error");
            }
        },
    });

    useEffect(() => {
        if (loginSuccess) {
            navigate("/dashboard");
        }
    }, [loginSuccess]);

    return (
        <div className="max-w-md mx-auto p-6 bg-[#1f1f1f] shadow-lg rounded-lg text-white">
            <h2 className="text-sm text-gray-400 mb-2">WELCOME BACK!</h2>
            <h3 className="text-2xl font-bold mb-6">Log In to Your Account</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div>
                    <label className="text-gray-300 font-medium mb-1 block">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className="w-full p-3 rounded-md bg-[#2a2a2a] border border-gray-600 text-white placeholder-gray-400 focus:ring-0 focus:outline-none"
                    />
                    {errors.email && touched.email && (
                        <div className="text-red-400 text-sm mt-1">{errors.email}</div>
                    )}
                </div>

                {/* Password Field */}
                <div>
                    <label className="text-gray-300 font-medium mb-1 block">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            className="w-full p-3 rounded-md bg-[#2a2a2a] border border-gray-600 text-white placeholder-gray-400 focus:ring-0 focus:outline-none"
                        />
                        <img
                            src={showPassword ? mdi_eye_outline : Closedeyeicon}
                            alt="toggle"
                            className="w-5 h-5 absolute right-3 top-3 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>
                    {errors.password && touched.password && (
                        <div className="text-red-400 text-sm mt-1">{errors.password}</div>
                    )}
                </div>

                {/* Remember Me */}
                <div className="flex justify-between items-center">
                    <label className="flex items-center space-x-2 text-gray-300">
                        <input
                            type="checkbox"
                            name="rememberPassword"
                            className="w-4 h-4 cursor-pointer"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            checked={values.rememberPassword}
                        />
                        <span>Remember me</span>
                    </label>
                </div>

                {/* Log In Button */}
                <button
                    type="submit"
                    className="w-full bg-red-600 text-white font-semibold p-3 rounded-md hover:bg-red-700 transition"
                >
                    Log In
                </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
                <hr className="border-gray-600" />
                <span className="absolute inset-x-0 top-[-12px] bg-[#1f1f1f] px-3 text-gray-400 text-sm mx-auto w-fit font-bold">
                    Or
                </span>
            </div>

            {/* Social Logins */}
            <div className="space-y-3">
                <button className="w-full border border-gray-600 p-3 flex items-center justify-center rounded-md hover:bg-[#2a2a2a] transition text-gray-300">
                    <img src={google} alt="Google" className="w-5 mr-3" />
                    Log In with Google
                </button>
                <button className="w-full border border-gray-600 p-3 flex items-center justify-center rounded-md hover:bg-[#2a2a2a] transition text-gray-300">
                    <img src={facebook} alt="Facebook" className="w-5 mr-3" />
                    Log In with Facebook
                </button>
                <button className="w-full border border-gray-600 p-3 flex items-center justify-center rounded-md hover:bg-[#2a2a2a] transition text-gray-300">
                    <img src={apple} alt="Apple" className="w-5 mr-3" />
                    Log In with Apple
                </button>
            </div>
        </div>
    );
};

export default SignIn;
