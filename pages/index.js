import data from "../static/data";
import ShowStateAndCity from "../components/showStateAndCity";
import HomeMobile from "./../components/HomeMobile";

export default function Home() {
  return (
    <div className="min-h-[70vh] font-sans">
      <div className="md:grid grid-cols-2 gap-5 mb-3 hidden">
        {data
          .filter((continent) => continent.country.name === "United-States")
          .map((item) => (
            <ShowStateAndCity key={item.country._id} item={item} />
          ))}
        <div>
          {data
            .filter((continent) => continent.country.name !== "United-States")
            .map((item) => (
              <ShowStateAndCity key={item.country._id} item={item} />
            ))}
        </div>
      </div>
      <div>
        <HomeMobile data={data} className="md:hidden py-5" />
      </div>
    </div>
  );
}

// export async function getServerSideProps() {
//   return {
//     props: {
//       data,
//     },
//   };
// }
