import { createContext, useContext, useState } from "react";
import {
    createRecordRequest,
    getRecordsRequest,
    deleteRecordRequest,
    getRecordRequest,
    updateRecordRequest
} from "../api/records";

const RecordsContext = createContext();

export const useRecords = () => {
    const context = useContext(RecordsContext);

    if (!context) {
        throw new Error("useRecords must be used within a RecordsProvider");
    }

    return context;
};

export function RecordsProvider({ children }) {
    const [records, setRecords] = useState([]);

    const getRecords = async () => {
        try {
            const res = await getRecordsRequest();
            setRecords(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const createRecord = async (record) => {
        try {
            const res = await createRecordRequest(record);
            setRecords([...records, res.data]);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteRecord = async (id) => {
        try {
            const res = await deleteRecordRequest(id);
            if (res.status === 204) {
                setRecords(records.filter(record => record._id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getRecord = async (id) => {
        try {
            const res = await getRecordRequest(id);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const updateRecord = async (id, record) => {
        try {
            const res = await updateRecordRequest(id, record);
            const updatedRecords = records.map(record =>
                record._id === id ? res.data : record
            );
            setRecords(updatedRecords);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <RecordsContext.Provider
            value={{
                records,
                createRecord,
                getRecords,
                deleteRecord,
                getRecord,
                updateRecord
            }}
        >
            {children}
        </RecordsContext.Provider>
    );
}
