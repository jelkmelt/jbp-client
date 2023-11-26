import { getSession } from "next-auth/react";
import PostTable from "../../components/PostTable";
import UserProfileHead from "../../components/UserProfileHead";
import { usePostState } from "./../../context/postContext/postState";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { getUserPosts } from "../../context/postContext/postActions";
import PostTableMobile from "../../components/PostTableMobile";

export default function Dashboard(props) {
  const [{ userPosts }, postDispatch] = usePostState();
  const { data: session } = useSession();

  useEffect(() => {
    getUserPosts(postDispatch, props.email);

    // eslint-disable-next-line
  }, [props.email]);
  return (
    <div className="mt-3 min-h-[70vh]">
      <UserProfileHead session={session} />
      {userPosts.isLoading ? (
        <div className="flex items-center justify-center space-x-2 animate-bounce mt-7">
          <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
          <div className="w-8 h-8 bg-green-400 rounded-full"></div>
          <div className="w-8 h-8 bg-black rounded-full"></div>
        </div>
      ) : userPosts.posts.length === 0 ? (
        <div className="text-center font-semibold py-8">No post to show</div>
      ) : (
        <div>
          <PostTable posts={userPosts.posts} />
          <PostTableMobile posts={userPosts.posts} />
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  return {
    props: {
      expires: session.expires,
      email: session.user.email,
    },
  };
}
