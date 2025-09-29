import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { eventAPI } from '../../config/api';
import { Calendar, Clock, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { cn } from '../../lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { Button } from '../../components/ui/button';
import { CalendarIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

// Image compression function
const compressImage = (file) => {
  return new Promise((resolve, reject) => {
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
        const maxDimension = 1200; // Max width or height
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
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to JPEG with quality 0.7
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        resolve(compressedDataUrl);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
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
    availableSeats: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
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
        // Create a temporary URL for preview
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        
        // Compress the image
        const compressedImage = await compressImage(file);
        setFormData(prev => ({
          ...prev,
          image: compressedImage
        }));
      } catch (error) {
        console.error('Error processing image:', error);
        toast.error('Error processing image. Please try again.');
      }
    }
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      date
    }));
    setShowCalendar(false);
  };

  const handleTimeChange = (value) => {
    setFormData(prev => ({
      ...prev,
      time: value
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error('Please enter an event title');
      return false;
    }
    if (!formData.description.trim()) {
      toast.error('Please enter a short description');
      return false;
    }
    if (!formData.time) {
      toast.error('Please select an event time');
      return false;
    }
    if (!formData.location.trim()) {
      toast.error('Please enter an event location');
      return false;
    }
    if (!formData.availableSeats || formData.availableSeats < 1) {
      toast.error('Please enter a valid number of available seats');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
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
        availableSeats: parseInt(formData.availableSeats),
        image: formData.image
      };

      console.log('Submitting event data:', eventData);

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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Event</h2>
          
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
                    onClick={() => setShowCalendar(true)}
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
                      minDate={new Date()}
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
              <input
                type="text"
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-base py-3 px-4"
              />
            </div>

            <div>
              <label htmlFor="availableSeats" className="block text-sm font-medium text-gray-700">
                Available Seats
              </label>
              <input
                type="number"
                id="availableSeats"
                name="availableSeats"
                required
                min="1"
                value={formData.availableSeats}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-base py-3 px-4"
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

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/admin')}
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