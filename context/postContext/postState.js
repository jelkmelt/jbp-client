import { useReducer, createContext, useContext } from "react";
import postReducer from "./postReducer";

const PostContext = createContext();

PostContext.displayName = "PostContext";

export const usePostState = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error(
      "Component must be wrapped with in PostStateContextProvider"
    );
  }
  return context;
};

const PostProvider = (props) => {
  const [state, dispatch] = useReducer(postReducer, {
    userPosts: {
      isLoading: false,
      posts: [],
    },
    postType: "",
    singleCity: null,
    category: null,
    formData: {
      title: "",
      description: "",
      age: "",
      email: "",
      number: "",
      tou: false,
      images: [],
    },
  });

  return <PostContext.Provider value={[state, dispatch]} {...props} />;
};

export default PostProvider;
