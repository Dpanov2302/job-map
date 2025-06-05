
import { useEffect, useRef } from 'react';

interface GoogleMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  height?: string;
  title?: string;
  company?: string;
}

declare global {
  interface Window {
    ymaps3: any;
  }
}

const GoogleMap = ({ 
  lat, 
  lng, 
  zoom = 15, 
  height = '300px', 
  title = 'Офис компании',
  company = 'Компания'
}: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapRef.current) {
        console.log('Map container not ready');
        return;
      }

      if (!window.ymaps3) {
        console.log('Yandex Maps API not loaded');
        return;
      }

      try {
        await window.ymaps3.ready;
        console.log('Yandex Maps API ready');

        const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = window.ymaps3;

        // Clear existing map if any
        if (mapInstanceRef.current) {
          mapInstanceRef.current.destroy?.();
          mapInstanceRef.current = null;
        }

        // Create map
        mapInstanceRef.current = new YMap(mapRef.current, {
          location: {
            center: [lng, lat],
            zoom: zoom
          }
        });

        // Add layers
        mapInstanceRef.current.addChild(new YMapDefaultSchemeLayer());
        mapInstanceRef.current.addChild(new YMapDefaultFeaturesLayer({ id: 'features' }));

        // Create marker element
        const markerElement = document.createElement('div');
        markerElement.style.cssText = `
          width: 32px;
          height: 32px;
          background: #3B82F6;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
        `;

        const innerDot = document.createElement('div');
        innerDot.style.cssText = `
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
        `;
        markerElement.appendChild(innerDot);

        // Create marker
        const marker = new YMapMarker(
          {
            coordinates: [lng, lat],
            draggable: false
          },
          markerElement
        );

        mapInstanceRef.current.addChild(marker);

        // Add click handler
        markerElement.addEventListener('click', () => {
          console.log(`Clicked on ${title} - ${company}`);
          
          // Create a simple tooltip/popup effect
          const tooltip = document.createElement('div');
          tooltip.style.cssText = `
            position: absolute;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            padding: 8px 12px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            white-space: nowrap;
            font-family: system-ui, -apple-system, sans-serif;
            font-size: 12px;
            z-index: 1000;
            pointer-events: none;
          `;
          
          tooltip.innerHTML = `
            <div style="font-weight: 600; color: #1f2937;">${title}</div>
            <div style="color: #6b7280;">${company}</div>
          `;
          
          markerElement.appendChild(tooltip);
          
          // Remove tooltip after 3 seconds
          setTimeout(() => {
            if (tooltip.parentNode) {
              tooltip.parentNode.removeChild(tooltip);
            }
          }, 3000);
        });

        console.log('Map initialized successfully');
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    // Check if API is already loaded
    if (window.ymaps3) {
      initializeMap();
    } else {
      // Wait for API to load
      const checkInterval = setInterval(() => {
        if (window.ymaps3) {
          clearInterval(checkInterval);
          initializeMap();
        }
      }, 100);

      // Cleanup interval after 10 seconds
      const timeout = setTimeout(() => {
        clearInterval(checkInterval);
        console.error('Yandex Maps API failed to load within 10 seconds');
      }, 10000);

      return () => {
        clearInterval(checkInterval);
        clearTimeout(timeout);
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
    };
  }, [lat, lng, zoom, title, company]);

  return (
    <div 
      ref={mapRef} 
      style={{ height, width: '100%' }} 
      className="rounded-lg overflow-hidden shadow-lg border border-gray-200"
    />
  );
};

export default GoogleMap;
