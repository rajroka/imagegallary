'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useModalStore } from '@/store/useAuthmodal';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { login  } from '@/redux/slice/authSlice';


// Zod schema for login form
const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof LoginSchema>;

const LoginModal = () => {
  const { isLoginOpen, closeLogin } = useModalStore();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      // Replace with your actual login API call
      console.log('Login data:', data);
dispatch(login(data))
      // Simulate successful login
      // After login success, close modal
      closeLogin();
    
    } catch (error) {
      console.error('Login error:', error);
      // You can handle error display here
    } finally {
      setLoading(false);
    }
  };

  if (!isLoginOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Log In</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full border rounded px-3 py-2"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            {...register('password')}
            className="w-full border rounded px-3 py-2"
            placeholder="Your password"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>



        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Logging In...' : 'Log In'}
        </button>

        <button
          type="button"
          onClick={closeLogin}
          className="w-full bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 mt-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default LoginModal;

