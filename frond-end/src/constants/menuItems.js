export const userMenuItems = [
  {
    label: "Profile",
    submenu: [
      { label: "User Info", path: "/user-info" },
      { label: "Password", path: "/password" },
      { label: "My Listings", path: "/listings" },
      { label: "My Favorites", path: "/favorites" },
      { label: "Settings", submenu: [], path: "/settings" },
      { label: "Notifications", path: "/notifications", hasNew: true },
      // { label: "Logout", path: "/logout"},
    ],
  },
  {
    label: "Sell",
    submenu: [
      { label: "Add Listing", path: "/add-listing" },
    ],
  },
  {
    label: "Support",
    submenu: [
      { label: "FAQs", path: "/support/faqs" },
      { label: "Contact", path: "/support/contact" },
    ],
  },
  {
    label: "Agreement",
    submenu: [
      { label: "Terms & Conditions", path: "/agreement/terms" },
      { label: "Privacy Policy", path: "/agreement/privacy" }
    ],
  },

  { label: "Logout", path: "/logout"},
];