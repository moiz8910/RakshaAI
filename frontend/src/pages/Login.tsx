import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const loginSchema = z.object({
  employee_id: z.string().min(1, 'Employee ID is required'),
  password: z.string().min(1, 'Password is required'),
  role: z.string().min(1, 'Role is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const ROLES = [
  'Claims Assessor',
  'RCU Investigator',
  'Underwriter',
  'CRO / Admin',
];

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      role: 'Claims Assessor',
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const response = await api.post('/api/auth/login', data);
      login(response.data.access_token, {
        user_name: response.data.user_name,
        role: response.data.role,
        permissions: response.data.permissions,
      });
      navigate('/dashboard');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-[420px] shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl text-navy font-bold tracking-wide mb-2">
            RakshaAI
          </h1>
          <p className="text-sm font-medium text-navy/70 tracking-widest">
            LIFE INSURANCE FRAUD INTELLIGENCE
          </p>
        </div>

        {errorMsg && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-4 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Employee ID */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-navy/90">Employee ID</label>
            <input
              {...register('employee_id')}
              className="w-full px-3 py-2 border border-gray-200 rounded-md outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm"
              placeholder="EMP-10234"
            />
            {errors.employee_id && (
              <p className="text-destructive text-xs">{errors.employee_id.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-navy/90">Password</label>
            </div>
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                className="w-full px-3 py-2 border border-gray-200 rounded-md outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all text-sm pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-destructive text-xs">{errors.password.message}</p>
            )}
            
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-accent focus:ring-accent accent-accent w-4 h-4" />
                <span className="text-xs text-gray-500">Remember Me</span>
              </label>
            </div>
          </div>

          {/* Roles */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-navy/90">Role</label>
            <div className="grid grid-cols-2 gap-2">
              {ROLES.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setValue('role', role)}
                  className={`px-2 py-2 text-xs rounded-md border transition-all ${
                    selectedRole === role
                      ? 'bg-blue-50 border-navy text-navy font-semibold shadow-sm'
                      : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
            {errors.role && (
              <p className="text-destructive text-xs">{errors.role.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-navy hover:bg-navy-light text-white font-medium py-2.5 rounded-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isLoading && <Loader2 size={16} className="animate-spin" />}
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
            <span>Secured</span>
            <span>·</span>
            <span>MFA required on first login</span>
          </p>
        </div>
      </div>
    </div>
  );
}
