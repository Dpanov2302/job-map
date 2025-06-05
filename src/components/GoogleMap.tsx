
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
      if (!mapRef.current || !window.ymaps3) return;

      await window.ymaps3.ready;

      const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = window.ymaps3;

      mapInstanceRef.current = new YMap(mapRef.current, {
        location: {
          center: [lng, lat],
          zoom: zoom
        }
      });

      mapInstanceRef.current.addChild(new YMapDefaultSchemeLayer());
      mapInstanceRef.current.addChild(new YMapDefaultFeaturesLayer({ id: 'features' }));

      // Создаем маркер
      const { YMapMarker } = window.ymaps3;
      
      const markerElement = document.createElement('div');
      markerElement.innerHTML = `
        <div style="
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
        ">
          <div style="
            width: 8px;
            height: 8px;
            background: white;
            border-radius: 50%;
          "></div>
        </div>
      `;

      const marker = new YMapMarker(
        {
          coordinates: [lng, lat],
          draggable: false
        },
        markerElement
      );

      mapInstanceRef.current.addChild(marker);

      // Добавляем popup при клике на маркер
      markerElement.addEventListener('click', () => {
        const popupContent = `
          <div style="
            padding: 12px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            max-width: 200px;
            font-family: system-ui, -apple-system, sans-serif;
          ">
            <h3 style="
              margin: 0 0 8px 0;
              font-size: 14px;
              font-weight: 600;
              color: #1f2937;
            ">${title}</h3>
            <p style="
              margin: 0;
              font-size: 12px;
              color: #6b7280;
            ">${company}</p>
          </div>
        `;
        
        console.log(`${title} - ${company}`);
      });
    };

    if (window.ymaps3) {
      initializeMap();
    } else {
      // Ждем загрузки API
      const checkYmaps = setInterval(() => {
        if (window.ymaps3) {
          clearInterval(checkYmaps);
          initializeMap();
        }
      }, 100);

      return () => clearInterval(checkYmaps);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy?.();
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
