const initState = {
  isLogged: false,
  name: "Bartłomiej Babula",
  email: "bartlomiej.babula@gmail.com",
  phone: "533131199",
};

export const userReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "test": {
      return {
        ...state,
        ...action.payload,
        isLogged: true,
        page: 1,
      };
    }
    //   case USER_LOGGED_IN: {
    //     return {
    //       ...state,
    //       ...action.payload,
    //       isLogged: true,
    //       page: 1,
    //     };
    //   }
    default:
      return state;
  }
};
