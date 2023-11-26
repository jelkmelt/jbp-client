import Navbar from './navbar';
import Footer from './footer';

const Layout = ({ children }) => {
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
