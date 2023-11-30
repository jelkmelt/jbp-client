import data from "@/static/data";

export const getCitiesByState = (stateValue) => {
  const element = data.find((item) => {
    const matchingState = item.stateWithCity.find(
      (state) => state.name === stateValue
    );
    return matchingState !== undefined;
  });

  if (element) {
    const matchingState = element.stateWithCity.find(
      (state) => state.name === stateValue
    );
    // return matchingState.cities.map((city) => city.name);
    return matchingState.cities.map((city) => city.routeLink);
  }

  return [];
};
