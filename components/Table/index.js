import { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useRowSelect,
} from "react-table";
import { GlobalFilter } from "./GlobalFilter";
// import useToggle from "@/hooks/useToggle";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTrash,
  FaEdit,
  FaTimes,
} from "react-icons/fa";

function Table({ columnsHeading, usersData }) {
  const columns = useMemo(() => columnsHeading, [columnsHeading]);

  const data = useMemo(() => usersData, [usersData]);

  // const { togggle: active, setToggle: setActive, node } = useToggle();

  // const showMenu = (i) => {
  //   if (active === i) {
  //     return setActive(null);
  //   }

  //   setActive(i);
  // };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    // selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 20 },
      // defaultColumn: {
      //   minWidth: 150,
      // },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    // <div className="flex flex-col items-stretch  px-7 py-10">
    <div className="bg-white rounded-xl shadow-md py-5">
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="flex flex-col items-stretch overflow-x-auto">
        <table
          {...getTableProps()}
          className="table-auto text-xs lg:text-base shadow-none rounded-none"
        >
          <thead className="">
            {headerGroups.map((headerGroup, i) => (
              <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, i) => (
                  <th
                    key={i}
                    {...column.getHeaderProps({
                      style: { width: column.width },
                    })}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    // style={{ width: column.width }}
                    className={`px-4 py-3 text-sm capitalize`}
                  >
                    {/* <span
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  > */}
                    <div className="flex items-center select-none">
                      {column.render("Header")}
                      {/* </span> */}
                      <span className="inline-block px-2">
                        {!column.disableSortBy && (
                          <div className="h-4 w-4">
                            {column.isSorted ? (
                              <span className="">
                                {column.isSortedDesc ? (
                                  <FaSortDown />
                                ) : (
                                  <FaSortUp />
                                )}
                              </span>
                            ) : (
                              // <FaSort />
                              <FaSort />
                            )}
                          </div>
                        )}
                      </span>
                    </div>
                    {/* <div className="mt-2 text-black font-normal">
                      {column.canFilter ? column.render("Filter") : null}
                    </div> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  key={i}
                  {...row.getRowProps()}
                  className={"hover:bg-cyan-50 transition duration-200"}
                  // className={`hover:bg-cyan-50 transition duration-200 ${
                  //   active === i && "bg-cyan-50"
                  // }`}
                >
                  {row.cells.map((cell, i) => {
                    return (
                      <td
                        key={i}
                        {...cell.getCellProps()}
                        className="px-4 py-3 text-sm text-gray-700 lg:break-all font-semibold border-collapse border border-x-0 border-y-gray-100"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-7 text-sm">
        <div className="">
          <span className="text-sm">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
        </div>

        <div className="space-x-5 flex flex-col lg:flex-row gap-5 lg:gap-0">
          <span>
            Rows per page:{" "}
            <select
              className="outline-none w-14 p-1 border border-slate-300 text-sm rounded-md"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[20, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </span>

          <span>
            Go to page:{" "}
            <input
              type="number"
              min="1"
              max={pageOptions.length}
              className="w-14 p-1 text-sm outline-none border border-slate-500 rounded-md"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
            />
          </span>
        </div>

        <div className="flex gap-1">
          <button
            className="p-1 text-sm rounded-sm bg-cyan-300 active:bg-cyan-400 disabled:opacity-50 disabled:active:bg-cyan-300 disabled:cursor-not-allowed"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <FaAngleDoubleLeft />
          </button>
          <button
            className="bg-cyan-300 active:bg-cyan-400 px-3 py-1 rounded-sm text-sm disabled:opacity-50 disabled:active:bg-cyan-300 disabled:cursor-not-allowed"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </button>
          <button
            className="bg-cyan-300 active:bg-cyan-400 px-3 py-1 rounded-sm text-sm disabled:opacity-50 disabled:active:bg-cyan-300 disabled:cursor-not-allowed"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </button>
          <button
            className="p-1 text-sm rounded-sm bg-cyan-300 active:bg-cyan-400 disabled:opacity-50 disabled:active:bg-cyan-300 disabled:cursor-not-allowed"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <FaAngleDoubleRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Table;
