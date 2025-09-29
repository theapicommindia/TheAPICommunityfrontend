import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Clock, MapPin, Users, Trash2, Eye, Edit } from "lucide-react";
import { eventAPI } from '../../config/api';
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function ManageEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await eventAPI.getAllEvents();
      // Sort events by date in descending order (newest first)
      const sortedEvents = data.sort((a, b) => new Date(b.date) - new Date(a.date));
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

  const handleDeleteClick = (event) => {
    setEventToDelete(event);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!eventToDelete) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5002'}/api/events/${eventToDelete._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      toast.success('Event deleted successfully');
      // Refresh the events list
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    } finally {
      setIsDeleteDialogOpen(false);
      setEventToDelete(null);
    }
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
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-black">Manage Events</h1>
          <button
            onClick={() => navigate('/admin/events/create')}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Create New Event
          </button>
        </div>

        <div className="grid gap-6">
          {events.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg shadow">
              <p className="text-gray-600">No events available</p>
            </div>
          ) : (
            events.map((event) => (
              <div key={event._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-black mb-2">{event.title}</h2>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-600">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-600">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-600">{event.availableSeats} seats</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => navigate(`/event/${event._id}`)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => navigate(`/admin/events/edit/${event._id}`)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(event)}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-md hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className='bg-white text-black'>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} className='bg-red-500 text-white border-none' >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ManageEvents; 