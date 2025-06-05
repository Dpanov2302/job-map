
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Job } from '@/data/mockJobs';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface JobMapProps {
  jobs: Job[];
  selectedJob?: Job;
  onJobSelect?: (job: Job) => void;
  height?: string;
}

const JobMap = ({ jobs, selectedJob, onJobSelect, height = '400px' }: JobMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    mapInstanceRef.current = L.map(mapRef.current).setView([55.7558, 37.6176], 10);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapInstanceRef.current);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Add markers for jobs
    jobs.forEach(job => {
      const isSelected = selectedJob?.id === job.id;
      
      const customIcon = L.divIcon({
        html: `
          <div class="relative">
            <div class="w-8 h-8 rounded-full ${isSelected ? 'bg-red-500' : 'bg-blue-500'} 
                        border-2 border-white shadow-lg flex items-center justify-center">
              <div class="w-3 h-3 bg-white rounded-full"></div>
            </div>
            ${isSelected ? '<div class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>' : ''}
          </div>
        `,
        className: 'custom-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([job.coords.lat, job.coords.lng], { icon: customIcon })
        .addTo(mapInstanceRef.current!)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold text-sm">${job.title}</h3>
            <p class="text-xs text-gray-600">${job.company}</p>
            <p class="text-xs text-gray-500">${job.location}</p>
          </div>
        `);

      if (onJobSelect) {
        marker.on('click', () => onJobSelect(job));
      }

      markersRef.current.push(marker);
    });

    // Fit map to show all markers
    if (jobs.length > 0) {
      const group = new L.FeatureGroup(markersRef.current);
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [jobs, selectedJob, onJobSelect]);

  return (
    <div 
      ref={mapRef} 
      style={{ height }} 
      className="rounded-lg overflow-hidden shadow-lg border border-gray-200"
    />
  );
};

export default JobMap;
