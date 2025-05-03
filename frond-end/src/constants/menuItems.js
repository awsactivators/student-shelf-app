// export const userMenuItems = [
//   {
//     label: "Profile",
//     submenu: [
//       { label: "User Info", path: "/user-info" },
//       { label: "Password", path: "/password" },
//       { label: "Listings", path: "/listings" },
//       { label: "Settings", submenu: [], path: "/settings" },
//       { label: "Notifications", path: "/notifications", hasNew: true },
//       {
//         label: "Support",
//         submenu: [
//           { label: "FAQs", path: "/support/faqs" },
//           { label: "Contact", path: "/support/contact" }
//         ],
//       },
//       { label: "Terms Policy", path: "/agreement/terms" }
//     ],
//   },
// ];


export const userMenuItems = [
  {
    label: "Profile",
    submenu: [
      { label: "User Info", path: "/user-info" },
      { label: "Password", path: "/password" },
      { label: "Listings", path: "/listings" },
      { label: "Favorites", path: "/favorites" },
      { label: "Settings", submenu: [], path: "/settings" },
      { label: "Notifications", path: "/notifications", hasNew: true },
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
  // { label: "Terms Policy", path: "/agreement/terms" }
];