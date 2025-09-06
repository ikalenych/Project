import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import RestaurantCard from "./components/Card/RestaurantCard";
import InformationSection from "./components/InformationSection/InformationSection";
import MainSection from "./components/MainSection/MainSection";
import Map from "./components/Map/Map";
import CustomerReviews from "./components/Reviews/Reviews";
import Similar from "./components/Similar/Similar";
import Footer from "./components/Footer/Footer";
import PageInProgress from "./components/PageInProgress/PageInProgress";
import ConfirmOrder from "./components/ConfirmOrder/ConfirmOrder";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <RestaurantCard />
              <MainSection />
              <InformationSection />
              <Map />
              <CustomerReviews />
              <Similar />
              <Footer />
            </>
          }
        />
        <Route path="/confirm-order" element={<ConfirmOrder />} />
        <Route path="/:pageName" element={<PageInProgress />} />
      </Routes>
    </Router>
  );
}

export default App;
