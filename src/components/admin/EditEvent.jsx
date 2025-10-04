import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { eventAPI } from "../../config/api";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LocationInput from '../LocationInput';

function EditEvent() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [loading, setLoading] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  const inputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    detailedDescription: "",
    date: new Date(),
    time: "",
    location: "",
    image: "",
    speakers: []
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await eventAPI.getEventById(eventId);
        setFormData({
          title: event.title,
          description: event.description,
          detailedDescription: event.detailedDescription || "",
          date: new Date(event.date),
          time: event.time,
          location: event.location,
          image: event.image || "",
          speakers: event.speakers || []
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event:", error);
        toast.error("Failed to load event details");
        navigate("/admin");
      }
    };

    fetchEvent();
  }, [eventId, navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date,
    }));
    setShowCalendar(false);
  };

  const handleTimeChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      time: value,
    }));
  };

  const addSpeaker = () => {
    setFormData(prev => ({
      ...prev,
      speakers: [...prev.speakers, {
        name: '',
        role: '',
        bio: '',
        linkedin: '',
        image: ''
      }]
    }));
  };

  const removeSpeaker = (index) => {
    setFormData(prev => ({
      ...prev,
      speakers: prev.speakers.filter((_, i) => i !== index)
    }));
  };

  const updateSpeaker = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      speakers: prev.speakers.map((speaker, i) => 
        i === index ? { ...speaker, [field]: value } : speaker
      )
    }));
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        date: formData.date.toISOString(),
      };
      await eventAPI.updateEvent(eventId, submitData);
      toast.success("Event updated successfully!");
      navigate("/admin");
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error(error.message || "Failed to update event");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Event</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Event Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-base py-3 px-4"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Short Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-base py-3 px-4"
              />
            </div>

            <div>
              <label
                htmlFor="detailedDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Detailed Description
              </label>
              <textarea
                id="detailedDescription"
                name="detailedDescription"
                value={formData.detailedDescription}
                onChange={handleInputChange}
                rows={5}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-base py-3 px-4"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={format(formData.date, "PPP")}
                    onClick={() => setShowCalendar(true)}
                    readOnly
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                {showCalendar && (
                  <div ref={calendarRef} className="absolute z-10 mt-1 bg-white shadow-lg rounded-md">
                    <CalendarComponent
                      onChange={handleDateChange}
                      value={formData.date}
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <Select onValueChange={handleTimeChange} value={formData.time}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-black max-h-[300px] overflow-y-auto">
                    {timeOptions.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <LocationInput
                value={formData.location}
                onChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
                placeholder="Enter event location (e.g., Pune, Maharashtra)"
                className="mt-1 text-base py-3 px-4"
              />
            </div>


            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Event Image URL
              </label>
              {formData.image && (
                <div className="mt-2 mb-4">
                  <img
                    src={formData.image}
                    alt="Current event"
                    className="h-32 w-32 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/600x400?text=No+Image+Available";
                    }}
                  />
                </div>
              )}
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-base py-3 px-4"
              />
            </div>

            {/* Speakers Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Event Speakers
                </label>
                <button
                  type="button"
                  onClick={addSpeaker}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Speaker
                </button>
              </div>
              
              {formData.speakers.map((speaker, index) => (
                <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-medium text-gray-700">Speaker {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeSpeaker(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Speaker Name
                      </label>
                      <input
                        type="text"
                        value={speaker.name}
                        onChange={(e) => updateSpeaker(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-black focus:ring-black"
                        placeholder="Enter speaker name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Role/Title
                      </label>
                      <input
                        type="text"
                        value={speaker.role}
                        onChange={(e) => updateSpeaker(index, 'role', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-black focus:ring-black"
                        placeholder="e.g., Senior Engineer, CEO"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        value={speaker.linkedin}
                        onChange={(e) => updateSpeaker(index, 'linkedin', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-black focus:ring-black"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Speaker Image URL
                      </label>
                      <input
                        type="url"
                        value={speaker.image}
                        onChange={(e) => updateSpeaker(index, 'image', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-black focus:ring-black"
                        placeholder="https://example.com/speaker-image.jpg"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Bio (Optional)
                      </label>
                      <textarea
                        value={speaker.bio}
                        onChange={(e) => updateSpeaker(index, 'bio', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-black focus:ring-black"
                        placeholder="Brief description about the speaker"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {formData.speakers.length === 0 && (
                <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-sm">No speakers added yet.</p>
                  <p className="text-xs mt-1">Click "Add Speaker" to add speakers for this event.</p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditEvent;
