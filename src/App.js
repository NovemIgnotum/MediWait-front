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
      <header className="app-header">
        <img src={Logo} alt="MediWait Logo" className="logo" />
        <h1>M E D I W A I T</h1>
        <h2 className="subTitle">
          Suivez le temps d'attente aux urgences en temps réel.
        </h2>
      </header>

      <section className="main-content">
        <div className="content-wrapper">
          <div className="map-container">
            <MapContainer
              center={[46.603354, 1.888334]}
              zoom={5}
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
                    <div className="popupTimer">
                      {hospital.waitTime} min d'attente
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <CiHospital1 size={20} style={{ marginRight: "10px" }} />
                      <span>{hospital.name}</span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className="medical-image">
            <img src={MedicalBag} alt="Emergency Medical Bag" />
          </div>
        </div>
      </section>

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
