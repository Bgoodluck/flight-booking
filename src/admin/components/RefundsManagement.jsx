import React, { useState } from 'react';
import { 
  X,
  Eye,
  Check,
  
} from 'lucide-react';
import { toast } from 'react-toastify';


const RefundsManagement = () => {
  const [refunds] = useState([
    { id: 1, user: 'John Doe', amount: 450, status: 'pending', bookingRef: 'BK001', createdAt: '2024-01-15' },
    { id: 2, user: 'Jane Smith', amount: 320, status: 'approved', bookingRef: 'BK002', createdAt: '2024-01-14' },
    { id: 3, user: 'Bob Johnson', amount: 780, status: 'rejected', bookingRef: 'BK003', createdAt: '2024-01-13' }
  ]);

  const handleRefundAction = (refundId, action) => {
    toast.success(`Refund ${action} successfully`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Refunds Management</h2>
        <div className="text-sm text-gray-600">
          Pending: {refunds.filter(r => r.status === 'pending').length}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">User</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Booking Ref</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {refunds.map((refund) => (
                <tr key={refund.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{refund.user}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{refund.bookingRef}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">${refund.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      refund.status === 'approved' ? 'bg-green-100 text-green-800' :
                      refund.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {refund.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{refund.createdAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        <Eye size={16} />
                      </button>
                      {refund.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleRefundAction(refund.id, 'approve')}
                            className="text-green-500 hover:text-green-700"
                          >
                            <Check size={16} />
                          </button>
                          <button 
                            onClick={() => handleRefundAction(refund.id, 'reject')}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RefundsManagement;