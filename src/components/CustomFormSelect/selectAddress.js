import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
// import { getLocation } from "../../app/api/address";
import PropTypes from "prop-types";
import { getCities, getDistrics, getProvinces, getVillage } from "../../app/api/address";

export default function SelectAddress({ location, code, onChange, isInvalid, value }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (location === "provinsi") {
      getProvinces().then(({ data }) => setLocations(data.provinsi));
    } else if (location === "kabupaten") {
      getCities(code).then((data) => setLocations(data.data.kota_kabupaten));
    } else if (location === "kecamatan") {
      getDistrics(code).then((data) => setLocations(data.data.kecamatan));
    } else if (location === "kelurahan") {
      getVillage(code).then((data) => setLocations(data.data.kelurahan));
    }
  }, [location, code]);

  return (
    <Form.Select disabled={locations.length === 0} onChange={(e) => onChange(e.target.value)} isInvalid={isInvalid} defaultValue="">
      <option value="">Pilih lokasi...</option>
      {locations.map((location, i) => (
        <option value={JSON.stringify({ label: location.nama, value: location.id })} key={i}>
          {location.nama}
        </option>
      ))}
    </Form.Select>
  );
}

SelectAddress.defaultProps = {
  location: "provinsi",
  isInvalid: false,
  value: "",
};

SelectAddress.propTypes = {
  location: PropTypes.oneOf(["provinsi", "kabupaten", "kecamatan", "kelurahan"]).isRequired,
  code: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};
