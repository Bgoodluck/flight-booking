// // components/auth/LoginForm.js
// import React, { useState } from 'react';
// import { User, Lock, Mail, Eye, EyeOff, Building, Shield } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';

// const LoginForm = ({ userType, onToggleForm, onSwitchType, onForgotPassword, customLogin }) => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       // Use customLogin if provided (for redirect logic), otherwise use default login
//       if (customLogin) {
//         await customLogin(formData, userType);
//       } else {
//         await login(formData, userType);
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getUserTypeIcon = () => {
//     switch(userType) {
//       case 'admin': return <Shield className="w-5 h-5" />;
//       case 'partner': return <Building className="w-5 h-5" />;
//       default: return <User className="w-5 h-5" />;
//     }
//   };

//   const getUserTypeColor = () => {
//     switch(userType) {
//       case 'admin': return 'from-red-500 to-pink-600';
//       case 'partner': return 'from-blue-500 to-indigo-600';
//       default: return 'from-purple-500 to-indigo-600';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <div className={`mx-auto h-16 w-16 bg-gradient-to-r ${getUserTypeColor()} rounded-full flex items-center justify-center mb-4`}>
//             {getUserTypeIcon()}
//           </div>
//           <h2 className="text-3xl font-bold text-white mb-2">
//             {userType.charAt(0).toUpperCase() + userType.slice(1)} Login
//           </h2>
//           <p className="text-gray-300">Sign in to your account</p>
//         </div>

//         <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
//           {error && (
//             <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-200 mb-2">Email</label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={(e) => setFormData({...formData, email: e.target.value})}
//                   className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   required
//                   value={formData.password}
//                   onChange={(e) => setFormData({...formData, password: e.target.value})}
//                   className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-3 text-gray-400 hover:text-white"
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-3 px-4 bg-gradient-to-r ${getUserTypeColor()} text-white font-semibold rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200`}
//             >
//               {loading ? 'Signing in...' : 'Sign In'}
//             </button>
//           </form>

//           <div className="mt-6 text-center space-y-4">
//             <button
//               onClick={onForgotPassword}
//               className="text-purple-300 hover:text-purple-200 text-sm"
//             >
//               Forgot your password?
//             </button>

//             {userType === 'user' && (
//               <div>
//                 <p className="text-gray-300 text-sm">
//                   Don't have an account?{' '}
//                   <button
//                     onClick={onToggleForm}
//                     className="text-purple-300 hover:text-purple-200 font-medium"
//                   >
//                     Sign up
//                   </button>
//                 </p>
//               </div>
//             )}

//             <div className="flex justify-center space-x-4 pt-4 border-t border-white/20">
//               <button
//                 onClick={() => onSwitchType('user')}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                   userType === 'user' 
//                     ? 'bg-purple-600 text-white' 
//                     : 'bg-white/10 text-gray-300 hover:bg-white/20'
//                 }`}
//               >
//                 <User className="w-4 h-4 inline mr-2" />
//                 User
//               </button>
//               <button
//                 onClick={() => onSwitchType('partner')}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                   userType === 'partner' 
//                     ? 'bg-blue-600 text-white' 
//                     : 'bg-white/10 text-gray-300 hover:bg-white/20'
//                 }`}
//               >
//                 <Building className="w-4 h-4 inline mr-2" />
//                 Partner
//               </button>
//               <button
//                 onClick={() => onSwitchType('admin')}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                   userType === 'admin' 
//                     ? 'bg-red-600 text-white' 
//                     : 'bg-white/10 text-gray-300 hover:bg-white/20'
//                 }`}
//               >
//                 <Shield className="w-4 h-4 inline mr-2" />
//                 Admin
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;


import React, { useState } from 'react';
import { User, Lock, Mail, Eye, EyeOff, Building, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LoginForm = ({ userType, onToggleForm, onSwitchType, onForgotPassword, customLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Use the unified login function from AuthContext
      if (customLogin) {
        await customLogin(formData, userType);
      } else {
        await login(formData, userType);
      }
      
      // Handle redirect after successful login
      if (userType === 'admin') {
        window.location.href = '/admin';
      }
      // Other redirects can be handled by the parent component or routing logic
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserTypeIcon = () => {
    switch(userType) {
      case 'admin': return <Shield className="w-5 h-5" />;
      case 'partner': return <Building className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  const getUserTypeColor = () => {
    switch(userType) {
      case 'admin': return 'from-red-500 to-pink-600';
      case 'partner': return 'from-blue-500 to-indigo-600';
      default: return 'from-purple-500 to-indigo-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className={`mx-auto h-16 w-16 bg-gradient-to-r ${getUserTypeColor()} rounded-full flex items-center justify-center mb-4`}>
            {getUserTypeIcon()}
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {userType.charAt(0).toUpperCase() + userType.slice(1)} Login
          </h2>
          <p className="text-gray-300">Sign in to your account</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 bg-gradient-to-r ${getUserTypeColor()} text-white font-semibold rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200`}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <button
              onClick={onForgotPassword}
              className="text-purple-300 hover:text-purple-200 text-sm"
            >
              Forgot your password?
            </button>

            {userType === 'user' && (
              <div>
                <p className="text-gray-300 text-sm">
                  Don't have an account?{' '}
                  <button
                    onClick={onToggleForm}
                    className="text-purple-300 hover:text-purple-200 font-medium"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            )}

            <div className="flex justify-center space-x-4 pt-4 border-t border-white/20">
              <button
                onClick={() => onSwitchType('user')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  userType === 'user' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <User className="w-4 h-4 inline mr-2" />
                User
              </button>
              <button
                onClick={() => onSwitchType('partner')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  userType === 'partner' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <Building className="w-4 h-4 inline mr-2" />
                Partner
              </button>
              <button
                onClick={() => onSwitchType('admin')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  userType === 'admin' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <Shield className="w-4 h-4 inline mr-2" />
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;