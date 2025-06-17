import React, { useState, useEffect } from 'react';
import { 
  User, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Bell,
  Menu,
  X,
  LogOut,
  Settings,
  Home,
  CreditCard,
  Users,
  BarChart3,
  Plane,
  Percent,
  ExternalLink
} from 'lucide-react';

import BookingsManager from '../components/BookingsManager';
import PayoutManager from '../components/PayoutManager';
import ProfileManager from '../components/ProfileManager';
import Analytics from '../components/Analytics';
import CommissionManager from '../components/CommissionManager';
import { backendUrl } from '../../config/config';

// API Configuration
const API_BASE_URL = `${backendUrl}/api/partners`;

// Utility function to get auth token
const token = localStorage.getItem('authToken') || localStorage.getItem('token');
// Utility function for API calls
const apiCall = async (endpoint, options = {}) => {
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }
  
  return response.json();
};

// Stats Card Component
const StatsCard = ({ icon: Icon, title, value, change, changeType }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {change && (
          <div className={`flex items-center mt-2 text-sm ${
            changeType === 'positive' ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>{change}</span>
          </div>
        )}
      </div>
      <div className="p-3 bg-blue-50 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
    </div>
  </div>
);

// Recent Bookings Component for Dashboard Overview
const RecentBookings = ({ bookings, loading }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
    {loading ? (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-200 h-10 w-10"></div>
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    ) : bookings && bookings.length > 0 ? (
      <div className="space-y-4">
        {bookings.slice(0, 5).map((booking) => (
          <div key={booking.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="p-2 bg-blue-100 rounded-full">
              <Plane className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{booking.booking_reference}</p>
              <p className="text-sm text-gray-500">
                {booking.passengers && booking.passengers.length > 0 
                  ? `${booking.passengers[0].first_name} ${booking.passengers[0].last_name}`
                  : 'N/A'
                }
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                ${(booking.commission_earned || 0).toLocaleString()}
              </p>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                booking.status === 'confirmed' 
                  ? 'bg-green-100 text-green-800'
                  : booking.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-8">
        <Plane className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">No bookings yet</p>
      </div>
    )}
  </div>
);

// Quick Actions Component for Dashboard
const QuickActions = ({ onRequestPayout, onViewCommissions, availableBalance }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
    <div className="space-y-3">
      <button
        onClick={onRequestPayout}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <DollarSign className="w-5 h-5" />
        <span>Request Payout</span>
      </button>
      <button
        onClick={onViewCommissions}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <Percent className="w-5 h-5" />
        <span>View Commissions</span>
      </button>
      <div className="text-center">
        <p className="text-sm text-gray-500">Available Balance</p>
        <p className="text-2xl font-bold text-green-600">${availableBalance.toLocaleString()}</p>
      </div>
    </div>
  </div>
);

// Sidebar Navigation Component
const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen, onNavigateToLanding }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'bookings', icon: Calendar, label: 'Bookings' },
    { id: 'commissions', icon: Percent, label: 'Commissions' },
    { id: 'payouts', icon: CreditCard, label: 'Payouts' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  ];

  const handleItemClick = (itemId) => {
    if (itemId === 'landing') {
      onNavigateToLanding();
    } else {
      setActiveTab(itemId);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">Partner Portal</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <nav className="px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
          
          {/* Separate Landing Page Navigation Button */}
          <button
            onClick={() => handleItemClick('landing')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Landing Page</span>
          </button>
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors duration-200">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

// Main Dashboard Component
const PartnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [partnerProfile, setPartnerProfile] = useState(null);
  const [bookings, setBookings] = useState([]);

  // Handle navigation to landing page
  const handleNavigateToLanding = () => {
    // Option 1: Navigate to a different route (if using React Router)
    window.location.href = '/'; // or navigate('/') if using useNavigate hook
    
    // Option 2: Open landing page in new tab
    // window.open('/', '_blank');
    
    // Option 3: Replace current page with landing page
    // window.location.replace('/');
  };

  // Fetch dashboard data
 const fetchDashboardData = async () => {
  try {
    setLoading(true);
    const [dashboardResponse, profileResponse, bookingsResponse] = await Promise.all([
      apiCall('/dashboard'),
      apiCall('/profile'),
      apiCall('/bookings')
    ]);
    
    console.log('Dashboard Response:', dashboardResponse); // Debug log
    console.log('Bookings Response:', bookingsResponse); // Debug log
    
    // Fix: Access the data property from dashboard response
    const dashboardData = dashboardResponse.data || dashboardResponse;
    
    // Set dashboard data correctly
    setDashboardData({
      totalBookings: dashboardData.statistics?.totalBookings || 0,
      totalCommission: dashboardData.statistics?.totalCommissionEarned || 0,
      monthlyBookings: dashboardData.statistics?.monthlyBookingCount || 0,
      recentBookings: dashboardData.recentBookings || []
    });
    
    setPartnerProfile(profileResponse.data || profileResponse);
    
    // Handle bookings response format
    let bookingsArray = [];
    if (Array.isArray(bookingsResponse)) {
      bookingsArray = bookingsResponse;
    } else if (bookingsResponse && Array.isArray(bookingsResponse.data)) {
      bookingsArray = bookingsResponse.data;
    } else if (bookingsResponse && bookingsResponse.bookings && Array.isArray(bookingsResponse.bookings)) {
      bookingsArray = bookingsResponse.bookings;
    }
    
    setBookings(bookingsArray);
    
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    // Set demo data for showcase (keep your existing demo data)
    setDashboardData({
      totalBookings: 24,
      totalCommission: 4250.00,
      monthlyBookings: 8,
      recentBookings: [
        {
          id: 1,
          booking_reference: 'ELV-2024-001',
          commission_earned: 125.50,
          status: 'confirmed',
          passengers: [{ first_name: 'John', last_name: 'Doe' }]
        },
        {
          id: 2,
          booking_reference: 'ELV-2024-002',
          commission_earned: 89.25,
          status: 'pending',
          passengers: [{ first_name: 'Jane', last_name: 'Smith' }]
        }
      ]
    });
    setPartnerProfile({
      first_name: 'Demo',
      last_name: 'Partner',
      business_name: 'Demo Travel Agency',
      status: 'approved',
      email_verified: true,
      commission_rate: 0.05,
      available_balance: 2150.75
    });
  } finally {
    setLoading(false);
  }
};

  // Handle payout request
  const handleRequestPayout = () => {
    setActiveTab('payouts');
  };

  // Handle view commissions
  const handleViewCommissions = () => {
    setActiveTab('commissions');
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Get page title based on active tab
  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'bookings': return 'Bookings';
      case 'commissions': return 'Commissions';
      case 'payouts': return 'Payouts';
      case 'profile': return 'Profile';
      case 'analytics': return 'Analytics';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onNavigateToLanding={handleNavigateToLanding}
      />
      
      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <Settings className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                  icon={Calendar}
                  title="Total Bookings"
                  value={dashboardData?.totalBookings || 0}
                  change="+12% this month"
                  changeType="positive"
                />
                <StatsCard
                  icon={DollarSign}
                  title="Total Earnings"
                  value={`$${(dashboardData?.totalCommission || 0).toLocaleString()}`}
                  change="+8% this month"
                  changeType="positive"
                />
                <StatsCard
                  icon={TrendingUp}
                  title="Monthly Bookings"
                  value={dashboardData?.monthlyBookings || 0}
                  change="+5% vs last month"
                  changeType="positive"
                />
                <StatsCard
                  icon={Users}
                  title="Available Balance"
                  value={`$${(partnerProfile?.available_balance || 0).toLocaleString()}`}
                />
              </div>

              {/* Dashboard Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <RecentBookings 
                    bookings={dashboardData?.recentBookings || bookings} 
                    loading={loading} 
                  />
                </div>
                <div className="space-y-6">
                  <QuickActions 
                    onRequestPayout={handleRequestPayout}
                    onViewCommissions={handleViewCommissions}
                    availableBalance={partnerProfile?.available_balance || 0}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Bookings Tab - Using BookingManager Component */}
          {activeTab === 'bookings' && (
            <BookingsManager />
          )}

          {/* Commissions Tab - Using CommissionManager Component */}
          {activeTab === 'commissions' && (
            <CommissionManager />
          )}

          {/* Payouts Tab - Using PayoutManager Component */}
          {activeTab === 'payouts' && (
            <PayoutManager />
          )}

          {/* Profile Tab - Using ProfileManager Component */}
          {activeTab === 'profile' && (
            <ProfileManager />
          )}

          {/* Analytics Tab - Using Analytics Component */}
          {activeTab === 'analytics' && (
            <Analytics />
          )}
        </main>
      </div>
    </div>
  );
};

export default PartnerDashboard;