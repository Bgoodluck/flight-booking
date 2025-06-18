import React, { useState } from 'react';
import { 
  Users, 
  Building2, 
  Calendar, 
  FileText, 
  DollarSign,
  Download,
  Eye,
  
} from 'lucide-react';
import { toast } from 'react-toastify';



const ReportsManagement = () => {
  const [selectedReport, setSelectedReport] = useState('bookings');
  const [dateRange, setDateRange] = useState({ start: '2025-05-01', end: '2025-05-31' });
  const [loading, setLoading] = useState(false);

  const reportTypes = [
    { id: 'bookings', label: 'Bookings Report', icon: Calendar },
    { id: 'revenue', label: 'Revenue Report', icon: DollarSign },
    { id: 'partners', label: 'Partners Report', icon: Building2 },
    { id: 'users', label: 'Users Report', icon: Users }
  ];

  const generateReport = async () => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        toast.success('Report generated successfully');
        setLoading(false);
      }, 2000);
    } catch (error) {
      toast.error('Failed to generate report');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Reports Management</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Selection */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Select Report Type</h3>
          <div className="space-y-2">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`w-full flex items-center p-3 rounded-lg border-2 transition-colors ${
                    selectedReport === report.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon size={20} className="mr-3" />
                  {report.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Date Range & Generate */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Report Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={generateReport}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <FileText size={16} className="mr-2" />
              )}
              Generate Report
            </button>
          </div>
        </div>

        {/* Report Preview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Report Preview</h3>
          <div className="text-center text-gray-500 py-8">
            <FileText size={48} className="mx-auto mb-4 text-gray-300" />
            <p>Select report type and generate to view results</p>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((report) => (
            <div key={report} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <FileText className="text-blue-500 mr-3" size={20} />
                <div>
                  <p className="font-medium">Bookings Report - May 2025</p>
                  <p className="text-sm text-gray-500">Generated on May 31, 2025</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <Eye size={16} />
                </button>
                <button className="text-green-500 hover:text-green-700">
                  <Download size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsManagement;