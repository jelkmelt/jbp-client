import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { API_URL } from '@/config';

function EditPost() {
  const [fetchedPost, setFetchedPost] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();
  const [state, setState] = useState({
    title: '',
    description: '',
    age: '',
    email: '',
    number: '',
    // tou: false,
    images: [],
    // category: '',
    // city: '',
    // country: '',
  });

  const { data: session } = useSession();

  const token = session?.user?.token;

  const postId = router.query.postId;

  // console.log("fetxhed", fetchedPost);

  useEffect(() => {
    const getSinglePost = async () => {
      setIsFetching(true);
      const url = `${API_URL}/get/single/post/${postId}`;
      const res = await axios.get(url);

      // console.log("res", res);

      if (res.status === 200) {
        console.log('fetch success');
        setFetchedPost(res.data.data);
        setIsFetching(false);
      } else {
        console.log('fetch error');
        router.replace('/404');
        setIsFetching(false);
      }
    };

    postId && getSinglePost();
  }, [postId, router]);

  // console.log("fetched", fetchedPost);

  useEffect(() => {
    if (fetchedPost) {
      setState(prevState => ({
        ...prevState,
        title: fetchedPost.title || '',
        description: fetchedPost.description || '',
        age: fetchedPost.age || '',
        email: fetchedPost.email || '',
        number: fetchedPost.number || '',
        images: fetchedPost.images || [],
      }));
    }
  }, [fetchedPost]);

  // console.log("fetched", fetchedPost);

  const handleChange = e =>
    setState({ ...state, [e.target.name]: e.target.value });

  // const handleSubmit = () => {};

  const handleSubmit = async e => {
    e.preventDefault();
    // delete state.tou;

    const url = `${API_URL}/post/update/${fetchedPost._id}`;

    const res = await axios.post(url, state, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('res', res.data);
    if (res.status === 200) {
      router.push(
        `/posts/${fetchedPost.city}/${fetchedPost.category}/${fetchedPost._id}`
      );
    } else {
      // router.push("/dashboard/create-post/publishing-error");
      console.log('error');
    }
  };

  const wheel = useRef();
  const wheel2 = useRef();
  const onWheel = e => wheel.current.blur();
  const onWheel2 = e => wheel2.current.blur();

  if (isFetching) {
    return (
      <div className="flex items-center justify-center space-x-2 animate-bounce mt-7">
        <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
        <div className="w-8 h-8 bg-green-400 rounded-full"></div>
        <div className="w-8 h-8 bg-black rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="py-5">
      <h1 className="text-2xl font-bold">{`Edit "${fetchedPost?.title}"`}</h1>
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
        {/* <div className="mb-6">
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
                        (image) => image.id !== item.id
                      );
                      setState({ ...state, images: filteredImage });
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div> */}

        {/* <div className="flex items-start mb-6">
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
        </div> */}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditPost;
