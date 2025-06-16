# BACKEND EXPLANATION

## User Controller

Tech Stack & Tools Used
	•	Node.js + Express: Server-side runtime and web framework
	•	Sequelize (ORM): For interacting with the relational database (e.g., PostgreSQL or MySQL)
	•	bcryptjs: For hashing passwords securely
	•	jsonwebtoken (JWT): For generating access tokens to authenticate users
	•	Cloudinary: For storing and serving uploaded profile images
	•	multer & multer-storage-cloudinary: Middleware for handling multipart/form-data (image uploads)
	•	async-handler: Wraps async routes to handle exceptions more cleanly


Route Breakdown & Functionalities

1. User Registration (POST /api/users/register)

Function: registerUser
	•	Purpose: Registers a new user into the database.
	•	Steps:
	1.	Validates name, email, campus, and password.
	2.	Checks if email is already registered.
	3.	Hashes the password with bcrypt for security.
	4.	Creates the user record using Sequelize ORM.
	•	Why bcrypt? To protect user passwords in case of data breaches.
	•	Returns: JSON response with basic user info (no password) and a success message.

2. Login User (POST /api/users/login)

Function: loginUser
	•	Purpose: Authenticates a user and returns a JWT token.
	•	Steps:
	1.	Finds user by email.
	2.	Validates password with bcrypt.compare.
	3.	Checks if user account is verified (not suspended).
	4.	Generates JWT token that expires in 1 year.
	5.	Returns token + user data (excluding password).
	•	Why JWT? Stateless authentication, making session handling scalable.

3. Get Current User Profile (GET /api/users/me)

Function: getUserProfile
	•	Purpose: Fetches logged-in user’s profile and listings.
	•	Includes:
	•	All listings (userListings) by this user.
	•	All received reviews (Review model with buyer.name).
	•	Processes the profile image to ensure a fallback if not set.
	•	Why Sequelize include? To fetch related models in one query (joins).
	•	Auth: Requires a valid token to identify the user via req.user.id.

4. Update Profile (PUT /api/users/update)

Function: updateUserProfile
	•	Purpose: Allows users to update their personal info (name, bio, phone, etc.)
	•	Security: Email is not updated to prevent identity hijacking.
	•	Why this pattern? Allows partial updates while preserving existing data.

5. Upload Profile Image (POST /api/users/upload-profile-image)

Function: uploadProfileImage
	•	Purpose: Uploads a new profile image to Cloudinary and saves the URL.
	•	Cloudinary Middleware: multer + multer-storage-cloudinary automatically handles upload and stores the path.
	•	Validation: Checks that a file is uploaded.
	•	Returns: Public image URL.

6. Update Password (PUT /api/users/update-password)

Function: updateUserPassword
	•	Purpose: Securely allows user to change their password.
	•	Steps:
	1.	Compares old password using bcrypt.compare.
	2.	Hashes the new password.
	3.	Saves the updated password.
	•	Security Tip: Never expose raw passwords, even in logs.

7. Get User by ID (GET /api/users/:id)

Function: getUserById
	•	Purpose: Public route to fetch basic profile data for a given user.
	•	Used for: Displaying seller profile info (like name and image) in listings, reviews, etc.
	•	Profile Image Handling:
	•	Returns default image if none is set.
	•	Converts relative path to full URL using request metadata (req.protocol, req.get('host')).

Middleware Expectations
	•	These functions rely on authentication middleware to populate req.user (especially for /me, /update, etc.).
	•	Also assumes Sequelize models (User, Listing, Review) are properly associated with correct aliases.



## Seller Controller

OVERVIEW: What is the Seller Controller for?

The sellerController.js is responsible for handling public-facing endpoints related to a seller’s profile, their listings, and details about specific listings.

It doesn’t require authentication (@access Public) because it’s meant to display seller information to any user browsing the marketplace (whether logged in or not).

This controller uses:
	•	Sequelize ORM for querying the database
	•	Express.js with asyncHandler to simplify error handling
	•	Models: User, Listing, Review

CONTROLLER 1: getSellerById

Route: GET /api/sellers/:id
Purpose: Fetch all profile data for a seller (including their reviews and listings)

