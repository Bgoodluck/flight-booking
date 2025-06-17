import React, { useState } from 'react';
import {   
  Settings,   
  Activity,  
  Download  
} from 'lucide-react';
import { toast } from 'react-toastify';


const SystemManagement = () => {
  const [activeSection, setActiveSection] = useState('settings');
  const [systemSettings, setSystemSettings] = useState({
    siteName: 'Elevatio',
    maintenanceMode: false,
    allowRegistration: true,
    maxFileSize: 5,
    sessionTimeout: 30
  });

  const sections = [
    { id: 'settings', label: 'System Settings', icon: Settings },
    { id: 'logs', label: 'System Logs', icon: Activity },
    { id: 'backup', label: 'Backup & Restore', icon: Download }
  ];

  const handleSettingChange = (key, value) => {
    setSystemSettings({ ...systemSettings, [key]: value });
  };

  const saveSettings = () => {
    toast.success('System settings saved successfully');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">System Management</h2>

      <div className="flex space-x-6">
        {/* Section Navigation */}
        <div className="w-64">
          <div className="bg-white rounded-lg shadow p-4">
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={16} className="mr-3" />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Section Content */}
        <div className="flex-1">
          {activeSection === 'settings' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-6">System Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                  <input
                    type="text"
                    value={systemSettings.siteName}
                    onChange={(e) => handleSettingChange('siteName', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Maintenance Mode</label>
                    <p className="text-sm text-gray-500">Put the site in maintenance mode</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemSettings.maintenanceMode}
                      onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Allow User Registration</label>
                    <p className="text-sm text-gray-500">Allow new users to register</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={systemSettings.allowRegistration}
                      onChange={(e) => handleSettingChange('allowRegistration', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max File Size (MB)</label>
                  <input
                    type="number"
                    value={systemSettings.maxFileSize}
                    onChange={(e) => handleSettingChange('maxFileSize', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={systemSettings.sessionTimeout}
                    onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={saveSettings}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                >
                  Save Settings
                </button>
              </div>
            </div>
          )}

          {activeSection === 'logs' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-6">System Logs</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((log) => (
                  <div key={log} className="flex items-start p-4 border-l-4 border-blue-500 bg-blue-50 rounded">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">User login successful</p>
                        <span className="text-xs text-gray-500">2 minutes ago</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">User ID: 123, IP: 192.168.1.1</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'backup' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-6">Backup & Restore</h3>
              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Download className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-lg font-medium text-gray-900 mb-2">Create System Backup</p>
                  <p className="text-gray-600 mb-4">Download a complete backup of your system data</p>
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center mx-auto">
                    <Download size={16} className="mr-2" />
                    Create Backup
                  </button>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-4">Recent Backups</h4>
                  <div className="space-y-3">
                    {[1, 2, 3].map((backup) => (
                      <div key={backup} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <p className="text-sm font-medium">System_Backup_2024_01_15.zip</p>
                          <p className="text-xs text-gray-500">Created on Jan 15, 2024 at 10:30 AM</p>
                        </div>
                        <button className="text-blue-500 hover:text-blue-700">
                          <Download size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default SystemManagement;