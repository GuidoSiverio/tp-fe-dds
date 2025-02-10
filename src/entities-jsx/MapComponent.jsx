import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapComponent({ markers }) {
  const buenosAiresCoordinates = [-34.60806040152385, -58.44584233622609]; // Coordenadas de Buenos Aires
  const defaultZoom = 11; // Nivel de zoom para ver toda la ciudad

  return (
    <MapContainer
      center={buenosAiresCoordinates}
      zoom={defaultZoom}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {markers &&
        markers.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>{marker.popupText}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}

export default MapComponent;

