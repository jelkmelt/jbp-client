import Link from "next/link";
import { FaEdit, FaTrash, FaEye, FaRedoAlt } from "react-icons/fa";

const PostTableMobile = ({ posts, setShowDeleteModal, setShowRenewModal }) => {
  return (
    <div className="md:hidden">
      {posts?.length === 0 ? (
        <div>
          <h4 className="text-center">No Post Yet</h4>
        </div>
      ) : (
        <div>
          <div className="flex justify-center mt-5">
            <h1 className="text-xl font-semibold text-center border-b border-gray-400">
              Posts
            </h1>
          </div>
          {posts?.map((item) => (
            <div
              key={item._id}
              className="my-2 flex justify-between items-center gap-8 overflow-x-auto"
            >
              <div className="flex gap-1 justify-between">
                <Link href={`/posts/${item.city}/${item.category}/${item._id}`}>
                  <h1 className="whitespace-nowrap overflow-hidden text-ellipsis font-semibold text-lg underline">
                    {item?.title}
                  </h1>
                </Link>
              </div>

              <div className="flex items-center gap-5">
                <button type="button" onClick={() => setShowDeleteModal(item)}>
                  <abbr title="Delete">
                    <FaTrash />
                  </abbr>
                </button>
                <button type="button">
                  <abbr title="Edit">
                    <Link href={`/dashboard/edit-post/${item._id}`}>
                      <FaEdit />
                    </Link>
                  </abbr>
                </button>
                <button type="button">
                  <abbr title="View">
                    <Link
                      href={`/posts/${item.city}/${item.category}/${item._id}`}
                    >
                      <FaEye />
                    </Link>
                  </abbr>
                </button>

                <button type="button" onClick={() => setShowRenewModal(item)}>
                  <abbr title="Renew">
                    <FaRedoAlt />
                  </abbr>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostTableMobile;
