import React, { useState, useEffect } from 'react';
import {  
  X,  
  Plus,
  Edit,  
  Check,
  Ban,

} from 'lucide-react';
import { toast } from 'react-toastify';




const PromoCodesManagement = () => {
  const [promoCodes, setPromoCodes] = useState([
    { id: 1, code: 'WELCOME10', discountType: 'percentage', discountValue: 10, usageLimit: 100, used: 45, status: 'active', expiryDate: '2025-12-31' },
    { id: 2, code: 'SAVE50', discountType: 'fixed', discountValue: 50, usageLimit: 50, used: 12, status: 'active', expiryDate: '2025-06-30' },
    { id: 3, code: 'EXPIRED20', discountType: 'percentage', discountValue: 20, usageLimit: 200, used: 200, status: 'inactive', expiryDate: '2025-01-15' }
  ]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handlePromoAction = (promoId, action) => {
    setPromoCodes(promoCodes.map(promo =>
      promo.id === promoId
        ? { ...promo, status: action === 'activate' ? 'active' : 'inactive' }
        : promo
    ));
    toast.success(`Promo code ${action}d successfully`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Promo Codes Management</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Create Promo Code
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Code</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Value</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Usage</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Expires</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {promoCodes.map((promo) => (
                <tr key={promo.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono font-medium text-gray-900">{promo.code}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 capitalize">{promo.discountType}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {promo.discountType === 'percentage' ? `${promo.discountValue}%` : `${promo.discountValue}`}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {promo.used}/{promo.usageLimit}
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(promo.used / promo.usageLimit) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      promo.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {promo.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{promo.expiryDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        <Edit size={16} />
                      </button>
                      {promo.status === 'active' ? (
                        <button
                          onClick={() => handlePromoAction(promo.id, 'deactivate')}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Ban size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePromoAction(promo.id, 'activate')}
                          className="text-green-500 hover:text-green-700"
                        >
                          <Check size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Promo Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Create Promo Code</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Code</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="NEWCODE10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type</label>
                <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discount Value</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Usage Limit</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoCodesManagement;