import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { CiHospital1 } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
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

function App() {
  const [hospitals, setHospitals] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetching data...");
        fetch("http://localhost/php/get_hospitals_with_wait_time.php")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            setHospitals(data);
          })
          .catch((error) => {
            console.error(
              "There has been a problem with your fetch operation:",
              error
            );
          });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const mapModal = () => {
    return (
      <div
        className="modal-overlay"
        onClick={(e) => {
          if (e.target.className === "modal-overlay") {
            setOpenModal(false);
          }
        }}
      >
        <div className="modal">
          <div className="map-container-modal">
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
                  position={[hospital.latitude, hospital.longitude]}
                >
                  <Popup className="custom-popup">
                    <div className="popupTimer">
                      {Math.ceil(hospital.avg_wait_time)} min d'attente
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <CiHospital1 size={20} style={{ marginRight: "10px" }} />
                      <span>{hospital.Nom}</span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          <button className="closingModal" onClick={() => setOpenModal(false)}>
            <IoIosCloseCircleOutline
              size={40}
              style={{
                color: "white",
                backgroundColor: "#00c853",
                borderRadius: "50%",
                padding: "5px",
              }}
            />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      {openModal && mapModal()}
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
                  position={[hospital.latitude, hospital.longitude]}
                >
                  <Popup className="custom-popup">
                    <div className="popupTimer">
                      {Math.ceil(hospital.avg_wait_time)} min d'attente
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <CiHospital1 size={20} style={{ marginRight: "10px" }} />
                      <span>{hospital.Nom}</span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            <button className="view-map-btn" onClick={() => setOpenModal(true)}>
              Voir la carte
            </button>
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
