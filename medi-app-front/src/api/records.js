import axios from "./axios";

export const getRecordsRequest = () => axios.get("/records");

export const getRecordRequest = (id) => axios.get(`/records/${id}`);

export const createRecordRequest = (record) =>
    axios.post("/records", record);

export const updateRecordRequest = (id, record) =>
    axios.put(`/records/${id}`, record);

export const deleteRecordRequest = (id) =>
    axios.delete(`/records/${id}`);
