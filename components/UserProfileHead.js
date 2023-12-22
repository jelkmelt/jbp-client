import useGetData from "@/hooks/useGetData";
import Link from "next/link";

const UserProfileHead = ({ session }) => {
  const { data, isLoading, error } = useGetData({
    path: "/get/user/updated/credit",
  });

  if (!session) {
    return <div>Loading...</div>;
  }
  const { name, email, image } = session.user;

  return (
    <div>
      <div className="flex justify-center sm:justify-start items-center">
        <div className="flex items-center">
          <img src={image} alt="user" className="avatar" />
          <div style={{ padding: "10px" }}>
            <h5>{name}</h5>
            <h6>{email}</h6>
            <h6>
              <strong>
                Credit: {isLoading && <span>Loading...</span>}
                {data && <span>{data?.credit}</span>}
                {error && <span>Error while loading credit</span>}
              </strong>
            </h6>
          </div>
        </div>
        <div className="ml-auto hidden sm:block">
          <div className="flex">
            <Link className="mr-1" href="/dashboard/create-post/select-type">
              <button className="px-3 py-2 font-semibold bg-green-300 rounded-md">
                Create new post
              </button>
            </Link>{" "}
            <Link href="/dashboard/buy-credit">
              {" "}
              <button className="px-3 py-2 font-semibold bg-gray-500 text-white rounded-md">
                Buy Credit
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-5 sm:hidden">
        <Link className="mr-1" href="/dashboard/create-post/select-type">
          <button className="px-3 py-2 font-semibold bg-green-300 rounded-md">
            Create new post
          </button>
        </Link>{" "}
        <Link href="/dashboard/buy-credit">
          {" "}
          <button className="px-3 py-2 font-semibold bg-gray-500 text-white rounded-md">
            Buy Credit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserProfileHead;
