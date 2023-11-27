// MapComponent.tsx

import React, { useEffect } from 'react';

// Define marker data
interface Place {
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
    title?: string;
    photo?: string;
}

const markerData: Place[] = [
    {
        geometry: {
            location: {
                lat: 45.425,
                lng: -75.694,
            },
        },
        title: "Place 1",
        photo: "https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        geometry: {
            location: {
                lat: 45.426,
                lng: -75.696,
            },
        },
        title: "Place 2",
        photo: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    // Add more marker data as needed
];

const MapComponent: React.FC = () => {
    // Define the Google Maps API key

    useEffect(() => {
        if (window.google && window.google.maps) {
            console.log('Google Maps API loaded successfully');
        } else {
            console.error('Google Maps API is not available');
        }

        // Define the map
        const map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: {
                lat: 45.424721,
                lng: -75.695000,
            },
            mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        });

        let currentInfoWindow: google.maps.InfoWindow | null = null;

        // Function to close the info window
        const closeInfoWindow = () => {
            if (currentInfoWindow) {
                currentInfoWindow.close();
                currentInfoWindow = null;
            }
        };

        // Add click event listener to the map to close the info window
        map.addListener('click', closeInfoWindow);

        // Fetch data from the Places API
        markerData.forEach((place: Place) => {
            const { geometry, title, photo } = place;
            const { lat, lng } = geometry.location;

            const marker = new window.google.maps.Marker({
                position: new window.google.maps.LatLng(lat, lng),
                map,
                title,
            });

            // Add custom info window
            if (title || photo) {
                const infoWindowContent = `
                <div>
                    ${title ? `<h3>${title}</h3>` : ''}
                    ${photo ? `<img src="${photo}" alt="Place Photo" style="max-width: auto; Height:40vh" />` : ''}
                </div>
            `;
                const infoWindow = new window.google.maps.InfoWindow({
                    content: infoWindowContent,
                });

                marker.addListener('click', () => {
                    closeInfoWindow(); // Close any open info window

                    infoWindow.open(map, marker);
                    currentInfoWindow = infoWindow;
                });
            }
        });

        // Cleanup: remove click event listener when the component is unmounted
        return () => {
            window.google.maps.event.clearListeners(map, 'click');
        };

    }, []);



    return <div id="map" style={{ height: '100vh', width: '100%' }} />;
};

export default MapComponent;
