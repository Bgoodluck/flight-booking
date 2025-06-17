import React, { useState, useEffect } from 'react';
import {   
  Bell
} from 'lucide-react';
import { toast } from 'react-toastify';


const NotificationsManagement = () => {
  const [notificationType, setNotificationType] = useState('broadcast');
  const [notification, setNotification] = useState({
    title: '',
    message: '',
    type: 'info',
    recipients: 'all'
  });

  const sendNotification = () => {
    toast.success('Notification sent successfully');
    setNotification({ title: '', message: '', type: 'info', recipients: 'all' });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Notifications Management</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Send Notification */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Send Notification</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={notification.title}
                onChange={(e) => setNotification({ ...notification, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Notification title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                value={notification.message}
                onChange={(e) => setNotification({ ...notification, message: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Notification message"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={notification.type}
                  onChange={(e) => setNotification({ ...notification, type: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="success">Success</option>
                  <option value="error">Error</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                <select
                  value={notification.recipients}
                  onChange={(e) => setNotification({ ...notification, recipients: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Users</option>
                  <option value="active">Active Users</option>
                  <option value="partners">Partners</option>
                  <option value="admins">Admins</option>
                </select>
              </div>
            </div>

            <button
              onClick={sendNotification}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center"
            >
              <Bell size={16} className="mr-2" />
              Send Notification
            </button>
          </div>
        </div>

        {/* Notification History */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Notifications</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((notif) => (
              <div key={notif} className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">System Maintenance Notice</p>
                    <p className="text-sm text-gray-600 mt-1">Scheduled maintenance will occur tonight...</p>
                    <p className="text-xs text-gray-500 mt-2">Sent to: All Users • 2 hours ago</p>
                  </div>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">Info</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsManagement