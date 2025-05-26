import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">{children}</main>
      <footer className="footer">
        <p>EyeAge © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Layout;
