import Navbar from "./navbar";
import Footer from "./footer";
import { useRouter } from "next/router";
import AdminLayout from "./Admin/Layout";

const Layout = ({ children }) => {
  const { pathname } = useRouter();

  // console.log("pathname", router.pathname.startsWith("/admin"));

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return (
        <>
          <main className="">{children}</main>
        </>
      );
    }

    return (
      <>
        <AdminLayout>
          <main className="">{children}</main>
        </AdminLayout>
      </>
    );
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
