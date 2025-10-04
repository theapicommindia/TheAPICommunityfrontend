import React, { useState, useEffect, memo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format, isAfter } from 'date-fns';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { FaLinkedin } from "react-icons/fa";


// Speaker Card Component
const SpeakerCard = memo(({ speaker, onClick }) => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <div 
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center space-y-4 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        {/* Profile Image */}
        <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 flex items-center justify-center bg-gray-100 rounded-full overflow-hidden border-2 border-gray-200">
          {speaker.image ? (
            <img
              src={speaker.image}
              alt={speaker.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div 
            className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200"
            style={{ display: speaker.image ? 'none' : 'flex' }}
          >
            <div className="text-center">
              <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center bg-blue-600">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Name + Role */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {speaker.name}
          </h3>
          <p className="text-sm font-medium" style={{ color: '#3097B8' }}>{speaker.role}</p>
        </div>

        {/* LinkedIn */}
        <a
          href={speaker.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 transition-colors hover:text-blue-600"
          onClick={(e) => e.stopPropagation()}
        >
          <FaLinkedin className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
});
SpeakerCard.displayName = "SpeakerCard";

// Speaker Modal Component
const SpeakerModal = memo(({ speaker, isOpen, onClose }) => {
  if (!isOpen || !speaker) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-start md:items-center justify-center p-4 bg-black/30 backdrop-blur-sm overflow-auto animate-fadeIn"
      style={{ paddingTop: window.innerWidth < 768 ? "6rem" : undefined }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl md:max-w-4xl max-h-[85vh] overflow-y-auto relative transform transition-all duration-300 ease-out animate-slideUp">
        <button
          onClick={onClose}
          className="absolute text-2xl top-4 right-4 z-10 w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-all duration-200 text-black font-bold hover:scale-110"
        >
          ×
        </button>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="flex-shrink-0">
              <div className="w-36 h-36 md:w-48 md:h-48 flex items-center justify-center bg-gray-100 rounded-full overflow-hidden border-4 border-gray-200">
                {speaker.image ? (
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200"
                  style={{ display: speaker.image ? 'none' : 'flex' }}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center bg-blue-600">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {speaker.name}
              </h2>
              <p className="text-lg md:text-xl font-semibold mb-1" style={{ color: '#3097B8' }}>
                {speaker.role}
              </p>
              <div className="mb-6">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                  About
                </h3>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {speaker.bio}
                </p>
              </div>
              <div className="flex items-center">
                <a
                  href={speaker.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 text-white rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #3097B8 0%, #2a7a9a 50%, #1e5f7a 100%)' }}
                >
                  <FaLinkedin className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
SpeakerModal.displayName = "SpeakerModal";

function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    githubAccount: '',
    linkedinId: '',
    portfolio: ''
  });
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [isSpeakerModalOpen, setIsSpeakerModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5002'}/api/events/${eventId}`);
        console.log('Event data:', response.data);
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleImageError = () => {
    console.error('Image failed to load:', event?.image);
    setImageError(true);
  };

  const isEventUpcoming = (eventDate) => {
    return isAfter(new Date(eventDate), new Date());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsRegistering(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5002'}/api/registrations`,
        {
          ...formData,
          eventId
        }
      );

      if (response.data.success) {
        toast.success('Registration successful!');
        navigate('/event');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleSpeakerClick = useCallback((speaker) => {
    setSelectedSpeaker(speaker);
    setIsSpeakerModalOpen(true);
  }, []);

  const handleCloseSpeakerModal = useCallback(() => {
    setIsSpeakerModalOpen(false);
    setSelectedSpeaker(null);
  }, []);

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

  const isUpcoming = isEventUpcoming(event.date);

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
          <div className="w-full h-96 relative bg-gray-100">
            {event.image && !imageError ? (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <p className="text-gray-500 mb-2">No Image Available</p>
                  <p className="text-sm text-gray-400">Please update the event with a valid image URL</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-8">
            <h1 className="text-4xl font-bold text-black mb-4">{event.title}</h1>
            
            {/* Event Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-black font-medium">Date</p>
                  <p className="font-semibold text-black">
                    {format(new Date(event.date), 'PPP')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-black font-medium">Time</p>
                  <p className="font-semibold text-black">{event.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-black font-medium">Location</p>
                  <p className="font-semibold text-black">{event.location}</p>
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

            {/* Speakers Section */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">Event Speakers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {event.speakers.map((speaker, index) => (
                    <SpeakerCard 
                      key={index} 
                      speaker={speaker} 
                      onClick={() => handleSpeakerClick(speaker)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Registration Button and Form */}
            {isUpcoming && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full md:w-auto bg-black text-white hover:bg-gray-800 transition-colors">
                    Register for Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white max-w-md text-black mx-auto">
                  <DialogHeader>
                    <DialogTitle className="text-black">Register for {event.title}</DialogTitle>
                    <DialogDescription className="text-black">
                      Fill out the form below to register for this event.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your 10-digit phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="githubAccount">GitHub Profile (Optional)</Label>
                      <Input
                        id="githubAccount"
                        name="githubAccount"
                        value={formData.githubAccount}
                        onChange={handleInputChange}
                        placeholder="https://github.com/username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedinId">LinkedIn Profile</Label>
                      <Input
                        id="linkedinId"
                        name="linkedinId"
                        value={formData.linkedinId}
                        onChange={handleInputChange}
                        required
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="portfolio">Portfolio Website (Optional)</Label>
                      <Input
                        id="portfolio"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        placeholder="https://your-portfolio.com"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-black text-white hover:bg-gray-800"
                      disabled={isRegistering}
                    >
                      {isRegistering ? 'Registering...' : 'Submit Registration'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>

      {/* Speaker Modal */}
      <SpeakerModal
        speaker={selectedSpeaker}
        isOpen={isSpeakerModalOpen}
        onClose={handleCloseSpeakerModal}
      />
    </div>
  );
}

export default EventDetails;