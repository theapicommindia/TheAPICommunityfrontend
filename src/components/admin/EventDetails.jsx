import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CalendarDays, TicketMinus, MapPin, Clock, Users, Info } from "lucide-react";
import { eventAPI } from '../../config/api';
import { toast } from "sonner";

function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!eventId) {
        setError('Event ID is missing');
        setLoading(false);
        return;
      }

      try {
        const [eventData, registrationsData] = await Promise.all([
          eventAPI.getEventById(eventId),
          fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5002'}/api/registrations/event/${eventId}`).then(res => res.json())
        ]);
        
        setEvent(eventData);
        setRegistrations(registrationsData);
        setError(null);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError('Failed to load event details. Please try again later.');
        toast.error('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleStatusChange = async (registrationId, newStatus) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5002'}/api/registrations/${registrationId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const updatedRegistration = await response.json();
      setRegistrations(prev => 
        prev.map(reg => 
          reg._id === registrationId ? updatedRegistration : reg
        )
      );
      toast.success('Registration status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update registration status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100">
        <div className="text-center">
          <h2 className="text-2xl text-black font-bold mb-4">Oops!</h2>
          <p className="text-black">{error || 'Event not found'}</p>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.date);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Event Details Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-black mb-6">{event.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <CalendarDays className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-black font-medium">Date</p>
                <p className="font-semibold text-black">
                  {eventDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-black font-medium">Time</p>
                <p className="font-semibold text-black">{event.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-black font-medium">Location</p>
                <p className="font-semibold text-black">{event.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-black font-medium">Registrations</p>
                <p className="font-semibold text-black">{registrations.length} / {event.availableSeats}</p>
              </div>
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">Description</h2>
            <p className="text-black whitespace-pre-wrap">{event.description}</p>
          </div>

          {event.detailedDescription && (
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold text-black mb-4">Detailed Information</h2>
              <p className="text-black whitespace-pre-wrap">{event.detailedDescription}</p>
            </div>
          )}
        </div>

        {/* Registrations Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-black mb-6">Registrations</h2>
          
          {registrations.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No registrations yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LinkedIn</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GitHub</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Portfolio</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {registrations.map((registration) => (
                    <tr key={registration._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{registration.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{registration.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{registration.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <a href={registration.linkedinId} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-800">
                          View Profile
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {registration.githubAccount ? (
                          <a href={registration.githubAccount} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-800">
                            View Profile
                          </a>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {registration.portfolio ? (
                          <a href={registration.portfolio} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-800">
                            View Portfolio
                          </a>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          registration.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          registration.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          {registration.status !== 'confirmed' && (
                            <button
                              onClick={() => handleStatusChange(registration._id, 'confirmed')}
                              className="text-green-600 hover:text-green-900 font-medium"
                            >
                              Confirm
                            </button>
                          )}
                          {registration.status !== 'cancelled' && (
                            <button
                              onClick={() => handleStatusChange(registration._id, 'cancelled')}
                              className="text-red-600 hover:text-red-900 font-medium"
                            >
                              Cancel
                            </button>
                          )}
                          {registration.status === 'cancelled' && registration.status !== 'confirmed' && (
                            <button
                              onClick={() => handleStatusChange(registration._id, 'pending')}
                              className="text-yellow-600 hover:text-yellow-900 font-medium"
                            >
                              Mark Pending
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetails; 