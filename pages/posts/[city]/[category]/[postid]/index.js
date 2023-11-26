import { useState } from "react";
import dateFormat from "dateformat";
import { FaBan, FaRegEnvelope, FaPhoneAlt } from "react-icons/fa";
import { API_URL } from "@/config";
import Modal from "../../../../../components/Modal";
import ScamAlert from "../../../../../components/ScamAlert";

const Index = ({ params, data }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      <div>
        <div
          className="pb-3"
          style={{
            borderBottom: "2px solid #EFEFEF",
          }}
        >
          <h1 className="text-3xl font-semibold mb-2">{data.title}</h1>
          <p className="mb-2 text-gray-500">
            Posted:{dateFormat(data.createdAt, "dS mmmm, yyyy")}
          </p>
          <div className="flex flex-col sm:flex-row gap-1">
            {data.email && (
              <button className="bg-blue-400 px-3 py-1 rounded-sm text-white md:my-2 flex items-center gap-1">
                <FaRegEnvelope />
                {data.email}
              </button>
            )}
            {data.number && (
              <button className="bg-green-300 px-3 py-1 rounded-sm text-white md:my-2 flex items-center gap-1">
                <FaPhoneAlt />
                {data.number}
              </button>
            )}
          </div>
        </div>
        <ScamAlert />
        <div>
          <div className="grid gap-1 grid-cols-2 md:hidden">
            {data.images &&
              data.images.map((image) => (
                <div
                  key={image.public_id}
                  onClick={() => {
                    setSelectedImage(image.url);
                  }}
                >
                  <img
                    src={image.url}
                    alt={image.url}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="md:grid md:gap-3 md:grid-cols-5">
          <div className="md:col-span-3">
            <div className="mb-2" />
            <h1 dangerouslySetInnerHTML={{ __html: data.description }} />
            <ul>
              {/* <li>
                Location:{" "}
                {data.location.length > 1
                  ? "All selected"
                  : data.location[0].name}
              </li> */}
              <li>Location: {data.country}</li>
              <li>Poster age: {data.age}</li>
              <li>Post ID: {data._id}</li>
            </ul>
            <button className="bg-red-600 px-6 py-1 rounded-sm text-white my-2 flex items-center gap-1">
              <FaBan /> <p>Report AD</p>
            </button>
          </div>
          <div className="hidden md:grid gap-1 grid-cols-2 col-span-2">
            {data.images &&
              data.images.map((item) => (
                <div
                  key={item._id}
                  onClick={() => {
                    setSelectedImage(item);
                  }}
                >
                  <img
                    src={item.url}
                    alt={item}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      {selectedImage && (
        <Modal
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      )}
    </div>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const { params } = context;

  const url = `${API_URL}/get/single/post/${params.postid}`;
  const res = await fetch(url);
  const data = await res.json();

  // console.log("data", data);

  if (!res.ok || !data.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      params,
      data: data.data,
    },
  };
}
