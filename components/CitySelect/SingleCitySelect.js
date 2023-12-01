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

const SingleCitySelect = () => {
  const [, postDispatch] = usePostState();
  const [canada, asia, australia, europe, africa, us, latin] = data;
  const reorderedData = [us, canada, europe, asia, australia, africa, latin];
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
                  <AccordionItem>
                    <AccordionButton className="w-full text-left py-1 px-2 font-semibold text-md">
                      {state.name}
                    </AccordionButton>

                    <AccordionPanel className="px-4 pb-3">
                      {state.cities.sort(sortByName).map((city) => (
                        <div key={city._id}>
                          <Link
                            href="/dashboard/create-post/select-category"
                            className="text-blue-600"
                            // onClick={() => getSingleCity(postDispatch, city)}
                            onClick={() => {
                              // getCountry(postDispatch, item.country.name);

                              // getLocation(postDispatch, [
                              //   {
                              //     country: item.country.name,
                              //     state: state.name,
                              //     cities: [city.routeLink],
                              //   },
                              // ]);
                              getLocation(postDispatch, {
                                country: item.country.name,
                                state: state.name,
                                cities: [city.routeLink],
                              });
                            }}
                          >
                            {city.name}
                          </Link>
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
    </div>
  );
};

export default SingleCitySelect;