What it does:
	1.	Extracts the seller’s ID from the request parameters.
	2.	Queries the User model using findByPk (Primary Key) to find the seller.
	•	It includes associated listings (userListings) — shows what the seller is offering.
	•	It includes reviews for the seller — with buyer names.
	3.	Profile Image Handling:
	•	If the image URL is already hosted (starts with http), it’s returned as-is.
	•	If not (e.g., local file path), it prepends the API base URL.
	•	If there’s no profile image, it falls back to a default.

What is included in the JSON response:
	•	Seller details (name, campus, bio, rating, policy, etc.)
	•	All listings from that seller
	•	All reviews received (with rating, comment, and buyer name)

Why include everything?

This route powers the seller’s profile page (public view), so the frontend can:
	•	Display their bio
	•	Load their listings
	•	Show reviews from buyers
	•	Show their overall credibility (rating + verification status)

CONTROLLER 2: getSellerListings

Route: GET /api/sellers/:sellerId/listings
Purpose: Get all active listings by a specific seller

 What it does:
	1.	Verifies if the seller exists using User.findByPk.
	2.	If valid, fetches all listings where userId = sellerId.
	3.	Filters output to include:
	•	Listing id, title, coverImage, price, and category
	•	Sorts listings by most recent (createdAt DESC)

Why split this from getSellerById?
	•	For optimization: Sometimes, you only want listings (e.g., seller’s shop tab), not the entire profile with reviews.

CONTROLLER 3: getSellerListingById

Route: GET /api/sellers/:sellerId/listings/:listingId
Purpose: Get a specific listing posted by a specific seller

What it does:
	1.	Uses a findOne query on Listing where:
	•	id = listingId
	•	userId = sellerId (so only listings that belong to that seller are shown)
	2.	Includes seller info (user alias) such as name, campus, rating, profile image, etc.
	3.	If images is stored as a JSON string in DB (like ["img1.jpg", "img2.jpg"]), it ensures it’s parsed into a proper array before sending to frontend.

What data does this route return?
	•	Title, price, category, coverImage, all images
	•	Seller details like name, campus, rating

Why this check matters:
	•	You want to make sure users cannot access listings that aren’t linked to that seller (userId match).
	•	Helps to show seller identity on a single listing detail page.



## Review Controller

Handles:
	•	Users leaving reviews for sellers
	•	Fetching all reviews for a seller

1. addReview

Route: POST /api/reviews/:sellerId
Access: Private (user must be logged in)

What it does:
	1.	Grabs sellerId from the route param and rating & comment from the request body.
	2.	Validates inputs:
	•	If rating or comment is missing, it sends a 400 Bad Request.
	•	If the user isn’t authenticated (req.user is missing), it sends a 401 Unauthorized.
	3.	Confirms the seller exists:
	•	Uses User.findByPk(sellerId).
	•	If not found, throws a 404 error.
	4.	Creates a new review:
	•	Fills in the sellerId, buyerId (from req.user.id), rating, and comment.
	5.	Updates the seller’s average rating:
	•	Finds all reviews for that seller.
	•	Calculates the new average rating and updates the User.rating field.
	6.	Creates a notification for the seller:
	•	Type: 'review'
	•	Message includes the name of the reviewer (e.g., “Genevieve left a review…”)
	•	Link: Directs to the seller’s public profile page

Example use case:

When a buyer finishes a transaction, they visit the seller’s profile or a special review form and leave a review. This improves trust and seller ranking.

2. getReviewsBySeller

Route: GET /api/reviews/:sellerId
Access: Public

What it does:
	•	Fetches all reviews for a given seller.
	•	Includes buyer name by joining the User model (as "buyer").
	•	Sorts reviews from newest to oldest (createdAt DESC).

Example use case:

This is used to populate the reviews section on a seller’s public profile page, so other users can see feedback from buyers.

## Notification Controller

Handles:
	•	Fetching unread or all notifications
	•	Counting unread
	•	Marking notifications as read

1. getNotifications

Route: GET /api/notifications
Access: Private

What it does:
	•	Fetches all unread notifications for the logged-in user.
	•	Uses userId from req.user.id.
	•	Returns them in reverse chronological order (latest first).

2. getUnreadCount

Route: GET /api/notifications/unread-count
Access: Private

What it does:
	•	Counts how many unread notifications the current user has.
	•	Useful for showing a red dot or badge on the notification icon in the frontend.

3. markAsRead

Route: PUT /api/notifications/:id/read
Access: Private

