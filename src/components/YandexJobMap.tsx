
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Job } from '@/data/mockJobs';

interface YandexJobMapProps {
  jobs: Job[];
  selectedJob?: Job;
  onJobSelect?: (job: Job) => void;
  height?: string;
}

declare global {
  interface Window {
    ymaps3: any;
  }
}

const YandexJobMap = ({ jobs, selectedJob, onJobSelect, height = '400px' }: YandexJobMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapRef.current) {
        console.log('Map container not ready');
        return;
      }

      if (!window.ymaps3) {
        console.log('Yandex Maps API not loaded');
        setError('API Яндекс карт не загружено');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        await window.ymaps3.ready;
        console.log('Yandex Maps API ready');

        const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = window.ymaps3;

        // Clear existing map if any
        if (mapInstanceRef.current) {
          mapInstanceRef.current.destroy?.();
          mapInstanceRef.current = null;
        }

        // Clear existing markers
        markersRef.current = [];

        // Calculate center and zoom based on jobs
        let center = [37.6176, 55.7558]; // Default Moscow center
        let zoom = 10;

        if (jobs.length > 0) {
          const latitudes = jobs.map(job => job.coords.lat);
          const longitudes = jobs.map(job => job.coords.lng);
          
          const minLat = Math.min(...latitudes);
          const maxLat = Math.max(...latitudes);
          const minLng = Math.min(...longitudes);
          const maxLng = Math.max(...longitudes);
          
          center = [(minLng + maxLng) / 2, (minLat + maxLat) / 2];
          
          // Calculate zoom based on bounds
          const latDiff = maxLat - minLat;
          const lngDiff = maxLng - minLng;
          const maxDiff = Math.max(latDiff, lngDiff);
          
          if (maxDiff < 0.01) zoom = 14;
          else if (maxDiff < 0.05) zoom = 12;
          else if (maxDiff < 0.1) zoom = 11;
          else if (maxDiff < 0.5) zoom = 9;
          else zoom = 8;
        }

        // Create map
        mapInstanceRef.current = new YMap(mapRef.current, {
          location: {
            center: center,
            zoom: zoom
          }
        });

        // Add layers
        mapInstanceRef.current.addChild(new YMapDefaultSchemeLayer());
        mapInstanceRef.current.addChild(new YMapDefaultFeaturesLayer({ id: 'features' }));

        // Add markers for each job
        jobs.forEach((job) => {
          const isSelected = selectedJob?.id === job.id;
          
          // Create marker element
          const markerElement = document.createElement('div');
          markerElement.style.cssText = `
            width: 40px;
            height: 40px;
            background: ${isSelected ? '#EF4444' : '#3B82F6'};
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: relative;
            transition: all 0.2s ease;
          `;

          const innerDot = document.createElement('div');
          innerDot.style.cssText = `
            width: 10px;
            height: 10px;
            background: white;
            border-radius: 50%;
          `;
          markerElement.appendChild(innerDot);

          // Add animation for selected marker
          if (isSelected) {
            const pulse = document.createElement('div');
            pulse.style.cssText = `
              position: absolute;
              top: -3px;
              left: -3px;
              right: -3px;
              bottom: -3px;
              background: #EF4444;
              border-radius: 50%;
              animation: pulse 2s infinite;
              opacity: 0.6;
            `;
            markerElement.appendChild(pulse);
          }

          // Create marker
          const marker = new YMapMarker(
            {
              coordinates: [job.coords.lng, job.coords.lat],
              draggable: false
            },
            markerElement
          );

          mapInstanceRef.current.addChild(marker);
          markersRef.current.push(marker);

          // Add click handlers
          markerElement.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log(`Clicked on job: ${job.title} - ${job.company}`);
            
            // Call onJobSelect if provided
            if (onJobSelect) {
              onJobSelect(job);
            }
            
            // Navigate to job detail page
            navigate(`/jobs/${job.id}`);
          });

          // Add hover effect
          markerElement.addEventListener('mouseenter', () => {
            markerElement.style.transform = 'scale(1.1)';
            markerElement.style.zIndex = '1000';
            
            // Show tooltip
            const tooltip = document.createElement('div');
            tooltip.style.cssText = `
              position: absolute;
              bottom: 50px;
              left: 50%;
              transform: translateX(-50%);
              padding: 8px 12px;
              background: rgba(0, 0, 0, 0.8);
              color: white;
              border-radius: 6px;
              font-family: system-ui, -apple-system, sans-serif;
              font-size: 12px;
              white-space: nowrap;
              z-index: 1001;
              pointer-events: none;
            `;
            
            tooltip.innerHTML = `
              <div style="font-weight: 600;">${job.title}</div>
              <div style="opacity: 0.8;">${job.company}</div>
              <div style="opacity: 0.6; font-size: 11px;">${job.location}</div>
            `;
            
            markerElement.appendChild(tooltip);
          });

          markerElement.addEventListener('mouseleave', () => {
            markerElement.style.transform = 'scale(1)';
            markerElement.style.zIndex = 'auto';
            
            // Remove tooltip
            const tooltip = markerElement.querySelector('div[style*="bottom: 50px"]');
            if (tooltip) {
              tooltip.remove();
            }
          });
        });

        setIsLoading(false);
        console.log('Map initialized successfully with', jobs.length, 'job markers');
      } catch (error) {
        console.error('Error initializing map:', error);
        setError('Ошибка инициализации карты');
        setIsLoading(false);
      }
    };

    // Check if API is already loaded
    if (window.ymaps3) {
      initializeMap();
    } else {
      // Wait for API to load
      let attempts = 0;
      const maxAttempts = 50; // 5 seconds total
      
      const checkInterval = setInterval(() => {
        attempts++;
        if (window.ymaps3) {
          clearInterval(checkInterval);
          initializeMap();
        } else if (attempts >= maxAttempts) {
          clearInterval(checkInterval);
          console.error('Yandex Maps API failed to load within 5 seconds');
          setError('API Яндекс карт не удалось загрузить. Проверьте API ключ.');
          setIsLoading(false);
        }
      }, 100);

      return () => {
        clearInterval(checkInterval);
      };
    }

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.destroy?.();
        } catch (error) {
          console.error('Error destroying map:', error);
        }
        mapInstanceRef.current = null;
      }
      markersRef.current = [];
    };
  }, [jobs, selectedJob, onJobSelect, navigate]);

  if (isLoading) {
    return (
      <div 
        style={{ height, width: '100%' }} 
        className="rounded-lg overflow-hidden shadow-lg border border-gray-200 flex items-center justify-center bg-gray-50"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Загрузка карты...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        style={{ height, width: '100%' }} 
        className="rounded-lg overflow-hidden shadow-lg border border-gray-200 flex items-center justify-center bg-gray-50"
      >
        <div className="text-center p-4">
          <div className="text-red-500 mb-2">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm text-gray-600">{error}</p>
          <p className="text-xs text-gray-500 mt-1">Убедитесь, что API ключ Яндекс карт настроен корректно</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.3;
          }
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
        }
      `}</style>
      <div 
        ref={mapRef} 
        style={{ height, width: '100%' }} 
        className="rounded-lg overflow-hidden shadow-lg border border-gray-200"
      />
    </>
  );
};

export default YandexJobMap;
