import NavBar from "../components/navbar";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Flight, Passenger } from "@/types";
import FlightsService from "../api/Flights";
import PassengersService from "../api/Passengers";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const queryClient = useQueryClient();

  const {
    isPending: isFlightsPending,
    isError: isFlightsError,
    data: flights,
    error: flightsError,
  } = useQuery<Flight[]>({
    queryKey: ["flights"],
    queryFn: FlightsService.getAll,
  });

  const {
    isPending: isPassengersPending,
    isError: isPassengersError,
    data: passengers,
    error: passengersError,
  } = useQuery<Passenger[]>({
    queryKey: ["passengers"],
    queryFn: PassengersService.getAll,
  });

  if (isFlightsPending || isPassengersPending) {
    return <span>Loading...</span>;
  }

  if (isFlightsError) {
    return <span>Error: {flightsError.message}</span>;
  }
  if (isPassengersError) {
    return <span>Error: {passengersError.message}</span>;
  }

  const handleDeleteFlight = async (id: number) => {
    await FlightsService.deleteOne(id);
    queryClient.invalidateQueries({ queryKey: ["flights"] });
  };
  const handleDeletePassenger = async (id: number) => {
    await PassengersService.deleteOne(id);
    queryClient.invalidateQueries({ queryKey: ["passengers"] });
  };
  return (
    <>
    <div>
      <NavBar />
      <h1 className="flex justify-center">A list of All Flights.</h1>

      <div className="flex justify-end mb-2"> 
      <Button className="mr-10" variant={"default"} size={"sm"}>Add new Flight +</Button>
      </div>

      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>From</TableHead>
            <TableHead className="text-left">To</TableHead>
            <TableHead>Departure Time</TableHead>
            <TableHead className="text-left">Arrival Time</TableHead>
            <TableHead className="text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {flights.map(flight => (
          <TableBody key={flight.id}>
            <TableRow>
              <TableCell className="font-medium">{flight.id}</TableCell>
              <TableCell>{flight.name}</TableCell>
              <TableCell>{flight.from}</TableCell>
              <TableCell className="text-left">{flight.to}</TableCell>
              <TableCell>{flight.departuerTime}</TableCell>
              <TableCell className="text-left">{flight.arrivalTime}</TableCell>
              <TableCell className="text-left flex gap-5">
                <button
                  className="bg-green-500 py-2  px-3 rounded-md text-white"
                  // onClick={() => handleEditFlight(flight.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 py-2  px-3 rounded-md text-white"
                  onClick={() => handleDeleteFlight(flight.id)}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>

      <h1 className="flex justify-center">A list of All Passengers.</h1>
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead className="text-left">Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-left">flight id</TableHead>
            <TableHead className="text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {passengers.map(passenger => (
          <TableBody key={passenger.id}>
            <TableRow>
              <TableCell className="font-medium">{passenger.id}</TableCell>
              <TableCell>{passenger.firstName}</TableCell>
              <TableCell>{passenger.lastName}</TableCell>
              <TableCell className="text-left">{passenger.email}</TableCell>
              <TableCell>{passenger.phone}</TableCell>
              <TableCell className="text-left">{passenger.flightId}</TableCell>
              <TableCell className="text-left flex gap-5">
                <button
                  className="bg-green-500 py-2  px-3 rounded-md text-white"
                  // onClick={() => handleEditFlight(flight.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 py-2  px-3 rounded-md text-white"
                  onClick={() => handleDeletePassenger(passenger.id)}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
      

    </div>
    </>
  );
}