What it does:
	•	Finds a notification by its id.
	•	If it exists, sets isRead = true and saves it.

Why this is important:
	•	Keeps users informed about key actions (like someone reviewing them).
	•	Encourages users to return to the platform when notified.


## Message Controller

This system enables real-time user-to-user chat, stores messages, fetches past conversations, and triggers notifications if users are offline.

Tech Highlights:
	•	Sequelize ORM for database access
	•	Cloudinary (optional) for image uploads
	•	Socket.IO for real-time messaging (global.io.to(...))
	•	Notifications model to alert offline users
	•	Sequelize Op.or for chat matching logic

1. getMessages

Route: GET /api/messages?userId=X&otherUserId=Y

What it does:
	•	Fetches all messages exchanged between two users.
	•	Uses Op.or to match where (sender=X and receiver=Y) or (sender=Y and receiver=X).
	•	Messages are returned in chronological order (createdAt ASC).

Use Case: Populates chat history when a conversation is opened.

2. sendMessage

Route: POST /api/messages

What it does:
	1.	Accepts senderId, receiverId, text, and optionally an image.
	2.	If the user sent an image, it stores the imageUrl via Cloudinary.
	3.	Sends the message real-time via WebSocket to the receiver’s room (user_+receiverId).
	4.	Saves the message to the DB with a read: false flag.
	5.	If the receiver is not online (activeChats[receiverId] !== senderId), it creates a notification.

Why this matters: Ensures message is saved and delivered instantly, or queued via notification.

3. getChatUsers

Route: GET /api/messages/users?userId=X

What it does:
	•	Finds all unique users that the current user has messaged or received messages from.
	•	Collects these users’ basic info (id, name, profileImage) and marks if there are unread messages.
	•	Returns a list of recent chat partners.

Use Case: Used to populate the chat sidebar or message contact list.

4. markMessagesAsRead

Route: PUT /api/messages/read

What it does:
	•	Sets all messages from otherUserId to current user as read: true.
	•	Triggered when user opens a chat window with another user.

Use Case: Helps remove unread indicators in the UI.



## Admin Controller

Handles everything for admin dashboard: managing users, listings, flags, support issues, activity logs, and stats.

Tech Highlights:
	•	Full Sequelize CRUD with joins (include)
	•	Relies on ActivityLog, Notification, and admin-only protected endpoints

1. USER MANAGEMENT

getAllUsers
	•	Returns all non-admin users.

suspendUser
	•	Sets isVerified = false.
	•	Adds entry to ActivityLog that an admin suspended the user.

reactivateUser
	•	Sets isVerified = true.
	•	Adds entry to ActivityLog that admin reactivated the user.

deleteUser
	•	Permanently deletes a user (caution: deletes related records unless cascaded properly).

Used for: Blocking or restoring platform access.

2. LISTING MANAGEMENT

getAllListings
	•	Returns all listings + their owners (via include: ["user"]).

deleteListing
	•	Deletes a listing by ID.

Used for: Moderating content.

3. FLAG MANAGEMENT

getAllFlags
	•	Lists all flagged listings with details about who flagged them (include: ["listing", "user"]).

dismissFlag
	•	Deletes a flag record (marks it as handled).

Used for: Reviewing inappropriate content reports.

4. SUPPORT/CONTACT MANAGEMENT

getAllContacts
	•	Returns all submitted contact messages ordered by newest first.

resolveContact
	•	Marks a support ticket as "resolved" and creates a notification for the user (if they’re registered).

Used for: Responding to complaints and user feedback.

5. ACTIVITY LOG

getActivityLogs
	•	Returns a history of admin actions, like suspending or reactivating users.
	•	Includes the admin user’s info via include.

Used for: Transparency and accountability of admin actions.

6. DASHBOARD METRICS

getDashboardStats
	•	Returns key counts:
	•	Total users
	•	Total listings
	•	Number of flagged items
	•	Number of unresolved support issues

Used for: Admin dashboard widgets or charts.


## Listings Controller

This controller powers the entire listing management system in your app: creating, updating, viewing, deleting, and searching listings.

Tech Stack Used:
	•	Express.js + express-async-handler: For defining and handling async route functions with error catching.
	•	Sequelize ORM: Interacts with the database via models (Listing, User, etc.).
	•	Cloudinary via Multer: Uploads and stores image files, handles req.files parsing.
	•	JWT Auth Middleware: Makes req.user available for user validation.
	•	ActivityLog model: Tracks what users do for auditability.

