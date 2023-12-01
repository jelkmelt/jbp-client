import Link from "next/link";
import dateFormat from "dateformat";
import { FaEdit, FaTrash, FaEye, FaRedoAlt } from "react-icons/fa";

const PostTable = ({ posts, setShowDeleteModal, setShowRenewModal }) => {
  return (
    <div className="hidden md:block">
      {posts?.length === 0 ? (
        <div>
          <h4 className="text-center">No Post Yet</h4>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th style={{ minWidth: "150px" }}>Title</th>
              <th>City</th>
              <th>Catagory</th>
              <th style={{ minWidth: "170px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((item) => (
              <tr key={item._id}>
                <td>{dateFormat(item.createdAt, "dS mmmm, yyyy")}</td>
                <td className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {item?.title}
                </td>
                <td>
                  {/* {item?.location?.length > 1
                ? "Multiple city"
                : item.location[0]?.name} */}
                  {/* city */}
                  {item.city}
                </td>
                <td>{item.section}</td>

                <td className="tableAction">
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(item)}
                  >
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
                  {/* <span> */}
                  <button type="button" onClick={() => setShowRenewModal(item)}>
                    <abbr title="Renew">
                      <FaRedoAlt />
                    </abbr>
                  </button>
                  {/* </span> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PostTable;
