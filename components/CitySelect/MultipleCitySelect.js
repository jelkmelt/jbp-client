// import {
//   Accordion,
//   AccordionItem,
//   AccordionButton,
//   AccordionPanel,
// } from "@reach/accordion";
// import "@reach/accordion/styles.css";
// import data from "@/static/data";
// import Link from "next/link";
// import { usePostState } from "@/context/postContext/postState";
// import {
//   getCountry,
//   getLocation,
//   getSingleCity,
// } from "@/context/postContext/postActions";
// import { sortByName } from "@/utils/utils";
// import { useState } from "react";

// const MultipleCitySelect = () => {
//   const [, postDispatch] = usePostState();
//   const [canada, asia, australia, europe, africa, us, latin] = data;
//   const reorderedData = [us, canada, europe, asia, australia, africa, latin];

//   const [selectedLocations, setSelectedLocations] = useState([]);

//   console.log("selectedLocations", selectedLocations);

//   // const handleLocationChange = (location) => {
//   //   const isSelected = selectedLocations.some(
//   //     (selectedLocation) => selectedLocation.state === location.state
//   //   );

//   //   if (isSelected) {
//   //     // If state is already selected, remove it
//   //     setSelectedLocations((prev) =>
//   //       prev.filter(
//   //         (selectedLocation) => selectedLocation.state !== location.state
//   //       )
//   //     );
//   //   } else {
//   //     // If state is not selected, add it and its cities
//   //     const stateCities = reorderedData
//   //       .find((item) =>
//   //         item.stateWithCity.some((state) => state.name === location.state)
//   //       )
//   //       .stateWithCity.find((state) => state.name === location.state)
//   //       .cities.map((city) => city.routeLink);

//   //     setSelectedLocations((prev) => [
//   //       ...prev,
//   //       { state: location.state, cities: stateCities },
//   //     ]);
//   //   }
//   // };

//   // const handleCityChange = (city) => {
//   //   const isSelected = selectedLocations.some((selectedLocation) =>
//   //     selectedLocation.cities.includes(city.routeLink)
//   //   );

//   //   if (isSelected) {
//   //     // If city is already selected, remove it
//   //     setSelectedLocations((prev) =>
//   //       prev.map((selectedLocation) => ({
//   //         ...selectedLocation,
//   //         cities: selectedLocation.cities.filter(
//   //           (selectedCity) => selectedCity !== city.routeLink
//   //         ),
//   //       }))
//   //     );
//   //   } else {
//   //     // If city is not selected, add it
//   //     setSelectedLocations((prev) => [
//   //       ...prev,
//   //       { state: "", cities: [city.routeLink] },
//   //     ]);
//   //   }
//   // };

//   const handleLocationChange = (location) => {
//     const isSelected = selectedLocations.some(
//       (selectedLocation) => selectedLocation.state === location.state
//     );

//     if (isSelected) {
//       // If state is already selected, remove it and its cities
//       setSelectedLocations((prev) =>
//         prev.filter(
//           (selectedLocation) => selectedLocation.state !== location.state
//         )
//       );
//     } else {
//       // If state is not selected, add it and its country and cities
//       const country = reorderedData.find((item) =>
//         item.stateWithCity.some((state) => state.name === location.state)
//       ).country.name;

//       const stateCities = reorderedData
//         .find((item) =>
//           item.stateWithCity.some((state) => state.name === location.state)
//         )
//         .stateWithCity.find((state) => state.name === location.state)
//         .cities.map((city) => city.routeLink);

//       setSelectedLocations((prev) => [
//         ...prev,
//         { country, state: location.state, cities: stateCities },
//       ]);
//     }
//   };

//   // const handleCityChange = (city, state) => {
//   //   const isSelected = selectedLocations.some(
//   //     (selectedLocation) =>
//   //       selectedLocation.cities.includes(city.routeLink) &&
//   //       (selectedLocation.state === state || selectedLocation.state === "")
//   //   );

