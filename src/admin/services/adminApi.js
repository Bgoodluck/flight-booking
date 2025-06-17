// services/adminApi.js
const API_BASE_URL = 'http://localhost:5000/api';

class AdminApiService {
  constructor() {
    this.baseURL = `${API_BASE_URL}/admin`;
  }

  // Helper method to make authenticated requests
  async makeRequest(endpoint, options = {}) {
    const token = localStorage.getItem('adminToken'); 
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Dashboard methods
  async getDashboardStats() {
    return this.makeRequest('/dashboard');
  }

  // Users management methods
  async getAllUsers(page = 1, limit = 20, filters = {}) {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters
    });
    
    return this.makeRequest(`/users?${queryParams}`);
  }

  async manageUser(action, userId, data = {}) {
    return this.makeRequest(`/users/${action}/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Partners management methods
  async getAllPartners(page = 1, limit = 20, filters = {}) {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters
    });
    
    return this.makeRequest(`/partners?${queryParams}`);
  }

  async managePartner(action, partnerId, data = {}) {
    return this.makeRequest(`/partners/${action}/${partnerId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Bookings management methods
  async getAllBookings(page = 1, limit = 20, filters = {}) {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters
    });
    
    return this.makeRequest(`/bookings?${queryParams}`);
  }

  async getBookingDetails(bookingId) {
    return this.makeRequest(`/bookings/${bookingId}`);
  }

  // Refunds management methods
  async getAllRefunds(page = 1, limit = 20, filters = {}) {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters
    });
    
    return this.makeRequest(`/refunds?${queryParams}`);
  }

  async processRefund(refundId, action) {
    return this.makeRequest(`/refunds/${refundId}/${action}`, {
      method: 'PUT',
    });
  }

  // Reports methods
  async generateReport(reportType, dateRange) {
    const queryParams = new URLSearchParams({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    });
    
    return this.makeRequest(`/reports/${reportType}?${queryParams}`);
  }

  // System methods
  async getSystemLogs(page = 1, limit = 50, filters = {}) {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters
    });
    
    return this.makeRequest(`/system/logs?${queryParams}`);
  }

  async getSystemSettings() {
    return this.makeRequest('/system/settings');
  }

  async updateSystemSettings(settings) {
    return this.makeRequest('/system/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }
}

export default new AdminApiService();