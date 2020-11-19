import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { BiCurrentLocation } from "react-icons/bi";
import "./App.css";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import * as parkData from "./data/washroom.json"; //skateboard-parks
import mapStyles from "./mapStyles";
import Header from "./components/header";

function Map() {
  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const handleClick = e => {
    const watchId = navigator.geolocation.watchPosition(function(pos) {
      setLat(pos.coords.latitude);
      setLng(pos.coords.longitude);
    });
    return () => navigator.geolocation.clearWatch(watchId);
  };
  return (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: 49.28273, lng: -123.120735 }}
      defaultOptions={{ styles: mapStyles }}
    >
      <Marker
        position={{
          lat: lat,
          lng: lng
        }}
        icon={{
          url: `/circle.png`,
          scaledSize: new window.google.maps.Size(20, 20)
        }}
      />
      {parkData.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          position={{
            lat: park.geometry.coordinates[1],
            lng: park.geometry.coordinates[0]
          }}
          onClick={() => {
            setSelectedPark(park);
          }}
          icon={{
            url: `/restroom.png`,
            scaledSize: new window.google.maps.Size(25, 25)
          }}
        />
      ))}

      {selectedPark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPark(null);
          }}
          position={{
            lat: selectedPark.geometry.coordinates[1],
            lng: selectedPark.geometry.coordinates[0]
          }}
        >
          <Card style={{ width: "10rem" }}>
            <Card.Img
              style={{ width: "100%" }}
              variant="top"
              src={selectedPark.properties.IMAGES}
            />

            <Card.Body>
              <Card.Title>{selectedPark.properties.NAME}</Card.Title>
              <Card.Text>{selectedPark.properties.DESCRIPTIO}</Card.Text>

              <Card.Link href={selectedPark.properties.ADDRESS_MAP}>
                {" "}
                GoogleMapLink
              </Card.Link>
            </Card.Body>
          </Card>
        </InfoWindow>
      )}
      <button className="btn-position" onClick={handleClick}>
        <BiCurrentLocation size="30px" />
      </button>
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  console.log(process.env.REACT_APP_GOOGLE_KEY);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Header />
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
