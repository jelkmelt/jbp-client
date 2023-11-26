import dateFormat from 'dateformat';
import { FaEdit, FaTrash, FaEye, FaRedoAlt } from 'react-icons/fa';

const PostTable = ({ posts }) => {
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
              <th style={{ minWidth: '150px' }}>Title</th>
              <th>City</th>
              <th>Catagory</th>
              <th style={{ minWidth: '170px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map(item => (
              <tr key={item._id}>
                <td>{dateFormat(item.createdAt, 'dS mmmm, yyyy')}</td>
                <td className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {item?.title}
                </td>
                <td>
                  {/* {item?.location?.length > 1
                ? "Multiple city"
                : item.location[0]?.name} */}
                  city
                </td>
                <td>{item.section}</td>

                <td className="tableAction">
                  <span>
                    <abbr title="Delete">
                      <FaTrash />
                    </abbr>
                  </span>

                  <span>
                    <abbr title="Edit">
                      <FaEdit />
                    </abbr>
                  </span>
                  <span>
                    <abbr title="View">
                      <FaEye />
                    </abbr>
                  </span>
                  <span>
                    <abbr title="Renew">
                      <FaRedoAlt />
                    </abbr>
                  </span>
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
