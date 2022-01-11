export type UserData = {
  cycle: number;
  cycleX: number;
  cycleY: number;
  endDate: string;
  period: number;
  periodLength: number;
  startDate: string;
};

export type PassengersData = {
  airline: AirlineData[];
  name: string;
  trips: number;
  __v: number;
  _id: string;
};

export type AirlineData = {
  country: string;
  established: string;
  head_quaters: string;
  id: number;
  logo: string;
  name: string;
  slogan: string;
  website: string;
};
