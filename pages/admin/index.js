import PageWrapper from "@/components/Admin/Layout/PageWrapper";
import Table from "@/components/Table";
import { UserListColumn } from "@/components/Table/columns/user-list-column";
import useGetData from "@/hooks/useGetData";
import React from "react";

function AdminPage() {
  const { data, isLoading, error } = useGetData({ path: "/get/data" });

  // console.log("data", data);
  const allUsers = data?.data;

  return (
    <PageWrapper
      title="All Users"
      isLoading={isLoading}
      // icon={<CircleStackIcon />}
    >
      {allUsers && (
        <Table columnsHeading={UserListColumn} usersData={allUsers} />
      )}
    </PageWrapper>
  );
}

export default AdminPage;
