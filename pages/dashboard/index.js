// import { getSession } from "next-auth/react";
import PostTable from "../../components/PostTable";
import UserProfileHead from "../../components/UserProfileHead";
import { usePostState } from "./../../context/postContext/postState";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUserPosts } from "../../context/postContext/postActions";
import PostTableMobile from "../../components/PostTableMobile";
import axios from "axios";
import { API_URL } from "@/config";
import DeleteModal from "@/components/DeleteModal";

export default function Dashboard() {
  const [{ userPosts }, postDispatch] = usePostState();
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { data: session } = useSession();

  // console.log("session", session);

  const token = session?.user.token;

  useEffect(() => {
    token && getUserPosts(postDispatch, token);
  }, [token]);

  const handlePostDelete = async (postId) => {
    setIsDeleting(true);

    const url = `${API_URL}/post/delete/${postId}`;

    const res = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("res", res.data);
    if (res.status === 200) {
      console.log("delete success");
      getUserPosts(postDispatch, token);
    } else {
      console.log("delete error");
    }

    setIsDeleting(false);
    setShowDeleteModal(null);
  };

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
          <PostTable
            posts={userPosts.posts}
            setShowDeleteModal={setShowDeleteModal}
          />
          <PostTableMobile posts={userPosts.posts} />
        </div>
      )}

      {showDeleteModal && (
        <DeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          handlePostDelete={handlePostDelete}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}
