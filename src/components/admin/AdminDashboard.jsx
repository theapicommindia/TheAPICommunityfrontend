import React, { useState } from 'react';
import { Calendar, Users, Settings, ClipboardList, Menu, X } from "lucide-react";
import ManageEvents from './ManageEvents';
import EventRegistrations from './EventRegistrations';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('events');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'events':
        return <ManageEvents />;
      case 'registrations':
        return <EventRegistrations />;
      default:
        return <ManageEvents />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-black">Admin Panel</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6 text-black" />
          ) : (
            <Menu className="w-6 h-6 text-black" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:static inset-y-0 left-0 z-30 w-64 bg-white shadow-md transform transition-transform duration-200 ease-in-out`}
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold text-black mb-8 hidden md:block">Admin Panel</h1>
          <nav className="space-y-2">
            <button
              onClick={() => {
                setActiveTab('events');
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === 'events'
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Manage Events</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('registrations');
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === 'registrations'
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ClipboardList className="w-5 h-5" />
              <span>Event Registrations</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}

export default AdminDashboard;

