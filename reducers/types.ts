export type UserType = {
  email?: string;
  name?: string;
  surname?: string;
  phone?: string;
  isLogged?: boolean;
  avatar?: string;
  role?: "user" | "organization";
  geoLocation?: UserGeoLocationType;
};

export type RootReducerType = {
  user: UserType;
};

export type UserGeoLocationType = {
  latitude: number;
  longitude: number;
  radius: number;
};
