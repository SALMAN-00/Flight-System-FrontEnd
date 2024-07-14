import api from ".";
import { Flight } from "../types";

export default {
  getAll: async () => {
    try {
      const res = await api.get("/Flights");
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  },
  createOne: async (flight: Flight) => {
    try {
      const res = await api.post("/flights", flight);
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  },
  deleteOne: async (id: number) => {
    try {
      const res = await api.delete(`/flights/${id}`);
      return res.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error("Something went wrong"));
    }
  },
};
