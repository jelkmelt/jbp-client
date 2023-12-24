import { useState, useRef } from "react";
import { GrClose } from "react-icons/gr";
import { usePostState } from "@/context/postContext/postState";
import { getFormData, getLocation } from "@/context/postContext/postActions";
import { useRouter } from "next/router";
import { getCitiesByState } from "@/utils/getCitiesByState";
import { PER_CITY_COST } from "@/config";
import useGetData from "@/hooks/useGetData";
import toast from "react-hot-toast";

const PostForm = () => {
  const [postState, postDispatch] = usePostState();
  const postType = postState.postType;

  const countryValue = postState.location?.[0].country;
  const stateValue = postState.location?.[0].state;
  const cityValue = postState.location?.[0].cities?.[0];

  const { data, isLoading, error } = useGetData({
    path: "/get/user/updated/credit",
  });

  const credit = data?.credit;

  const router = useRouter();
  const [state, setState] = useState({
    title: "",
    description: "",
    age: "",
    email: "",
    number: "",
    tou: false,
    images: [],
  });

  const [selectedCities, setSelectedCities] = useState([cityValue]);

  console.log("selectedCities", selectedCities);

  const similarCities = getCitiesByState(stateValue);

  const cost = (selectedCities.length * PER_CITY_COST).toFixed(2);

  const handleChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  // const handleImageChange = async (e) => {
  //   if (e.target.files.length > 4) {
  //     return;
  //   }

  //   const cloud_name = "da36wyomi";
  //   const preset = "justbackpage";
  //   const folder = "justbackpage";

  //   let formData = new FormData();
  //   Array.from(e.target.files).forEach((file) => {
  //     formData.append("file", file);
  //     formData.append("upload_preset", preset);
  //     formData.append("cloud_name", cloud_name);
  //     formData.append("folder", folder);

  //     const imageUpload = async () => {
  //       const res = await fetch(
  //         `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
  //         {
  //           method: "POST",
  //           body: formData,
  //         }
  //       );

  //       const data = await res.json();

  //       if (res.ok) {
  //         setState((prevState) => ({
  //           ...prevState,
  //           images: [
  //             ...state.images,
  //             {
  //               public_id: data.public_id,
  //               url: data.secure_url,
  //             },
  //           ],
  //         }));
  //       } else {
  //         console.log("failed", data);
  //       }
  //     };

  //     imageUpload();
  //   });
  // };

  const handleImageChange = async (e) => {
    if (e.target.files.length > 4) {
      return;
    }

    const cloud_name = "da36wyomi";
    const preset = "justbackpage";
    const folder = "justbackpage";

    const uploadPromises = Array.from(e.target.files).map(async (file) => {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset);
      formData.append("cloud_name", cloud_name);
      formData.append("folder", folder);

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();

        if (res.ok) {
          return {
            public_id: data.public_id,
            url: data.secure_url,
          };
        } else {
          console.log("Error uploading image:", data.error.message);
          return null;
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);

    // Remove null values (failed uploads) and update state
    const filteredImages = uploadedImages.filter(Boolean);
    setState((prevState) => ({
      ...prevState,
      images: [...state.images, ...filteredImages],
    }));
  };

  const handleNearbyCities = (value) => {
    // Check if the value is already selected
    if (selectedCities.includes(value)) {
      // If selected, remove it
      setSelectedCities((prevValues) => prevValues.filter((v) => v !== value));
    } else {
      // If not selected, add it
      setSelectedCities((prevValues) => [...prevValues, value]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    delete state.tou;

    if (postType === "local ad") {
      if (credit < cost) {
        toast.error("Insufficient credit");
        return;
      }

      getLocation(postDispatch, [
        {
          country: countryValue,
          state: stateValue,
          cities: selectedCities,
        },
      ]);
    }

    getFormData(postDispatch, state);
    router.push("/dashboard/create-post/preview");
  };

  const wheel = useRef();
  const wheel2 = useRef();
  const onWheel = (e) => wheel.current.blur();
  const onWheel2 = (e) => wheel2.current.blur();

  // console.log("location", postState.location);

  return (
    <div className="py-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={state.title}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="title"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={state.description}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description"
            rows={7}
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="age"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={state.age}
            ref={wheel}
            onWheel={onWheel}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Age"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your contact email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={state.email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            // required
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="number"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your contact number
          </label>
          <input
            type="number"
            id="number"
            name="number"
            value={state.number}
            ref={wheel2}
            onWheel={onWheel2}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Contact number"
            // required
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="number"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Upload Images (max-image-4, max size 2mb, accept png, jpeg, jpg )
          </label>
          <label>
            <input
              multiple
              accept="image/png, image/jpeg, image/jpg"
              type="file"
              className="text-sm text-grey-500
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-blue-50 file:text-blue-700
            hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700
          "
              onChange={handleImageChange}
              disabled={state.images.length === 4}
            />
          </label>
          {state.images.length > 0 && (
            <div className="my-3 grid grid-cols-2 gap-5">
              {state.images.map((image) => (
                <div
                  key={image.public_id}
                  className="bg-gray-200 rounded-md px-2 py-2 flex justify-between items-center"
                >
                  <div
                    style={{
                      maxWidth: "50px",
                      maxHeight: "50px",
                      display: "flex",
                      justifyContent: "center",
                      justifyItems: "center",
                    }}
                  >
                    <img src={image.url} alt="uploaded pic" />
                  </div>

                  <GrClose
                    className="text-xl cursor-pointer"
                    onClick={() => {
                      console.log("clicked");
                      const filteredImage = state.images.filter(
                        // (image) => image.id !== item.id
                        (img) => img.public_id !== image.public_id
                      );
                      setState({ ...state, images: filteredImage });
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {/* <div className="border-b border-gray-500 my-5"></div> */}
        {postType === "local ad" && (
          <div className="mt-10 mb-6 space-y-3">
            <p className="text-base font-bold">
              Add Nearby Cities{" "}
              <span className="font-normal">{`for $${cost}`}</span>
            </p>
            {similarCities.map((city) => (
              <div key={city} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={city}
                    type="checkbox"
                    value={city}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 default:opacity-50"
                    defaultChecked={cityValue.includes(city)}
                    disabled={cityValue.includes(city)}
                    // defaultChecked={
                    //   city.toLowerCase() === cityValue.toLowerCase()
                    // }
                    // disabled={city.toLowerCase() === cityValue.toLowerCase()}
                    // onChange={(e) =>
                    //   setSelectedCities((prev) => [...prev, e.target.value])
                    // }
                    onChange={(e) => handleNearbyCities(e.target.value)}
                  />
                </div>
                <label
                  htmlFor={city}
                  className="ml-2 text-sm font-medium capitalize"
                >
                  {`${city} - $${PER_CITY_COST}`}
                </label>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
              onChange={() => setState({ ...state, tou: !state.tou })}
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            By placing this ad I agree to the terms of use and privacy policy
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;
