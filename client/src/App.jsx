import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import AppRoute from "./routes/AppRoutes";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <AppRoute />
      <Footer />
    </>
  );
};

export default App;
