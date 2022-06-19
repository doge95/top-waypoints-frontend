import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import "./styles.css";

export default function App() {
  // select sid or start
  const [value, setValue] = React.useState("sids");
  const handleChange = val => setValue(val);

  // get airports
  const [airports, setAirports] = React.useState([]);
  const [airport, setAirport] = React.useState();

  React.useEffect(() => {
    async function getAirports() {
      const response = await fetch("http://topwaypoints:8088/getAirports");
      const body = await response.json();
      setAirports(body);
      console.log(body);
    }
    getAirports();
  }, []);

  // get top waypoints
  const [data, setData] = React.useState([]);

  const handleClick = () => {
    fetch(`http://topwaypoints:8088/getTopWaypoints?icao=${encodeURIComponent(airport)}&type=${encodeURIComponent(value)}`)
      .then((response) => response.json())
      .then((json) => {
        setData(json)
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="container mt-2">
        <h3>Get Top Waypoints</h3>
      </div>         
      <div className="container mt-2">
        <Form.Control as="select" value={airport} onChange={(e) => {setAirport(e.target.value)}}>
          <option value="airport">Select an Airport</option>;
          {airports.map((airport) => {
            const { name, icao } = airport;
            return <option value={icao}>{name}</option>;
          })}
        </Form.Control>
      </div>
      
      <div className="container mt-2">
        <h5>Choose SID or STAR</h5>
      </div>   

      <div className="container mt-2">
        <ToggleButtonGroup
          name="type"
          type="radio"
          value={value}
          onChange={handleChange}
        >
          <ToggleButton variant="outline-info" value="sids">SID</ToggleButton>
          <ToggleButton variant="outline-info" value="stars">STAR</ToggleButton>
        </ToggleButtonGroup>
      </div>
      
      <div className="container mt-2">
        <Button variant="success" onClick={handleClick}> Load Data </Button>
        {
            data.map((waypoint) => (
              <div className="container mt-3">
                {waypoint.name} {waypoint.count}
              </div>
            )
        )}
    </div>
    </>
  );
}
