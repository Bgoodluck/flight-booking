import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  Calendar, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Eye,
  Download,
  TrendingUp
} from 'lucide-react';
import { backendUrl } from '../../config/config';

// API Configuration
const API_BASE_URL = `${backendUrl}/api/partners`;
// Utility function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken') || localStorage.getItem('token');
};

// Utility function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  // Check if the response is ok (status in the range 200-299)
  console.log("data recieved", response)
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }
  
  return response.json();
};

// Payout Status Badge Component
const PayoutStatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return {
          icon: CheckCircle,
          className: 'bg-green-100 text-green-800',
          text: 'Completed'
        };
      case 'pending':
        return {
          icon: Clock,
          className: 'bg-yellow-100 text-yellow-800',
          text: 'Pending'
        };
      case 'processing':
        return {
          icon: AlertCircle,
          className: 'bg-blue-100 text-blue-800',
          text: 'Processing'
        };
      case 'failed':
      case 'cancelled':
        return {
          icon: XCircle,
          className: 'bg-red-100 text-red-800',
          text: status === 'failed' ? 'Failed' : 'Cancelled'
        };
      default:
        return {
          icon: AlertCircle,
          className: 'bg-gray-100 text-gray-800',
          text: 'Unknown'
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>
      <Icon className="w-3 h-3 mr-1" />
      {config.text}
    </span>
  );
};