1. createListing

Route: POST /api/listings
Access: Private (logged-in users only)

Functionality:
	•	Validates all required fields: title, description, category, price.
	•	Requires at least one image (images[]) and optionally a coverImage.
	•	Stores all image paths in a JSON string for the images field.
	•	Automatically assigns the first image as the cover if no separate cover image is uploaded.
	•	Associates the listing with the currently logged-in user (req.user.id).
	•	Logs the action in ActivityLog.

Why:
This enables users to add new products/items to the marketplace. Cloudinary handles media efficiently, and ActivityLog helps admins trace changes.

2. getListings

Route: GET /api/listings
Access: Private
(Note: this function gets the logged-in user’s own listings)

Functionality:
	•	Extracts JWT from Authorization header to validate user.
	•	Fetches listings owned by the user from the database.
	•	Returns listings in descending order of creation.

Why:
Used in the “My Listings” or dashboard section so users can see what they’ve posted.

3. getListingById

Route: GET /api/listings/:id
Access: Private

Functionality:
	•	Fetches a listing by its primary key (ID).
	•	Includes related seller info via Sequelize association with User.
	•	Parses the images field (stored as JSON string) into an actual JS array for frontend usage.

Why:
Needed for displaying full listing details, like on the item page. Shows seller’s profile and multiple images.

4. updateListing

Route: PUT /api/listings/:id
Access: Private

Functionality:
	•	Checks if the listing exists and that the logged-in user is its owner.
	•	Accepts a new coverImage, new images, and existingImages from the frontend.
	•	Merges existingImages with any new uploads.
	•	Updates the listing and logs the update in ActivityLog.

Why:
This gives users the ability to edit their listings, including uploading more photos or changing details.

5. deleteListing

Route: DELETE /api/listings/:id
Access: Private

Functionality:
	•	Checks that listing exists and belongs to current user.
	•	Deletes the listing.
	•	Logs the deletion event in ActivityLog.

Why:
Allows users to remove their own listings. Useful for expired, sold, or incorrect listings.

6. searchListings

Route: GET /api/listings/search?query=...
Access: Public

Functionality:
	•	Searches the title column of listings for the provided keyword (case-insensitive, partial match using %).
	•	Returns only listing ID, title, coverImage, and price.

Why:
Used for the search bar functionality. Allows buyers to search for items.

7. getAllPublicListings

Route: GET /api/listings (different from user-owned one above)
Access: Public

Functionality:
	•	Returns all listings in the marketplace, not just those belonging to the current user.
	•	Includes seller information (User model) like name, campus, and profile image.

Why:
Used to populate the home page or public listing page for visitors or buyers.

8. searchPublicListings

Route: GET /api/listings/public/search?query=...
Access: Public

Functionality:
	•	Same as searchListings, but also includes seller info like name and campus.
	•	Meant to power a richer public search interface.



## Contact Controller

sendContactMessage

Route: POST /api/contact
Access: Public

Functionality:
	•	Receives name, email, subject, and message from the frontend.
	•	Stores this in the Contact table for admin review.

Why it’s used:
	•	This lets users submit support messages or feedback directly from your site (e.g., contact form).
	•	Admins can access, resolve, and notify users when their issues are handled (via the admin panel + notification logic).



## Favorite Controller

This module manages the user’s ability to favorite sellers (like a wishlist or following feature).

addFavorite

Route: POST /api/favorites/:sellerId
Access: Private

Functionality:
	•	Adds the given sellerId to the user’s favorites list.
	•	Prevents duplicate favorites by checking if it already exists.
	•	Sends a notification to the seller saying they were favorited.

Why it’s used:
	•	Encourages interaction between buyers and sellers.
	•	Helps buyers keep track of sellers they like.
	•	Notifies sellers they’re gaining attention.

removeFavorite

Route: DELETE /api/favorites/:sellerId
Access: Private

Functionality:
	•	Removes a seller from the user’s favorite list.

getFavorites

Route: GET /api/favorites
Access: Private

Functionality:
	•	Fetches all users favorited by the current user.
	•	Uses a Sequelize association (as: "favoriteUser") to return the id, name, and profileImage of each seller.

