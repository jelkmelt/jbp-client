import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@reach/accordion';
import '@reach/accordion/styles.css';
import Link from 'next/link';
import { sortByName } from '../utils/utils';

const HomeMobile = ({ data, className }) => {
  const [canada, asia, australia, europe, africa, us, latin] = data;
  const reorderedData = [us, canada, europe, asia, australia, africa, latin];
  return (
    <div className={className}>
      <Accordion collapsible>
        {reorderedData.map(item => (
          <AccordionItem
            key={item.country._id}
            className="bg-gray-300 rounded-md mb-2 px-2 py-1"
          >
            <AccordionButton className="w-full text-left font-bold text-lg">
              {item.country.name}
            </AccordionButton>
            <AccordionPanel>
              <Accordion collapsible>
                {item.stateWithCity.sort(sortByName).map(state => (
                  <AccordionItem
                    key={state._id}
                    className="bg-gray-200 rounded-md mb-2"
                  >
                    <AccordionButton className="w-full text-left py-1 px-2 font-semibold text-md">
                      {state.name}
                    </AccordionButton>

                    <AccordionPanel className="px-4 pb-3">
                      {state.cities.sort(sortByName).map(city => (
                        <div key={city._id}>
                          <Link
                            href={`/posts/${city.routeLink}`}
                            className="text-blue-600"
                          >
                            {city.name}
                          </Link>
                        </div>
                      ))}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default HomeMobile;