//   //   if (isSelected) {
//   //     // If city is already selected, remove it
//   //     setSelectedLocations((prev) =>
//   //       prev.map((selectedLocation) => ({
//   //         ...selectedLocation,
//   //         cities: selectedLocation.cities.filter(
//   //           (selectedCity) => selectedCity !== city.routeLink
//   //         ),
//   //       }))
//   //     );
//   //   } else {
//   //     // If city is not selected, add it and its country and state
//   //     const country = reorderedData.find((item) =>
//   //       item.stateWithCity.some((s) =>
//   //         s.cities.some((c) => c.routeLink === city.routeLink)
//   //       )
//   //     ).country.name;

//   //     setSelectedLocations((prev) => [
//   //       ...prev,
//   //       { country, state, cities: [city.routeLink] },
//   //     ]);
//   //   }
//   // };

//   const handleCityChange = (city) => {
//     const selectedLocationIndex = selectedLocations.findIndex((location) =>
//       location.cities.includes(city.routeLink)
//     );

//     if (selectedLocationIndex !== -1) {
//       // If city is already selected, remove it
//       setSelectedLocations(
//         (prev) =>
//           prev
//             .map((location, index) => {
//               if (index === selectedLocationIndex) {
//                 // Remove the selected city from the location
//                 const updatedCities = location.cities.filter(
//                   (selectedCity) => selectedCity !== city.routeLink
//                 );

//                 // If there are still cities in the location, update it; otherwise, remove the location
//                 return updatedCities.length > 0
//                   ? { ...location, cities: updatedCities }
//                   : null;
//               }
//               return location;
//             })
//             .filter(Boolean) // Filter out null entries
//       );
//     } else {
//       // If city is not selected, find its country and state
//       const foundCity = reorderedData.find((item) =>
//         item.stateWithCity.some((state) =>
//           state.cities.some((c) => c.routeLink === city.routeLink)
//         )
//       );

//       if (foundCity) {
//         const country = foundCity.country.name;
//         const state = foundCity.stateWithCity.find((state) =>
//           state.cities.some((c) => c.routeLink === city.routeLink)
//         ).name;

//         setSelectedLocations((prev) => {
//           const existingLocationIndex = prev.findIndex(
//             (location) => location.state === state
//           );

//           if (existingLocationIndex !== -1) {
//             // If state already exists, update the cities
//             const existingLocation = prev[existingLocationIndex];
//             const updatedCities = [...existingLocation.cities, city.routeLink];
//             const updatedLocation = {
//               ...existingLocation,
//               cities: updatedCities,
//             };

//             return [
//               ...prev.slice(0, existingLocationIndex),
//               updatedLocation,
//               ...prev.slice(existingLocationIndex + 1),
//             ];
//           } else {
//             // If state doesn't exist, add a new object
//             return [
//               ...prev,
//               {
//                 country,
//                 state,
//                 cities: [city.routeLink],
//               },
//             ];
//           }
//         });
//       }
//     }
//   };

//   const handleLocationSelect = () => {
//     console.log("selectedLocations", selectedLocations);
//   };

//   return (
//     <div className="py-5 min-h-[70vh]">
//       {reorderedData.map((item) => (
//         <Accordion
//           collapsible
//           key={item.country._id}
//           className="bg-gray-300 rounded-md mb-2 px-2 py-1"
//         >
//           <AccordionItem>
//             <AccordionButton className="w-full text-left font-bold text-lg">
//               {item.country.name}
//             </AccordionButton>

//             <AccordionPanel>
//               {item.stateWithCity.sort(sortByName).map((state) => (
//                 <Accordion
//                   collapsible
//                   key={state._id}
//                   className="bg-gray-200 rounded-md mb-2"
//                 >
//                   <AccordionItem className="">
//                     <div className="flex items-start py-1 px-2">
//                       <div className="flex items-center h-5">
//                         <input
//                           id={`state-${state.name}`}
//                           type="checkbox"
//                           value={state.name}
//                           className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
//                           onChange={(e) => {
//                             handleLocationChange({ state: e.target.value });
//                           }}
//                           checked={selectedLocations.some(
//                             (selectedLocation) =>
//                               selectedLocation.state === state.name
//                           )}
//                         />
//                       </div>
//                       <AccordionButton className="w-full text-left  font-semibold text-md">
//                         <div key={state.name} className="flex items-start">
//                           <label
//                             htmlFor={`state-${state.name}`}
//                             className="ml-2 text-sm font-medium capitalize"
//                           >
//                             {state.name}
//                           </label>
//                         </div>
//                       </AccordionButton>
//                     </div>

