'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {  z } from 'zod';
import { useState } from 'react';
import { PostUser } from '@/app/api/Users';

import { useModalStore } from '@/store/useAuthmodal';
// Zod schema
const SignInSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignInFormData = z.infer<typeof SignInSchema>;

const SignInModal = () => {
  const {    closeSignup , isSignupOpen , openLogin  } = useModalStore()
   
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
  });

  

  const onSubmit = async (data: SignInFormData) => {
       setLoading(true)
    try {
         const response =  await   PostUser(data)
         console.log(response)
           closeSignup();
           openLogin();
    } catch (error) {
       
          console.log(error)  
  
    }
    finally{
       setLoading(false);
    }
  };

  if (!isSignupOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Sign In</h2>

        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            {...register('username')}
            className="w-full border rounded px-3 py-2"
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full border rounded px-3 py-2"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register('password')}
            className="w-full border rounded px-3 py-2"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

         <button
          type='button'
          onClick={closeSignup}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          close 
        </button>
      </form>
    </div>
  );
};

export default SignInModal;
