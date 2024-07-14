import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import FlightsService from "../api/Flights";
import { Flight } from "../types";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import NavBar from "../components/navbar";
import { PlaneIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultSearch = searchParams.get("searchBy") || "";
  const queryClient = useQueryClient();
  const [searchBy, setSearchBy] = useState(defaultSearch);

  const {
    isPending: isFlightsPending,
    isError: isFlightsError,
    data: flights,
    error: flightsError,
  } = useQuery<Flight[]>({
    queryKey: ["flights"],
    queryFn: FlightsService.getAll,
  });

  if (isFlightsPending) {
    return <span>Loading...</span>;
  }

  if (isFlightsError) {
    return <span>Error: {flightsError.message}</span>;
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchBy(value);
  };
  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    queryClient.invalidateQueries({ queryKey: ["flights"] });
    setSearchParams({
      ...searchParams,
      searchBy: searchBy,
    });
  };
  return (
    <>
    <div>
      <NavBar />
      <form
        onSubmit={handleSubmitSearch}
        className="flex gap-3 w-full md:w-1/2 mt-5 mb-5 mx-auto"
      >
        <Input
          type="search"
          placeholder="Search for a Flights"
          value={searchBy}
          onChange={handleChange}
          className="flex-grow"
        />
        <Button type="submit" className="flex-shrink-0">
          Search
        </Button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {flights.map(flight => (
          <Card
            key={flight.id}
            className="w-full max-w-md bg-white border border-muted rounded-lg"
          >
            <CardContent className="p-6 grid gap-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-lg">{flight.name}</div>
                <div className="text-muted-foreground">
                  <PlaneIcon className="w-5 h-5 inline-block mr-1" />
                  Direct
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-muted-foreground text-sm">Departure</div>
                  <div className="font-medium">{flight.from}</div>
                  <div className="text-muted-foreground text-sm">
                    {flight.departuerTime}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">Arrival</div>
                  <div className="font-medium">{flight.to}</div>
                  <div className="text-muted-foreground text-sm">
                    {flight.departuerTime}
                  </div>
                </div>
              </div>
              <Button className="w-full">Book Flight</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
    </>
  );
}
