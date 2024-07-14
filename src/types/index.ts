export type Flight = {
    id: number,
    name : string,
    from: string,
    to: string,
    departuerTime:string,
    arrivalTime: string,
    }

    export type Passenger = {
        id : number,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        flightId:number
    }
    