//                     <AccordionPanel className="px-4 pb-3">
//                       {state.cities.sort(sortByName).map((city) => (
//                         <div key={city._id}>
//                           <input
//                             id={`city-${city.routeLink}`}
//                             type="checkbox"
//                             value={city.routeLink}
//                             className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
//                             onChange={() => {
//                               handleCityChange(city);
//                             }}
//                             checked={selectedLocations.some(
//                               (selectedLocation) =>
//                                 selectedLocation.cities.includes(
//                                   city.routeLink
//                                 ) &&
//                                 (selectedLocation.state === state.name ||
//                                   selectedLocation.state === "")
//                             )}
//                           />
//                           <label
//                             htmlFor={`city-${city.routeLink}`}
//                             className="ml-2 text-sm font-medium capitalize"
//                           >
//                             {city.name}
//                           </label>
//                         </div>
//                       ))}
//                     </AccordionPanel>
//                   </AccordionItem>
//                 </Accordion>
//               ))}
//             </AccordionPanel>
//           </AccordionItem>
//         </Accordion>
//       ))}
//       {/* <Link href="/dashboard/create-post/select-category"> */}
//       <button
//         type="button"
//         className="mt-5 px-5 py-2 rounded-md bg-gray-500 text-white font-bold"
//         onClick={handleLocationSelect}
//       >
//         Continue
//       </button>
//       {/* </Link> */}
//     </div>
//   );
// };

// export default MultipleCitySelect;

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@reach/accordion";
import "@reach/accordion/styles.css";
import data from "@/static/data";
import Link from "next/link";
import { usePostState } from "@/context/postContext/postState";
import {
  getCountry,
  getLocation,
  getSingleCity,
} from "@/context/postContext/postActions";
import { sortByName } from "@/utils/utils";
import { useState } from "react";

