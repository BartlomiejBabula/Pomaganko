export type UserType = {
  email?: string;
  name?: string;
  phone?: string;
  isLogged: boolean;
  avatar?: string;
};

export type RootReducerType = {
  user: UserType;
};
