import Link from 'next/link';
import { sortByName } from '../utils/utils';

const ShowStateAndCity = ({ item }) => {
  return (
    <div>
      <h4 className="p-1.5 bg-gray-500 my-[10px] text-white text-center border-0 rounded-md text-xl font-bold">
        {item.country.displayName}
      </h4>
      <div
        style={{
          columnCount: 3,
        }}
        className="columns-3"
      >
        {item.stateWithCity.sort(sortByName).map(states => (
          <div
            key={states._id}
            className="mb-1"
            style={{
              pageBreakInside: 'avoid',
            }}
          >
            <h5 className="font-semibold">{states.displayName}</h5>
            <div className="ml-3">
              {states.cities.sort(sortByName).map(city => (
                <div key={city._id}>
                  <Link
                    className="inline-block py-[2px] text-md   hover:font-semibold hover:text-red-600"
                    href={`/posts/${city.routeLink}`}
                  >
                    {city.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowStateAndCity;
