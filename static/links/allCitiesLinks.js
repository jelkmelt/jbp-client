import data from "../data";

export const allCitiesLinks = data.flatMap((country) =>
  country.stateWithCity.flatMap((state) =>
    state.cities.flatMap((city) => city.routeLink)
  )
);
