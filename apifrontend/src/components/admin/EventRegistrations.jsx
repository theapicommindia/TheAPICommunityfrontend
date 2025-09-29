import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Download } from 'lucide-react';

function EventRegistrations() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const getAuthToken = () => {
    return localStorage.getItem('adminToken');
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5002'}/api/admin/events`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`
          }
        }
      );
      const sortedEvents = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setEvents(sortedEvents);
      setError(null);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events');
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const fetchRegistrations = async (eventId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5002'}/api/admin/registrations/event/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`
          }
        }
      );
      setRegistrations(prev => ({
        ...prev,
        [eventId]: response.data.data
      }));
    } catch (error) {
      console.error('Error fetching registrations:', error);
      toast.error('Failed to load registrations');
    }
  };

  const handleViewRegistrations = async (event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
    if (!registrations[event._id]) {
      await fetchRegistrations(event._id);
    }
  };

  const exportToCSV = (eventId) => {
    const eventRegistrations = registrations[eventId] || [];
    const event = events.find(e => e._id === eventId);
    
    if (!eventRegistrations.length) {
      toast.error('No registrations to export');
      return;
    }

    const headers = ['Name', 'Email', 'Phone', 'GitHub', 'LinkedIn', 'Portfolio', 'Registration Date'];
    const csvData = eventRegistrations.map(reg => [
      reg.name,
      reg.email,
      reg.phone,
      reg.githubAccount || '',
      reg.linkedinId,
      reg.portfolio || '',
      format(new Date(reg.registeredAt), 'PPP')
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${event.title}_registrations.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-black font-bold mb-4">Oops!</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-black mb-8">Event Registrations</h1>

      <div className="grid gap-6">
        {events.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <p className="text-gray-600">No events available</p>
          </div>
        ) : (
          events.map((event) => (
            <div key={event._id} className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <h2 className="text-xl font-semibold text-black">{event.title}</h2>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button
                    onClick={() => handleViewRegistrations(event)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800"
                  >
                    <Eye className="w-4 h-4" />
                    View Registrations
                  </Button>
                  <Button
                    onClick={() => exportToCSV(event._id)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </Button>
                </div>
              </div>
              <p className="text-gray-600 mb-2">
                Date: {format(new Date(event.date), 'PPP')}
              </p>
              <p className="text-gray-600">
                Available Seats: {event.availableSeats}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Registrations Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white text-black max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Registrations for {selectedEvent?.title}
            </DialogTitle>
            <DialogDescription>
              View and manage registrations for this event
            </DialogDescription>
          </DialogHeader>

          {selectedEvent && registrations[selectedEvent._id] ? (
            <div className="mt-4">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium text-gray-500">Name</th>
                      <th className="text-left p-4 font-medium text-gray-500">Email</th>
                      <th className="text-left p-4 font-medium text-gray-500">Phone</th>
                      <th className="text-left p-4 font-medium text-gray-500 hidden md:table-cell">GitHub</th>
                      <th className="text-left p-4 font-medium text-gray-500 hidden md:table-cell">LinkedIn</th>
                      <th className="text-left p-4 font-medium text-gray-500 hidden md:table-cell">Portfolio</th>
                      <th className="text-left p-4 font-medium text-gray-500 hidden sm:table-cell">Registration Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations[selectedEvent._id].map((registration) => (
                      <tr key={registration._id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="font-medium text-black">{registration.name}</div>
                          <div className="text-sm text-gray-500 md:hidden">
                            {registration.email}
                          </div>
                          <div className="text-sm text-gray-500 md:hidden">
                            {registration.phone}
                          </div>
                        </td>
                        <td className="p-4 hidden md:table-cell">{registration.email}</td>
                        <td className="p-4 hidden md:table-cell">{registration.phone}</td>
                        <td className="p-4 hidden md:table-cell">
                          <a
                            href={registration.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {registration.github}
                          </a>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <a
                            href={registration.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {registration.linkedin}
                          </a>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <a
                            href={registration.portfolio}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {registration.portfolio}
                          </a>
                        </td>
                        <td className="p-4 hidden sm:table-cell">
                          {format(new Date(registration.createdAt), 'PPP')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No registrations found for this event</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EventRegistrations;