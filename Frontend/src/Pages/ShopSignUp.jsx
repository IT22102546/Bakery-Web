import React, { useState } from "react";
import { Label, TextInput, Button, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShopSignUp() {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !formData.username ||
            !formData.email ||
            !formData.password ||
            !formData.mobile ||
            !formData.address 
         
        ) {
            return toast.error("Please fill all fields");
        }

        try {
            setLoading(true);

            const res = await fetch("/api/shopreq/shoprequest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            setLoading(false);

            if (data.success === false) {
                toast.error(data.message);
                return;
            }

            toast.success("Request sent successfully! We will update you soon.");
            setTimeout(() => {
                navigate("/");
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            setLoading(false);
            toast.error(`Error: ${error.message}`);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{
                backgroundImage: ``,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="p-6 max-w-lg w-full bg-white bg-opacity-80 rounded-lg shadow-lg">
                <p className="text-center text-2xl font-cinzel font-semibold">Shop Sign Up</p>
                <form className="flex flex-col gap-4 mt-5" onSubmit={handleSubmit}>
                    <div>
                        <Label value="Shop Name" />
                        <TextInput type="text" placeholder="Username" id="username" onChange={handleChange} />
                    </div>
                    <div>
                        <Label value="Shop email" />
                        <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange} />
                    </div>
                    <div>
                        <Label value="Shop address" />
                        <TextInput type="text" placeholder="Address" id="address" onChange={handleChange} />
                    </div>
                    <div>
                        <Label value="Contact number" />
                        <TextInput type="text" placeholder="Mobile Number" id="mobile" onChange={handleChange} />
                    </div>
                    
                    <div>
                        <Label value="Password" />
                        <div className="relative">
                            <TextInput
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                id="password"
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute top-2 right-3 focus:outline-none"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    <Button disabled={loading} type="submit" className="bg-[#18A5A7]">
                        {loading ? (
                            <>
                                <Spinner size="sm" />
                                <span className="pl-3">Loading</span>
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </Button>
                </form>
                
            </div>
            <ToastContainer />
        </div>
    );
}
