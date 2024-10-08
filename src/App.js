import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { CiHospital1 } from "react-icons/ci";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./App.css";
import Logo from "./assets/MEDIWAIT.png";
import MedicalBag from "./assets/b1790f58bbd3f462f2cb9d364e48e33b.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const hospitals = [
  {
    id: 1,
    name: "Hôpital Paris Centre",
    lat: 48.8566,
    lng: 2.3522,
    waitTime: 120,
  },
  {
    id: 2,
    name: "Hôpital Villeurbanne",
    lat: 45.764,
    lng: 4.8357,
    waitTime: 90,
  },
  { id: 3, name: "Hôpital Toulouse", lat: 43.6045, lng: 1.4442, waitTime: 110 },
];

function App() {
  return (
    <div className="App">
      {/* Header with Logo */}
      <header className="app-header">
        <img src={Logo} alt="MediWait Logo" className="logo" />
        <h1>MediWait</h1>
      </header>

      {/* Main Section with map and medical bag */}
      <section className="main-content">
        <p>Suivez le temps d'attente aux urgences en temps réel.</p>

        <div className="content-wrapper">
          {/* Left side: Map */}
          <div className="map-container">
            <MapContainer
              center={[48.8566, 2.3522]}
              zoom={6}
              scrollWheelZoom={false}
              className="map"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              {hospitals.map((hospital) => (
                <Marker
                  key={hospital.id}
                  position={[hospital.lat, hospital.lng]}
                >
                  <Popup className="custom-popup">
                    <div className="popupTimer">{hospital.waitTime} min</div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <CiHospital1 size={20} style={{ marginRight: "10px" }} />
                      <span>{hospital.name}</span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Right side: Medical bag image */}
          <div className="medical-image">
            <img src={MedicalBag} alt="Emergency Medical Bag" />
          </div>
        </div>

        {/* Button to view the map */}
      </section>

      {/* Footer Section */}
      <footer>
        <div className="footer-section">
          <div>
            <h4>Nous Contacter</h4>
            <p>Email: contact@mediwait.com</p>
          </div>
          <div>
            <h4>Confidentialités</h4>
            <p>A propos</p>
          </div>
          <div>
            <h4>Adresse</h4>
            <p>1234 Rue de l'Hôpital, Paris</p>
          </div>
          <div>
            <h4>Téléphone</h4>
            <p>01 23 45 67 89</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
