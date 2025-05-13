import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
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
import FavoritesPage from "./pages/FavoritesPage";
import LogoutPage from "./pages/LogoutPage";

// Admin pages
import AdminLayout from "./pages/admin/layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminListings from "./pages/admin/AdminListings";
import AdminFlags from "./pages/admin/AdminFlags";
import AdminSupport from "./pages/admin/AdminSupport";

function Layout({ children }) {
  const location = useLocation();

  // Define the pages where the Header or Footer should NOT be displayed
  const noHeaderFooterPages = ["/", "/register", "/login"];

  const showHeader = !noHeaderFooterPages.includes(location.pathname);
  const showFooter = !noHeaderFooterPages.includes(location.pathname);

  return (
    <div className="app-layout">
      {/* Conditionally render Header */}
      {showHeader && <Header />}
      <main className="app-content">{children}</main>
      {/* Conditionally render Footer */}
      {showFooter && <Footer />}
    </div>
  );
}

function App() {

  return (
    <Routes>
      {/* Public and Protected Routes inside Layout */}
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={ <ProtectedRoute> <HomePage /> </ProtectedRoute>} />
              <Route path="/listings" element={ <ProtectedRoute> <ListingsPage /> </ProtectedRoute>} />
              <Route path="/add-listing" element={ <ProtectedRoute> <AddListingPage /> </ProtectedRoute>} />
              <Route path="/success" element={ <ProtectedRoute> <SuccessPage /> </ProtectedRoute>} />
              <Route path="/user-info" element={ <ProtectedRoute> <UserInfoPage /> </ProtectedRoute>} />
              <Route path="/password" element={ <ProtectedRoute> <PasswordPage /> </ProtectedRoute>} />
              <Route path="/settings" element={ <ProtectedRoute> <SettingsPage /> </ProtectedRoute>} />
              <Route path="/notifications" element={ <ProtectedRoute> <NotificationsPage /> </ProtectedRoute>} />
              <Route path="/search" element={ <ProtectedRoute> <SearchResultPage /> </ProtectedRoute>} />
              <Route path="/seller/:sellerId/listings" element={ <ProtectedRoute> <SellerListingsPage /> </ProtectedRoute>} />
              <Route path="/seller/:sellerId/listing/:listingId" element={ <ProtectedRoute> <SellerListingDetailsPage /> </ProtectedRoute>} />
              <Route path="/message" element={ <ProtectedRoute> <MessagePage /> </ProtectedRoute>} />
              <Route path="/messages/:receiverId" element={<ProtectedRoute> <MessagePage /> </ProtectedRoute>} />
              <Route path="/support/faqs" element={ <ProtectedRoute> <FAQsPage /> </ProtectedRoute>} />
              <Route path="/support/contact" element={ <ProtectedRoute> <ContactUsPage /> </ProtectedRoute>} />
              <Route path="/agreement/terms" element={ <ProtectedRoute> <TermsPage /> </ProtectedRoute>} />
              <Route path="/agreement/privacy" element={ <ProtectedRoute> <PrivacyPolicyPage /> </ProtectedRoute>} />
              <Route path="/leave-review" element={ <ProtectedRoute> <ReviewPage /> </ProtectedRoute>} />
              <Route path="/leave-review/:sellerId" element={ <ProtectedRoute> <ReviewPage /> </ProtectedRoute>} />
              <Route path="/edit-listing/:id" element={ <ProtectedRoute> <EditListingPage /> </ProtectedRoute>} />
              {/* <Route path="/listing/:id" element={ <ProtectedRoute> <ListingDetailsPage /> </ProtectedRoute>} /> */}
              <Route path="/listing/:id" element={  <ListingDetailsPage /> } />
              <Route path="/seller/:sellerId" element={ <ProtectedRoute> <SellerPage /> </ProtectedRoute>} />
              <Route path="/favorites" element={ <ProtectedRoute> <FavoritesPage /> </ProtectedRoute>} />
              <Route path="/logout" element={<LogoutPage />} />

              
            </Routes>
          </Layout>
        }
      />
      {/* Admin routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/listings" element={<AdminListings />} />
      <Route path="/admin/flags" element={<AdminFlags />} />
      <Route path="/admin/support" element={<AdminSupport />} />
    </Routes>
  );
}

export default App;