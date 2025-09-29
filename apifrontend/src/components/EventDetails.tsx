import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CalendarDays, Clock, MapPin, Users, ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Event {
  _id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  date: string;
  time: string;
  location: string;
  availableSeats: number;
  image?: string;
}

function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5002'}/api/events/${eventId}`);
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Error</h2>
          <p className="text-black">{error}</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Event Not Found</h2>
          <p className="text-black">The event you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/event')}
          className="flex items-center gap-2 text-black hover:text-gray-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Events</span>
        </button>

        {/* Event Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          {event.image && (
            <div className="w-full h-96 relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/600x400?text=No+Image+Available';
                }}
              />
            </div>
          )}
          
          <div className="p-8">
            <h1 className="text-4xl font-bold text-black mb-4">{event.title}</h1>
            
            {/* Event Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <CalendarDays className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-black font-medium">Date</p>
                  <p className="font-semibold text-black">
                    {new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
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
                  <p className="text-sm text-black font-medium">Available Seats</p>
                  <p className="font-semibold text-black">{event.availableSeats}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">About This Event</h2>
              <p className="text-black whitespace-pre-wrap">{event.description}</p>
            </div>

            {/* Detailed Description */}
            {event.detailedDescription && (
              <div className="prose max-w-none mb-8">
                <h2 className="text-2xl font-bold text-black mb-4">Detailed Information</h2>
                <p className="text-black whitespace-pre-wrap">{event.detailedDescription}</p>
              </div>
            )}

            {/* Registration Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full md:w-auto bg-black text-white hover:bg-gray-800 transition-colors">
                  Register for Event
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-black">Register for {event.title}</DialogTitle>
                  <DialogDescription className="text-black">
                    Fill out the form below to register for this event.
                  </DialogDescription>
                </DialogHeader>
                {/* Add registration form here */}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails; 