import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./styles/App.css"; 
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import ListingsPage from "./pages/ListingsPage";
import AddListingPage from "./pages/AddListingPage";
import SuccessPage from "./pages/SuccessPage";
import UserInfoPage from "./pages/UserInfoPage";
import PasswordPage from "./pages/PasswordPage";
import SettingsPage from "./pages/SettingsPage";
import NotificationsPage from "./pages/NotificationsPage";
import SearchResultPage from "./pages/SearchResultPage";
import ListingDetailsPage from "./pages/ListingDetailsPage";
import SellerPage from "./pages/SellerPage";
import SellerListingsPage from "./pages/SellerListingsPage";
import SellerListingDetailsPage from "./pages/SellerListingDetailsPage";
import MessagePage from "./pages/MessagePage";
import FAQsPage from "./pages/FAQsPage";
import ContactUsPage from "./pages/ContactUsPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ReviewPage from "./pages/ReviewPage";
import EditListingPage from "./pages/EditListingPage";

function Layout({ children, hasNewNotifications }) {
  const location = useLocation();

  // Define the pages where the Header or Footer should NOT be displayed
  const noHeaderFooterPages = ["/", "/register", "/login"];

  const showHeader = !noHeaderFooterPages.includes(location.pathname);
  const showFooter = !noHeaderFooterPages.includes(location.pathname);

  return (
    <div className="app-layout">
      {/* Conditionally render Header */}
      {showHeader && <Header  hasNewNotifications={hasNewNotifications}/>}
      <main className="app-content">{children}</main>
      {/* Conditionally render Footer */}
      {showFooter && <Footer />}
    </div>
  );
}

function App() {
  const hasNewNotifications = true;
  // const navigate = useNavigate(); 
  // const location = useLocation(); 

  // // Redirect to login if session expires
  // useEffect(() => {
  //   const token = localStorage.getItem("userToken");

  //   if (!token) {
  //     console.warn("Session expired or no token found. Redirecting to login.");
  //     navigate("/login");
  //   }
  // }, [location.pathname]); // Runs when the route changes

  return (
      <Layout hasNewNotifications={hasNewNotifications}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/add-listing" element={<AddListingPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/user-info" element={<UserInfoPage />} />
          <Route path="/password" element={<PasswordPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/seller/:sellerId/listings" element={<SellerListingsPage />} />
          <Route path="/seller/:sellerId/listing/:listingId" element={<SellerListingDetailsPage />} />
          <Route path="/message" element={<MessagePage />} />
          <Route path="/support/faqs" element={<FAQsPage />} />
          <Route path="/support/contact" element={<ContactUsPage />} />
          <Route path="/agreement/terms" element={<TermsPage />} />
          <Route path="/agreement/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/leave-review" element={<ReviewPage />} />
          <Route path="/leave-review/:sellerId" element={<ReviewPage />} />
          <Route path="/edit-listing/:id" element={<EditListingPage />} />
          <Route path="/listing/:id" element={<ListingDetailsPage />} />
          <Route path="/seller/:sellerId" element={<SellerPage />} />


        </Routes>
      </Layout>
  );
}

export default App;