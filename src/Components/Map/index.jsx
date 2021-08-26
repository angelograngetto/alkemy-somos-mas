import React, { useState, useEffect } from 'react';
import { Center, Text } from '@chakra-ui/react';
import { SpinnerComponent } from '../Spinner/SpinnerComponent';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const Map = ({ address = 'Cordoba, Argentina', markerTitle = 'Without title' }) => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [coords, setCoords] = useState([-32, -63]);
  const provider = new OpenStreetMapProvider();

  useEffect(() => {
    setLoading(true);
    // this function gets coords using the address passed in props
    const getCoords = async () => {
      try {
        const results = await provider.search({ query: address });
        setCoords([results[0].y, results[0].x]);
        setLoading(false);
      } catch {
        setLoading(false);
        setError('Hubo un error al realizar la petición.');
      }
    };
    getCoords();
  }, [address]);

  if (isLoading)
    return (
      <Center>
        <SpinnerComponent />
      </Center>
    );

  if (error) return <Text align="center">{error}</Text>;

  return (
    <MapContainer
      center={coords}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '100%' }}
      zoom={13}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={coords}>
        <Popup>
          {markerTitle} - {address}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
