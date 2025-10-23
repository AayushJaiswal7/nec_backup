import { useState } from 'react';
import LoginImage from '../../assets/login/nec_login.jpg';
import InputField from '../../components/InputField';
import PasswordField from '../../components/PasswordField';
import ButtonComponent from '../../components/ButtonComponent';
import Logo from '../../assets/logo/NEC.png';
import { FaArrowRight } from "react-icons/fa6";

function Login() {
    const [formData, setFormData] = useState({
        userId: '',
        password: '',
    });

    const [formValidationError, setFormValidationError] = useState({
        userId: false,
        password: false,
    });

    const handleFormChange = (fieldName, value) => {
        setFormData(prev => ({ ...prev, [fieldName]: value }));
        validateField(fieldName, value);
    };

    const validateField = (fieldName, value) => {
        const isValid = value.trim() !== '';
        setFormValidationError(prev => ({ ...prev, [fieldName]: !isValid }));
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fieldsToValidate = ['userId', 'password'];
        let allValid = true;
        const newErrors = { ...formValidationError };

        fieldsToValidate.forEach(field => {
            const isValid = formData[field].trim() !== '';
            newErrors[field] = !isValid;
            if (!isValid) allValid = false;
        });

        setFormValidationError(newErrors);
        if (!allValid) return;

        console.log(formData);
        

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Save JWT token
                localStorage.setItem('token', data.token);

                // Optionally save user info
                localStorage.setItem('user', JSON.stringify(data.user));

                // Redirect to dashboard or protected route
                window.location.href = '/dashboard';
            } else {
                alert(data.message || 'Invalid credentials');
            }

        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again.');
        }
    };



    return (
        <div className='flex h-screen bg-primaryBackground'>
            <div className='flex flex-col w-[65%] hidden lg:flex'>
                <img
                    src={LoginImage}
                    alt="Home"
                    className="h-full w-full object-fill rounded-lg pr-4"
                />
            </div>

            <div className='flex flex-col lg:w-[35%] w-full justify-center items-center p-6 space-y-12'>
                <div className='flex flex-row bg-black text-white rounded-lg p-2'>
                    <div className='h-14'>
                        <img
                            alt="Logo"
                            className="h-[95%] w-[95%] object-fill rounded-lg"
                            src={Logo}
                        />
                    </div>
                    <div className='flex flex-col items-center justify-center text-sm font-bold'>
                        <span>SMCC Construction</span>
                        <span>India Private Limited</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center space-y-8 w-[60%]'>
                    <InputField
                        label="User ID"
                        placeholder="Enter User ID"
                        name="userId"
                        value={formData.userId}
                        onChange={(e) => handleFormChange('userId', e.target.value)}
                        error={formValidationError.userId ? "User ID is required" : ""}
                    />
                    <PasswordField
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={(e) => handleFormChange('password', e.target.value)}
                        error={formValidationError.password ? "Password is required" : ""}
                    />
                    <div className='flex w-full items-start'>
                        <p className='text-blue-500 text-sm cursor-pointer underline pb-2'>
                            Forgot Password ?
                        </p>
                    </div>
                    <ButtonComponent
                        title="Login"
                        iconPosition={1}
                        icon={FaArrowRight}
                        width="w-28"
                        type="submit"
                    />
                </form>
            </div>
        </div>
    );
}

export default Login;
