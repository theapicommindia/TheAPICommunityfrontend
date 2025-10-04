import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { eventAPI, authAPI } from '../../config/api';
import { Calendar, Clock, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { cn } from '../../lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { Button } from '../../components/ui/button';
import { CalendarIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import LocationInput from '../LocationInput';

// Optimized image compression function
const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    // Use requestIdleCallback for better performance
    const processImage = () => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Calculate new dimensions while maintaining aspect ratio
          const maxDimension = 800; // Reduced from 1200 for faster processing
          if (width > height && width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          
          // Use faster image rendering
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'medium';
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to JPEG with lower quality for faster processing
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6);
          resolve(compressedDataUrl);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if (window.requestIdleCallback) {
      window.requestIdleCallback(processImage);
    } else {
      setTimeout(processImage, 0);
    }
  });
};

// Generate time options in 24-hour format
const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      times.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  return times;
};

const timeOptions = generateTimeOptions();

const CreateEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    detailedDescription: '',
    date: new Date(),
    time: '',
    location: '',
    image: null,
    speakers: []
  });

  const handleChange = React.useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleImageChange = React.useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    try {
      // Create a temporary URL for preview immediately
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      
      // Compress the image asynchronously to avoid blocking UI
      const compressedImage = await compressImage(file);
      setFormData(prev => ({
        ...prev,
        image: compressedImage
      }));
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Error processing image. Please try again.');
    }
  }, []);

  const handleDateChange = React.useCallback((date) => {
    setFormData(prev => ({
      ...prev,
      date
    }));
    setShowCalendar(false);
  }, []);

  const handleTimeChange = React.useCallback((value) => {
    setFormData(prev => ({
      ...prev,
      time: value
    }));
  }, []);

  const addSpeaker = React.useCallback(() => {
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
  }, []);

  const removeSpeaker = React.useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      speakers: prev.speakers.filter((_, i) => i !== index)
    }));
  }, []);

  const updateSpeaker = React.useCallback((index, field, value) => {
    setFormData(prev => ({
      ...prev,
      speakers: prev.speakers.map((speaker, i) => 
        i === index ? { ...speaker, [field]: value } : speaker
      )
    }));
  }, []);

  const validateForm = () => {
    if (!formData.title || !formData.title.trim()) {
      toast.error('Please enter an event title');
      return false;
    }
    if (!formData.description || !formData.description.trim()) {
      toast.error('Please enter a short description');
      return false;
    }
    if (!formData.time) {
      toast.error('Please select an event time');
      return false;
    }
    if (!formData.location || !formData.location.trim()) {
      toast.error('Please enter an event location');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Check if admin token exists
    const token = localStorage.getItem('adminToken');
    if (!token) {
      toast.error('Please login as admin first');
      navigate('/admin/login');
      return;
    }

    console.log('Admin token exists:', !!token);
    console.log('Token preview:', token ? token.substring(0, 20) + '...' : 'No token');

    // Verify token is still valid
    try {
      await authAPI.verifyToken();
      console.log('Token is valid');
    } catch (error) {
      console.error('Token verification failed:', error);
      toast.error('Session expired. Please login again.');
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
      return;
    }

    setLoading(true);

    try {
      // Create the event data object
      const eventData = {
        title: formData.title,
        description: formData.description,
        detailedDescription: formData.detailedDescription,
        date: formData.date.toISOString(),
        time: formData.time,
        location: formData.location,
        image: formData.image,
        speakers: formData.speakers
      };

      console.log('Submitting event data:', eventData);
      console.log('Form data:', formData);

      const response = await eventAPI.createEvent(eventData);
      
      // Clean up the preview URL
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      
      toast.success('Event created successfully!', {
        description: 'Your event has been created and is now visible to users.',
        duration: 5000,
      });
      
      navigate('/event');
    } catch (err) {
      console.error('Error creating event:', err);
      toast.error('Failed to create event', {
        description: err.message || 'Please try again later',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="min-h-screen bg-gray-100 text-black py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create New Event</h2>
            <button
              onClick={() => {
                localStorage.removeItem('adminToken');
                navigate('/admin/login');
              }}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Event Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-base py-3 px-4"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Short Description
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-base py-3 px-4"
              />
            </div>

            <div>
              <label htmlFor="detailedDescription" className="block text-sm font-medium text-gray-700">
                Detailed Description
              </label>
              <textarea
                id="detailedDescription"
                name="detailedDescription"
                value={formData.detailedDescription}
                onChange={handleChange}
                rows={5}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-base py-3 px-4"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={format(formData.date, 'PPP')}
                    onClick={React.useCallback(() => setShowCalendar(true), [])}
                    readOnly
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                {showCalendar && (
                  <div className="absolute z-10 mt-1 bg-white shadow-lg rounded-md">
                    <CalendarComponent
                      onChange={handleDateChange}
                      value={formData.date}
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">
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
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Image
              </label>
              <div 
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-500"
                onClick={() => document.getElementById('image-upload').click()}
              >
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 focus-within:outline-none  focus-within:ring-offset-2 "
                    >
                      <span>Upload a file</span>
                      <input
                        id="image-upload"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Event preview"
                    className="max-w-full h-48 object-cover rounded-md"
                  />
                </div>
              )}
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
                onClick={React.useCallback(() => navigate('/admin'), [navigate])}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent; 