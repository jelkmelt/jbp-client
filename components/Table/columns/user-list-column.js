import { format } from "date-fns";
import AddCredit from "../actions/AddCredit";

export const UserListColumn = [
  {
    Header: "Username",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Total Credit",
    accessor: "credit",
  },
  {
    Header: "Joined at",
    accessor: "createdAt",
    Cell: ({ value }) => {
      return format(new Date(value), "MMMM dd yyyy, p");
    },
  },
  {
    Header: "Options",
    accessor: "_id",
    disableSortBy: true,
    width: 200,
    Cell: ({ row }) => (
      <div className="flex justify-center items-center gap-2">
        <AddCredit userInfo={row.original} />

        <div className="">
          <button className="bg-cyan-600 text-xs text-white font-semibold px-2 py-1 rounded">
            Details
          </button>
        </div>

        <div className="">
          <button className="bg-red-600 text-xs text-white font-semibold px-2 py-1 rounded">
            Delete
          </button>
        </div>
      </div>
    ),
  },
];
