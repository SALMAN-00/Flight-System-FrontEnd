import api from ".";
import { Passenger } from "../types";

export default {
  getAll: async () => {
    try {
      const res = await api.get("/Passengers");
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  },
  createOne: async (flightId: number, passenger: Passenger) => {
    try {
      const res = await api.post("/passengers/${flightId}", passenger);
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  },
  deleteOne: async (id: number) => {
    try {
      const res = await api.delete(`/passengers/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  },
};
