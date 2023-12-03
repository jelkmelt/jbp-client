// import PageTitle from "./PageTitle";
import useToggle from "@/hooks/useToggle";
import { useEffect } from "react";
import { useRouter } from "next/router";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { sidebarLinks } from "./sidebarLinks";

function AdminLayout({ children }) {
  const { toggle: showSidebar, setToggle: setShowSidebar, node } = useToggle();
  const { pathname } = useRouter();

  useEffect(() => {
    setShowSidebar(false);
  }, [pathname]);

  return (
    <div className="lg:flex">
      <AdminSidebar
        node={node}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        navLinks={sidebarLinks}
      />

      <div className="lg:flex-1 relative bg-gray-100">
        <AdminHeader
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />

        <div className="my-10 mx-2 lg:mx-7 min-h-[calc(100vh-68px)]">
          {/* <PageTitle /> */}

          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
