import React from "react";
import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";

const App2 = props => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(function(pos) {
      setLat(pos.coords.latitude);
      setLng(pos.coords.longitude);
    });
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
        defaultCenter={{
          lat: 49.28273,
          lng: -123.120735
        }}
        defaultZoom={11}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "#0000FF"
          }}
          lat={lat}
          lng={lng}
        ></div>
      </GoogleMapReact>
    </div>
  );
};
export default App2;
