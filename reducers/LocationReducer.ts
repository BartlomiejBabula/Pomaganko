const testState = [
  { city: "Bielsko-Biała", provinces: "Śląskie", community: "Bielsko-Biała" },
  { city: "Wrocław", provinces: "Dolnośląskie", community: "Wrocław" },
  {
    city: "Bydgoszcz",
    provinces: "Kujawsko-Pomorskie",
    community: "Toruńskie",
  },
  { city: "Kozy", provinces: "Ślaskie", community: "bielskie" },
  { city: "Brzeszcze", provinces: "Ślaskie", community: "bielskie" },
  { city: "Bartkowice", provinces: "Mazowieckie", community: "warszawskie" },
  {
    city: "Boguszowice",
    provinces: "Kujawskopomorskie",
    community: "gdańskie",
  },
  { city: "Bogucko", provinces: "Warmińsko-mazurskie", community: "boguckie" },
];

export const locationReducer = (state = testState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};
