import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { FcProcess } from "react-icons/fc";
import axios from "axios";
import { FaRegEnvelope, FaPhoneAlt } from "react-icons/fa";
import { usePostState } from "../../../context/postContext/postState";
import Modal from "../../../components/Modal";
import { API_URL } from "@/config";
// import Steps from "../../../components/Steps";
// import FixStep from "../../../components/FixStep";

const Preview = () => {
  const [state, postDispatch] = usePostState();
  const [selectedImage, setSelectedImage] = useState(null);
  const { data: session } = useSession();
  const Router = useRouter();
  const [btnpending, setBtnpending] = useState(false);

  const { token } = session ? session.user : "";

  const handleCreatePost = async () => {
    setBtnpending(true);

    const formValues = state.formData;
    const section = state.category.sectionName;
    // const category = state.category.displayName;
    const category = state.category.routeLink;
    const postType = state.postType;
    // const city = state.singleCity;
    const country = state.country;
    const location = state.location;
    // const stateWithCity = state.location?.[0];
    // const location = [
    //   {
    //     country: country,
    //     state: stateWithCity.state,
    //     cities: stateWithCity.cities,
    //   },
    // ];
    const url = `${API_URL}/post/ad`;
    const values = {
      ...formValues,
      section,
      category,
      location,
      postType,
      // country,
      cost: 0, //could change
    };

    // console.log("location", location);

    // console.log("allValues", values);
    // return;

    const res = await axios.post(url, values, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("res", res.data);
    if (res.status === 200) {
      Router.push("/dashboard/create-post/successfull");
    } else {
      Router.push("/dashboard/create-post/publishing-error");
    }
  };

  return (
    <div>
      <div>
        <div
          className="pb-3"
          style={{
            borderBottom: "2px solid #EFEFEF",
          }}
        >
          {/* <Steps />
          <FixStep /> */}
          <h1 className="text-3xl font-semibold mb-2">
            {state.formData.title}
          </h1>

          <div className="flex gap-1">
            {state.formData.email && (
              <button className="bg-blue-400 px-3 py-1 rounded-sm text-white my-2 flex items-center gap-1">
                <FaRegEnvelope />
                {state.formData.email}
              </button>
            )}
            {state.formData.phoneNumber && (
              <button className="bg-green-300 px-3 py-1 rounded-sm text-white my-2 flex items-center gap-1">
                <FaPhoneAlt />
                {state.formData.phoneNumber}
              </button>
            )}
          </div>
        </div>
        <div className="grid gap-3 grid-cols-5">
          <div className="col-span-3">
            <div className="mb-2" />
            <h1
              dangerouslySetInnerHTML={{ __html: state.formData.description }}
            />
            <ul className="mt-5">
              <li className="font-semibold">
                Contact Number:{" "}
                <span className="font-normal">
                  {state.formData.phoneNumber}
                </span>
              </li>
              <li className="font-semibold">
                Age: <span className="font-normal">{state.formData.age}</span>{" "}
              </li>
            </ul>
          </div>
          <div className="grid gap-1 grid-cols-2 col-span-2 mt-2">
            {state.formData.images.length > 0 &&
              state.formData.images.map((image) => (
                <div
                  key={image.public_id}
                  onClick={() => {
                    setSelectedImage({ url: image.url });
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
      </div>
      {selectedImage && (
        <Modal
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      )}
      <div className="mt-5">
        <button
          className={`${
            btnpending ? "bg-blue-300" : "bg-blue-500"
          } px-5 py-2 rounded-sm text-white my-2 flex items-center gap-1`}
          onClick={handleCreatePost}
          disabled={btnpending}
        >
          {btnpending ? (
            <span className="flex items-center gap-1 text-gray-700">
              <FcProcess /> Publishing
            </span>
          ) : (
            "Publish"
          )}
        </button>
      </div>
    </div>
  );
};

export default Preview;