Note:
	•	Includes a filter to avoid returning deleted accounts (fav.favoriteUser !== null).



## Flags Controller

Used to report inappropriate or suspicious listings.

createFlag

Route: POST /api/flags
Access: Private

Functionality:
	•	Takes in a reason, optional comment, and the listingId being flagged.
	•	Prevents users from flagging the same listing more than once.
	•	Saves the flag with userId, listingId, reason, and comment.

Why it’s used:
	•	Adds a moderation layer to your marketplace.
	•	Helps admins identify and act on problematic listings via the admin dashboard.



## Search Controller

You have two separate but similar search logics—this one is your general search endpoint.

searchListings

Route: GET /api/search?query=...
Access: Private

Functionality:
	•	Searches listings where the title partially matches the query (LIKE '%query%').
	•	Returns minimal data for performance: id, title, coverImage, and price.

Why it’s used:
	•	Powers the search bar feature in your frontend so users can find items fast.
	•	Keeps results light by excluding unnecessary data (like descriptions or full image arrays).



# Middleware

## authMiddleware.js

This middleware ensures that only authenticated (and optionally admin) users can access certain routes.

protect

Purpose:
To verify if a user is authenticated before allowing access to protected routes.

How it works:
	1.	Looks for a Bearer token in the request header.
	2.	Uses jwt.verify() to decode the token using your JWT_SECRET.
	3.	Extracts the id from the token payload.
	4.	Finds the corresponding user in the database.
	5.	Attaches the user object to req.user for access in the next middleware/controller.
	6.	If token is invalid, missing, or user not found, it throws a 401 Unauthorized error.

adminOnly

Purpose:
To restrict certain routes to admin users only.

How it works:
	•	Checks if req.user.isAdmin is true.
	•	If not, throws a 403 Forbidden error.



## uploadMiddleware.js

This middleware handles image uploads via multer and stores them in Cloudinary, a cloud-based image storage and CDN.
Multer is a Node.js middleware used with Express to handle multipart/form-data, which is primarily used for uploading files.

Multer:
	•	Parses multipart/form-data request bodies (which standard body parsers like body-parser can’t handle).
	•	Extracts files from the request.
	•	Temporarily stores the files (either in memory, disk, or directly uploads to cloud, like Cloudinary).
	•	Makes the file data accessible through req.file or req.files.

Setup Summary
	•	cloudinary.config: Sets Cloudinary credentials from .env.
	•	CloudinaryStorage: A multer adapter to send uploaded images directly to Cloudinary.
	•	multer({ storage }): Initializes the uploader with the Cloudinary storage engine.

params function in CloudinaryStorage

This is where the file upload destination folder and format are defined dynamically:
	•	If req.listingUpload → uploads to student-shelf/listings/
	•	If req.profileUpload → uploads to student-shelf/profile/
	•	If req.messageUpload → uploads to student-shelf/messages/
	•	Otherwise defaults to student-shelf/other/

Allowed formats:
	•	["jpg", "jpeg", "png", "webp", "avif"] – ensures support for modern formats without changing code.

File name:
	•	Automatically appends a timestamp: 1707040423221-filename.jpg




# FRONTEND

## AddListing

The AddListingPage component lets users add or edit a product/service listing. It manages form input, image uploads, and submission to the backend.

React Hooks

useState()

Used to create and manage local state:
	•	title, description, category, etc.: form input fields.
	•	images: new images selected for upload.
	•	existingImages: images that already exist when editing.
	•	coverImage: the selected cover image.
	•	error: stores validation or API errors.
	•	isSidebarOpen: toggles the sidebar for mobile.
	•	Each useState ensures controlled inputs and UI reactivity.

useEffect()

Used to run side effects, like initializing data:
	•	On component mount (or when existingData/isEditing changes), it loads existing listing values and pre-selects the cover image.
	•	On route change (via location), it auto-closes the sidebar on small screens.

useLocation()
	•	Comes from react-router-dom.
	•	Used here to detect page changes so the sidebar can be closed automatically on mobile.

useNavigate()
	•	Allows programmatic routing.
	•	Used to redirect after submitting a form or canceling

Image Upload Logic
	•	New images go into images via handleImageUpload.
	•	You limit total images to 3, combining existing and new ones.
	•	If no cover image is selected, the first uploaded image becomes the default cover.
  •	handleCoverImageSelect lets user mark any image as cover.
	•	handleRemoveImage removes images and resets the cover if needed.