// Stats Card Component
const PayoutStatsCard = ({ icon: Icon, title, value, change, changeType }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
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

// Payout Card Component
const PayoutCard = ({ payout, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-full">
            <CreditCard className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              ${(payout.amount || 0).toLocaleString()}
            </h3>
            <p className="text-sm text-gray-500">
              Requested: {new Date(payout.requested_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <PayoutStatusBadge status={payout.status} />
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        {payout.processed_at && (
          <div className="flex items-center justify-between">
            <span>Processed:</span>
            <span>{new Date(payout.processed_at).toLocaleDateString()}</span>
          </div>
        )}
        {payout.method && (
          <div className="flex items-center justify-between">
            <span>Method:</span>
            <span className="capitalize">{payout.method}</span>
          </div>
        )}
        {payout.reference && (
          <div className="flex items-center justify-between">
            <span>Reference:</span>
            <span className="font-mono text-xs">{payout.reference}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end space-x-2">
        <button
          onClick={() => onViewDetails(payout)}
          className="inline-flex items-center px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors"
        >
          <Eye className="w-4 h-4 mr-1" />
          View Details
        </button>
      </div>
    </div>
  );
};

// Payout Details Modal Component
const PayoutDetailsModal = ({ payout, isOpen, onClose }) => {
  if (!isOpen || !payout) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Payout Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Payout Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount:</span>
                  <span className="font-semibold text-lg">${(payout.amount || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <PayoutStatusBadge status={payout.status} />
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Requested:</span>
                  <span>{new Date(payout.requested_at).toLocaleString()}</span>
                </div>
                {payout.processed_at && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Processed:</span>
                    <span>{new Date(payout.processed_at).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Payment Details</h3>
              <div className="space-y-2 text-sm">
                {payout.method && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Method:</span>
                    <span className="capitalize">{payout.method}</span>
                  </div>
                )}
                {payout.reference && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Reference:</span>
                    <span className="font-mono text-xs">{payout.reference}</span>
                  </div>
                )}
                {payout.notes && (
                  <div className="mt-3">
                    <span className="text-gray-500 block mb-1">Notes:</span>
                    <p className="text-gray-700 text-sm bg-gray-50 p-2 rounded">{payout.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Payout Requested</p>
                  <p className="text-xs text-gray-500">{new Date(payout.requested_at).toLocaleString()}</p>
                </div>
              </div>
              {payout.status !== 'pending' && (
                <div className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    payout.status === 'completed' ? 'bg-green-500' : 
                    payout.status === 'processing' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 capitalize">{payout.status}</p>
                    {payout.processed_at && (
                      <p className="text-xs text-gray-500">{new Date(payout.processed_at).toLocaleString()}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
          {payout.status === 'completed' && (
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors inline-flex items-center">
              <Download className="w-4 h-4 mr-1" />
              Download Receipt
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// New Payout Request Component
const NewPayoutRequest = ({ availableBalance, onRequestPayout, onCancel }) => {
  const [amount, setAmount] = useState('');
  const [requesting, setRequesting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    if (parseFloat(amount) > availableBalance) {
      alert('Amount exceeds available balance');
      return;
    }

    setRequesting(true);
    try {
      await onRequestPayout(parseFloat(amount));
      setAmount('');
      onCancel();
    } catch (error) {
      alert('Failed to submit payout request: ' + error.message);
    } finally {
      setRequesting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Request New Payout</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Balance: ${availableBalance.toLocaleString()}
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            max={availableBalance}
            step="0.01"
            required
          />
        </div>
        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={requesting || !amount}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            {requesting ? 'Requesting...' : 'Request Payout'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Main PayoutManager Component
const PayoutManager = () => {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showNewPayout, setShowNewPayout] = useState(false);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [stats, setStats] = useState({
    totalPaid: 0,
    pendingAmount: 0,
    completedPayouts: 0,
    averagePayout: 0
  });

  // Fetch payouts data
  const fetchPayouts = async () => {
  try {
    setLoading(true);
    
    // Make API calls with proper error handling
    const [payoutsResponse, profileResponse] = await Promise.all([
      apiCall('/payouts'),
      apiCall('/profile')
    ]);
    
    // Handle payouts response - extract data from API response structure
    let payoutsData = [];
    if (payoutsResponse) {
      // If response has success/data structure
      if (payoutsResponse.success && Array.isArray(payoutsResponse.data)) {
        payoutsData = payoutsResponse.data;
      } 
      // If response is direct array
      else if (Array.isArray(payoutsResponse)) {
        payoutsData = payoutsResponse;
      }
      // If response has data property but no success flag
      else if (payoutsResponse.data && Array.isArray(payoutsResponse.data)) {
        payoutsData = payoutsResponse.data;
      }
    }
    
    setPayouts(payoutsData);
    
    // Handle profile response - extract available_balance
    let balance = 0;
    if (profileResponse) {
      if (profileResponse.success && profileResponse.data) {
        balance = profileResponse.data.available_balance || 0;
      } else if (profileResponse.data) {
        balance = profileResponse.data.available_balance || 0;
      } else {
        balance = profileResponse.available_balance || 0;
      }
    }
    
    setAvailableBalance(balance);
    
    // Calculate stats - ensure payoutsData is an array
    const validPayouts = Array.isArray(payoutsData) ? payoutsData : [];
    
    const totalPaid = validPayouts
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + (p.amount || 0), 0);
      
    const pendingAmount = validPayouts
      .filter(p => p.status === 'pending')
      .reduce((sum, p) => sum + (p.amount || 0), 0);
      
    const completedPayouts = validPayouts.filter(p => p.status === 'completed').length;
    const averagePayout = completedPayouts > 0 ? totalPaid / completedPayouts : 0;
    
    setStats({
      totalPaid,
      pendingAmount,
      completedPayouts,
      averagePayout
    });
    
  } catch (error) {
    console.error('Failed to fetch payouts:', error);
    // Set empty array as fallback to prevent map/filter errors
    setPayouts([]);
    setAvailableBalance(0);
    setStats({
      totalPaid: 0,
      pendingAmount: 0,
      completedPayouts: 0,
      averagePayout: 0
    });
  } finally {
    setLoading(false);
  }
};

  // Handle new payout request
 const handleRequestPayout = async (amount) => {
  try {
    const response = await apiCall('/payout', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
    
    // Check if the response indicates success
    if (response.success || response.message) {
      // Refresh data after successful payout
      await fetchPayouts();
    } else {
      throw new Error(response.error || 'Payout request failed');
    }
  } catch (error) {
    console.error('Payout request failed:', error);
    throw error;
  }
};
  // Handle view payout details
  const handleViewDetails = (payout) => {
    setSelectedPayout(payout);
    setShowModal(true);
  };

  useEffect(() => {
    fetchPayouts();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Payouts</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Payouts</h2>
        <button
          onClick={() => setShowNewPayout(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Request Payout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PayoutStatsCard
          icon={DollarSign}
          title="Total Paid Out"
          value={`$${stats.totalPaid.toLocaleString()}`}
        />
        <PayoutStatsCard
          icon={Clock}
          title="Pending Amount"
          value={`$${stats.pendingAmount.toLocaleString()}`}
        />
        <PayoutStatsCard
          icon={CheckCircle}
          title="Completed Payouts"
          value={stats.completedPayouts}
        />
        <PayoutStatsCard
          icon={TrendingUp}
          title="Average Payout"
          value={`$${stats.averagePayout.toLocaleString()}`}
        />
      </div>

      {/* New Payout Request Form */}
      {showNewPayout && (
        <NewPayoutRequest
          availableBalance={availableBalance}
          onRequestPayout={handleRequestPayout}
          onCancel={() => setShowNewPayout(false)}
        />
      )}

      {/* Payouts List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Payout History</h3>
        </div>
        <div className="p-6">
          {payouts.length === 0 ? (
            <div className="text-center py-8">
              <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No payouts yet</p>
              <p className="text-sm text-gray-400 mt-1">Request your first payout to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {payouts.map((payout) => (
                <PayoutCard
                  key={payout.id}
                  payout={payout}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Payout Details Modal */}
      <PayoutDetailsModal
        payout={selectedPayout}
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedPayout(null);
        }}
      />
    </div>
  );
};

export default PayoutManager;