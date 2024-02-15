import PostTable from '../../components/PostTable';
import UserProfileHead from '../../components/UserProfileHead';
import { usePostState } from './../../context/postContext/postState';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getUserPosts } from '../../context/postContext/postActions';
import PostTableMobile from '../../components/PostTableMobile';
import axios from 'axios';
import { API_URL } from '@/config';
import DeleteModal from '@/components/DeleteModal';
import RenewModal from '@/components/RenewModal';

export default function Dashboard() {
  const [state, postDispatch] = usePostState();
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [showRenewModal, setShowRenewModal] = useState(null);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenewing, setIsRenewing] = useState(false);

  const { data: session } = useSession();

  const userPosts = state.userPosts;

  // console.log("session", session);

  //console.log("userPosts", userPosts);

  const token = session?.user.token;

  useEffect(() => {
    token && getUserPosts(postDispatch, token);
    // token && getUserCredits(postDispatch, token);
  }, [postDispatch, token]);

  const handlePostDelete = async postId => {
    setIsDeleting(true);

    const url = `${API_URL}/post/delete/${postId}`;

    const res = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      getUserPosts(postDispatch, token);
    } else {
      console.log('delete error');
    }

    setIsDeleting(false);
    setShowDeleteModal(null);
  };

  const handlePostRenew = async postId => {
    setIsRenewing(true);

    const url = `${API_URL}/post/renew/${postId}`;

    const res = await axios.post(
      url,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log("res", res.data);
    if (res.status === 200) {
      getUserPosts(postDispatch, token);
    } else {
      console.log('renew error');
    }

    setIsRenewing(false);
    setShowRenewModal(null);
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
            setShowRenewModal={setShowRenewModal}
          />
          <PostTableMobile
            posts={userPosts.posts}
            setShowDeleteModal={setShowDeleteModal}
            setShowRenewModal={setShowRenewModal}
          />
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

      {showRenewModal && (
        <RenewModal
          showRenewModal={showRenewModal}
          setShowRenewModal={setShowRenewModal}
          handlePostRenew={handlePostRenew}
          isRenewing={isRenewing}
        />
      )}
    </div>
  );
}

// //  will change it later
// import PostTable from "../../components/PostTable";
// import UserProfileHead from "../../components/UserProfileHead";
// import {  useState } from "react";
// import { useSession } from "next-auth/react";
// import PostTableMobile from "../../components/PostTableMobile";
// import axios from "axios";
// import { API_URL } from "@/config";
// import DeleteModal from "@/components/DeleteModal";
// import RenewModal from "@/components/RenewModal";
// import useGetData from "@/hooks/useGetData";

// export default function Dashboard() {

//   const [showDeleteModal, setShowDeleteModal] = useState(null);
//   const [showRenewModal, setShowRenewModal] = useState(null);

//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isRenewing, setIsRenewing] = useState(false);

//   const { data: session } = useSession();

//   const token = session?.user.token;

//   const { data, isLoading, error } = useGetData({ path: "/get/data" });

//   console.log("data", data);

//   const userPosts = data?.data;

//   console.log("userPosts", userPosts);

//   const handlePostDelete = async (postId) => {
//     setIsDeleting(true);

//     const url = `${API_URL}/post/delete/${postId}`;

//     const res = await axios.delete(url, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     console.log("res", res.data);
//     if (res.status === 200) {
//       console.log("delete success");
//       // getUserPosts(postDispatch, token);
//     } else {
//       console.log("delete error");
//     }

//     setIsDeleting(false);
//     setShowDeleteModal(null);
//   };

//   const handlePostRenew = async (postId) => {
//     setIsRenewing(true);

//     const url = `${API_URL}/post/renew/${postId}`;

//     const res = await axios.post(
//       url,
//       {},
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     // console.log("res", res.data);
//     if (res.status === 200) {
//       console.log("renew success", res.data);
//       // getUserPosts(postDispatch, token);
//     } else {
//       console.log("renew error", res.data);
//     }

//     setIsRenewing(false);
//     setShowRenewModal(null);
//   };

//   return (
//     <div className="mt-3 min-h-[70vh]">
//       <UserProfileHead session={session} />
//       {isLoading ? (
//         <div className="flex items-center justify-center space-x-2 animate-bounce mt-7">
//           <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
//           <div className="w-8 h-8 bg-green-400 rounded-full"></div>
//           <div className="w-8 h-8 bg-black rounded-full"></div>
//         </div>
//       ) : userPosts?.length === 0 ? (
//         <div className="text-center font-semibold py-8">No post to show</div>
//       ) : (
//         <div>
//           <PostTable
//             posts={userPosts}
//             setShowDeleteModal={setShowDeleteModal}
//             setShowRenewModal={setShowRenewModal}
//           />
//           <PostTableMobile posts={userPosts} />
//         </div>
//       )}

//       {showDeleteModal && (
//         <DeleteModal
//           showDeleteModal={showDeleteModal}
//           setShowDeleteModal={setShowDeleteModal}
//           handlePostDelete={handlePostDelete}
//           isDeleting={isDeleting}
//         />
//       )}

//       {showRenewModal && (
//         <RenewModal
//           showRenewModal={showRenewModal}
//           setShowRenewModal={setShowRenewModal}
//           handlePostRenew={handlePostRenew}
//           isRenewing={isRenewing}
//         />
//       )}
//     </div>
//   );
// }
