import { config } from "../../config";
import axios from "axios";

export const getAddress = async () => {
  const { token } = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : {};

  return await axios.get(`${config.api_host}/api/delivery-addresses?limit=`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const getProvinces = async () => {
  return await axios.get(`https://dev.farizdotid.com/api/daerahindonesia/provinsi`);
};

export const getCities = async (id_provinsi) => {
  return await axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id_provinsi}`);
};

export const getDistrics = async (id_kota) => {
  return await axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${id_kota}`);
};

export const getVillage = async (id_kecamatan) => {
  return await axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${id_kecamatan}`);
};

export const getLocation = async (lokasi, kodeInduk) => {
  return await axios.get(`https://regions-indoneisa.herokuapp.com/api/${lokasi}?kode_induk=${kodeInduk}`);
};

export const createAddress = async (data) => {
  const { token } = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : {};

  return await axios.post(`${config.api_host}/api/delivery-addresses`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
