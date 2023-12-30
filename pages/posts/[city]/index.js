import Link from "next/link";
import { allCitiesLinks } from "@/static/links/allCitiesLinks";
import secData from "../../../static/sectionData";

const CityPage = ({ data, params }) => {
  return (
    <div className="container md:columns-3 sm:columns-2 my-3">
      {data.map((item) => (
        <div key={item._id} className="break-inside-avoid">
          <h4
            style={{
              backgroundColor: "rgb(191 204 202)",
              borderRadius: "5px",
            }}
            className="px-2 font-bold text-xl py-1"
          >
            {item.name}
          </h4>
          <div className="px-1 py-1">
            {item.categories.map((list) => (
              <div key={list._id}>
                <Link
                  // href={`/posts/${params.city}/${list.routeLink}`}
                  href={`/terms?city=${params.city}&category=${list.routeLink}`}
                  className="hover:font-semibold hover:text-red-600 font-normal inline-block py-0.5"
                >
                  {list.displayName}
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CityPage;

export async function getServerSideProps(context) {
  const { params } = context;

  if (!allCitiesLinks.includes(params.city)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: secData,
      params,
    },
  };
}
