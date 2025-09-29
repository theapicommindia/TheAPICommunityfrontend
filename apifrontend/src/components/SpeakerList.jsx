import { useState, useEffect } from 'react';
import { ENDPOINTS } from '../config/api';

export default function SpeakerList() {
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await fetch(ENDPOINTS.SPEAKERS);
        const data = await response.json();
        setSpeakers(data);
      } catch (error) {
        console.error('Error fetching speakers:', error);
      }
    };

    fetchSpeakers();
  }, []);

  return (
    <div>
      {/* Your speaker list rendering logic */}
    </div>
  );
} 