const MultipleCitySelect = () => {
  const [, postDispatch] = usePostState();
  const [canada, asia, australia, europe, africa, us, latin] = data;
  const reorderedData = [us, canada, europe, asia, australia, africa, latin];

  const [selectedLocations, setSelectedLocations] = useState([]);

  // console.log("selectedLocations", selectedLocations);

  const handleLocationChange = (location) => {
    const isSelected = selectedLocations.some(
      (selectedLocation) => selectedLocation.state === location.state
    );

    if (isSelected) {
      // If state is already selected, remove it and its cities
      setSelectedLocations((prev) =>
        prev.filter(
          (selectedLocation) => selectedLocation.state !== location.state
        )
      );
    } else {
      // If state is not selected, add it and its country and cities
      const country = reorderedData.find((item) =>
        item.stateWithCity.some((state) => state.name === location.state)
      ).country.name;

      const stateCities = reorderedData
        .find((item) =>
          item.stateWithCity.some((state) => state.name === location.state)
        )
        .stateWithCity.find((state) => state.name === location.state)
        .cities.map((city) => city.routeLink);

      setSelectedLocations((prev) => [
        ...prev,
        { country, state: location.state, cities: stateCities },
      ]);
    }
  };

  const handleCityChange = (city) => {
    const selectedLocationIndex = selectedLocations.findIndex((location) =>
      location.cities.includes(city.routeLink)
    );

    if (selectedLocationIndex !== -1) {
      // If city is already selected, remove it
      setSelectedLocations(
        (prev) =>
          prev
            .map((location, index) => {
              if (index === selectedLocationIndex) {
                // Remove the selected city from the location
                const updatedCities = location.cities.filter(
                  (selectedCity) => selectedCity !== city.routeLink
                );

                // If there are still cities in the location, update it; otherwise, remove the location
                return updatedCities.length > 0
                  ? { ...location, cities: updatedCities }
                  : null;
              }
              return location;
            })
            .filter(Boolean) // Filter out null entries
      );
    } else {
      // If city is not selected, find its country and state
      const foundCity = reorderedData.find((item) =>
        item.stateWithCity.some((state) =>
          state.cities.some((c) => c.routeLink === city.routeLink)
        )
      );

      if (foundCity) {
        const country = foundCity.country.name;
        const state = foundCity.stateWithCity.find((state) =>
          state.cities.some((c) => c.routeLink === city.routeLink)
        ).name;

        setSelectedLocations((prev) => {
          const existingLocationIndex = prev.findIndex(
            (location) => location.state === state
          );

          if (existingLocationIndex !== -1) {
            // If state already exists, update the cities
            const existingLocation = prev[existingLocationIndex];
            const updatedCities = [...existingLocation.cities, city.routeLink];
            const updatedLocation = {
              ...existingLocation,
              cities: updatedCities,
            };

            return [
              ...prev.slice(0, existingLocationIndex),
              updatedLocation,
              ...prev.slice(existingLocationIndex + 1),
            ];
          } else {
            // If state doesn't exist, add a new object
            return [
              ...prev,
              {
                country,
                state,
                cities: [city.routeLink],
              },
            ];
          }
        });
      }
    }
  };

  const handleLocationSelect = () => {
    // console.log("selectedLocations", selectedLocations);
    getLocation(postDispatch, selectedLocations);
  };

  return (
    <div className="py-5 min-h-[70vh]">
      {reorderedData.map((item) => (
        <Accordion
          collapsible
          key={item.country._id}
          className="bg-gray-300 rounded-md mb-2 px-2 py-1"
        >
          <AccordionItem>
            <AccordionButton className="w-full text-left font-bold text-lg">
              {item.country.name}
            </AccordionButton>

            <AccordionPanel>
              {item.stateWithCity.sort(sortByName).map((state) => (
                <Accordion
                  collapsible
                  key={state._id}
                  className="bg-gray-200 rounded-md mb-2"
                >
                  <AccordionItem className="">
                    <div className="flex items-start py-1 px-2">
                      <div className="flex items-center h-5">
                        <input
                          id={`state-${state.name}`}
                          type="checkbox"
                          value={state.name}
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                          onChange={(e) => {
                            handleLocationChange({ state: e.target.value });
                          }}
                          checked={selectedLocations.some(
                            (selectedLocation) =>
                              selectedLocation.state === state.name
                          )}
                        />
                      </div>
                      <AccordionButton className="w-full text-left  font-semibold text-md">
                        <div key={state.name} className="flex items-start">
                          <label
                            htmlFor={`state-${state.name}`}
                            className="ml-2 text-sm font-medium capitalize"
                          >
                            {state.name}
                          </label>
                        </div>
                      </AccordionButton>
                    </div>

                    <AccordionPanel className="px-4 pb-3">
                      {state.cities.sort(sortByName).map((city) => (
                        <div key={city._id}>
                          <input
                            id={`city-${city.routeLink}`}
                            type="checkbox"
                            value={city.routeLink}
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                            onChange={() => {
                              handleCityChange(city);
                            }}
                            checked={selectedLocations.some(
                              (selectedLocation) =>
                                selectedLocation.cities.includes(
                                  city.routeLink
                                ) &&
                                (selectedLocation.state === state.name ||
                                  selectedLocation.state === "")
                            )}
                          />
                          <label
                            htmlFor={`city-${city.routeLink}`}
                            className="ml-2 text-sm font-medium capitalize"
                          >
                            {city.name}
                          </label>
                        </div>
                      ))}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ))}
      <Link href="/dashboard/create-post/select-category">
        <button
          type="button"
          className="mt-5 px-5 py-2 rounded-md bg-gray-500 text-white font-bold"
          onClick={handleLocationSelect}
        >
          Continue
        </button>
      </Link>
    </div>
  );
};

export default MultipleCitySelect;