Form Submission Logic
	•	Submits via fetch as FormData, with:
	•	title, description, price, etc.
	•	New images (images)
	•	Existing image URLs (existingImages) if editing
	•	coverImage (string for existing, blob for new)
	•	Authorization token is added
  •	Method is POST (new) or PUT (update), based on isEditing.

Dynamic Subcategories
	•	Based on selected category (Product or Service), appropriate subcategories are shown from a JS object.
	•	If “Other” is selected, a text input appears to enter a custom subcategory.

Sidebar Logic
	•	Opens and closes on mobile via isSidebarOpen state.
	•	Clicking outside the sidebar (overlay) closes it.
	•	Uses Sidebar component with userMenuItems to show navigation.


## Contact

What This Page Does

This is the Contact Us page where a logged-in user can submit a message (e.g. complaint, inquiry, or feedback) to the support team or admin.
It has a form with fields for name, email (auto-filled), subject, and message.

⸻

🧱 Tech Used Here
	•	React Functional Component
	•	useState, useEffect, useLocation hooks
	•	fetch() for submitting the form to the backend
	•	Sidebar for navigation
	•	Some global and component-specific CSS styling

⸻

🧠 Key Concepts & Logic Explained

1. useState

These keep track of values in the form and other UI states:
	•	formData: holds input field values
	•	successMessage / errorMessage: show user feedback
	•	isSidebarOpen: toggles sidebar
	•	loading: disables the button while sending message

2. useEffect(() => {...}, [])

This runs once when the component loads.
	•	It grabs the logged-in user’s data from localStorage.
	•	If an email exists, it fills in the email field automatically.
	•	The user can’t change their email here (readOnly and disabled used).



## Message (Real-Time Chat System)

Purpose:

Enables users to privately message each other with text or images, similar to a mini chat system between buyers and sellers.

Tech Used:
	•	Socket.IO: Real-time updates (no need to refresh to see new messages).
	•	Fetch API: For loading historical messages and chat users.
	•	FormData: Used to send messages with optional images.
	•	Refs: Used to scroll to the newest message.
	•	Backend: Stores messages in the database, marks messages as read/unread.

Key Features:
	•	Loads all people the user has chatted with (chatUsers).
	•	Selects a chat partner (selectedUser).
	•	Fetches messages with that user from backend (GET /api/messages).
	•	Sends messages (text + image) to backend (POST /api/messages) and broadcasts them using sockets.
	•	Unread messages show a red dot beside the sender.
	•	Uses intervals to refresh chat and user list every 2 seconds (to keep it live).
	•	Automatically scrolls to the newest message unless the user scrolls up manually.



## 2. Favorite (User Likes/Favorites a Sellers)

Purpose:

Allows a user to “favorite” another user (usually a seller), which helps them remember or follow sellers they like.

Tech Used:
	•	Favorite Table (Sequelize): Stores which user liked which seller.
	•	JWT Auth: Required to add/remove favorites.
	•	Notification Trigger: Sends a notification to the seller when they are favorited.

Key Features:
	•	Adds/removes a favorite with POST/DELETE /api/favorites/:sellerId.
	•	Prevents duplicate favorites.
	•	On success, creates a notification for the seller (like: “Genevieve favorited your profile”).
	•	Favorites page (FavoritesPage.jsx) fetches all favorite users and displays them in a clean card-style layout.



## Notifications (User Notification Alerts)

Purpose:

Keeps users informed of important actions/events: new messages, favorites, reviews, system updates, etc.

Tech Used:
	•	Notifications Table (Sequelize): Stores type, message, isRead status, and link.
	•	Icons: Dynamic icons based on type (for favorite, for message, etc.).
	•	LocalStorage: Caches unread count.
	•	Route Navigation: Clicking a notification routes the user to the related page.

Key Features:
	•	Fetches notifications from backend (GET /api/notifications).
	•	Marks a notification as read when clicked (PATCH /api/notifications/:id/read).
	•	Keeps unread count in local storage and triggers UI update using window.dispatchEvent.
	•	Clicked notifications redirect based on type:
	•	"message" → opens chat.
	•	"favorite" → opens favoriter’s profile.
	•	Others → default to /notifications.