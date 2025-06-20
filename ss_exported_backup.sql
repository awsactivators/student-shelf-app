--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9 (Debian 16.9-1.pgdg120+1)
-- Dumped by pg_dump version 16.9 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: avnadmin
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO avnadmin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ActivityLogs; Type: TABLE; Schema: public; Owner: avnadmin
--

CREATE TABLE public."ActivityLogs" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    action character varying(255) NOT NULL,
    description text,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ActivityLogs" OWNER TO avnadmin;

--
-- Name: ActivityLogs_id_seq; Type: SEQUENCE; Schema: public; Owner: avnadmin
--

CREATE SEQUENCE public."ActivityLogs_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ActivityLogs_id_seq" OWNER TO avnadmin;

--
-- Name: ActivityLogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: avnadmin
--

ALTER SEQUENCE public."ActivityLogs_id_seq" OWNED BY public."ActivityLogs".id;


--
-- Name: Contacts; Type: TABLE; Schema: public; Owner: avnadmin
--

CREATE TABLE public."Contacts" (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    subject character varying(255),
    message text,
    status character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer
);


ALTER TABLE public."Contacts" OWNER TO avnadmin;

--
-- Name: Contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Contacts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Contacts_id_seq" OWNER TO avnadmin;

--
-- Name: Contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Contacts_id_seq" OWNED BY public."Contacts".id;


--
-- Name: Favorites; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Favorites" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "favoriteUserId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."Favorites" OWNER TO avnadmin;

--
-- Name: Favorites_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Favorites_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Favorites_id_seq" OWNER TO avnadmin;

--
-- Name: Favorites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Favorites_id_seq" OWNED BY public."Favorites".id;


--
-- Name: Flags; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Flags" (
    id integer NOT NULL,
    reason character varying(255) NOT NULL,
    comment text,
    "userId" integer NOT NULL,
    "listingId" integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Flags" OWNER TO avnadmin;

--
-- Name: Flags_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Flags_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Flags_id_seq" OWNER TO avnadmin;

--
-- Name: Flags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Flags_id_seq" OWNED BY public."Flags".id;


--
-- Name: Listings; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Listings" (
    id integer NOT NULL,
    title character varying(255),
    description text,
    category character varying(255),
    subcategory character varying(255),
    price numeric,
    images json,
    "coverImage" character varying(255),
    "userId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Listings" OWNER TO avnadmin;

--
-- Name: Listings_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Listings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Listings_id_seq" OWNER TO avnadmin;

--
-- Name: Listings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Listings_id_seq" OWNED BY public."Listings".id;


--
-- Name: Messages; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Messages" (
    id integer NOT NULL,
    "senderId" integer NOT NULL,
    "receiverId" integer NOT NULL,
    "messageText" text,
    "imageUrl" character varying(255),
    read boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Messages" OWNER TO avnadmin;

--
-- Name: Messages_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Messages_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Messages_id_seq" OWNER TO avnadmin;

--
-- Name: Messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Messages_id_seq" OWNED BY public."Messages".id;


--
-- Name: Notifications; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Notifications" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    type character varying(255) NOT NULL,
    message character varying(255) NOT NULL,
    link character varying(255),
    "isRead" boolean DEFAULT false,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Notifications" OWNER TO avnadmin;

--
-- Name: Notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Notifications_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Notifications_id_seq" OWNER TO avnadmin;

--
-- Name: Notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Notifications_id_seq" OWNED BY public."Notifications".id;


--
-- Name: Reviews; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Reviews" (
    id integer NOT NULL,
    "sellerId" integer NOT NULL,
    "buyerId" integer NOT NULL,
    rating integer NOT NULL,
    comment text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Reviews" OWNER TO avnadmin;

--
-- Name: Reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Reviews_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Reviews_id_seq" OWNER TO avnadmin;

--
-- Name: Reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Reviews_id_seq" OWNED BY public."Reviews".id;


--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO avnadmin;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255) NOT NULL,
    password character varying(255),
    campus character varying(255),
    bio text,
    policy text,
    "phoneNumber" character varying(255),
    "profileImage" character varying(255),
    rating numeric,
    "activeListings" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "isVerified" boolean DEFAULT true NOT NULL,
    "isAdmin" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Users" OWNER TO avnadmin;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO avnadmin;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: ActivityLogs id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."ActivityLogs" ALTER COLUMN id SET DEFAULT nextval('public."ActivityLogs_id_seq"'::regclass);


--
-- Name: Contacts id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Contacts" ALTER COLUMN id SET DEFAULT nextval('public."Contacts_id_seq"'::regclass);


--
-- Name: Favorites id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Favorites" ALTER COLUMN id SET DEFAULT nextval('public."Favorites_id_seq"'::regclass);


--
-- Name: Flags id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Flags" ALTER COLUMN id SET DEFAULT nextval('public."Flags_id_seq"'::regclass);


--
-- Name: Listings id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Listings" ALTER COLUMN id SET DEFAULT nextval('public."Listings_id_seq"'::regclass);


--
-- Name: Messages id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Messages" ALTER COLUMN id SET DEFAULT nextval('public."Messages_id_seq"'::regclass);


--
-- Name: Notifications id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Notifications" ALTER COLUMN id SET DEFAULT nextval('public."Notifications_id_seq"'::regclass);


--
-- Name: Reviews id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Reviews" ALTER COLUMN id SET DEFAULT nextval('public."Reviews_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Data for Name: ActivityLogs; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."ActivityLogs" (id, "userId", action, description, "createdAt", "updatedAt") FROM stdin;
1	1	Add Listing	User Genevieve added a new listing titled "Lace wigs"	2025-06-11 23:10:59.351+00	2025-06-11 23:10:59.351+00
2	2	Suspend User	Suspended user 6	2025-06-13 02:19:59.375+00	2025-06-13 02:19:59.375+00
3	3	Add Listing	User James added a new listing titled "Handmade Soap"	2025-06-16 00:09:59.275+00	2025-06-16 00:09:59.275+00
4	4	Add Listing	User Trisha added a new listing titled "Male haircuts"	2025-06-16 00:36:33.496+00	2025-06-16 00:36:33.496+00
5	4	Add Listing	User Trisha added a new listing titled "Men Braiding"	2025-06-16 00:46:41.053+00	2025-06-16 00:46:41.053+00
6	4	Add Listing	User Trisha added a new listing titled "Male Braids"	2025-06-16 00:49:20.683+00	2025-06-16 00:49:20.683+00
7	1	Add Listing	User Genevieve added a new listing titled "Wave curls wig"	2025-06-16 00:55:02.661+00	2025-06-16 00:55:02.661+00
8	1	Add Listing	User Genevieve added a new listing titled "Braided Wigs"	2025-06-16 01:00:43.006+00	2025-06-16 01:00:43.006+00
9	3	Add Listing	User James added a new listing titled "Tutoring services"	2025-06-16 01:09:11.67+00	2025-06-16 01:09:11.67+00
10	3	Delete Listing	User James deleted listing: Tutoring services	2025-06-16 01:10:12.338+00	2025-06-16 01:10:12.338+00
11	3	Add Listing	User James added a new listing titled "Peer Tutoring"	2025-06-16 01:14:09.037+00	2025-06-16 01:14:09.037+00
12	3	Add Listing	User James added a new listing titled "Test"	2025-06-16 15:10:51.317+00	2025-06-16 15:10:51.317+00
13	3	Update Listing	User James updated listing: Test	2025-06-16 15:11:34.41+00	2025-06-16 15:11:34.41+00
14	3	Update Listing	User James updated listing: Test	2025-06-16 15:16:59.162+00	2025-06-16 15:16:59.162+00
15	3	Update Listing	User James updated listing: Test	2025-06-16 15:17:39.074+00	2025-06-16 15:17:39.074+00
16	1	Update Listing	User Genevieve updated listing: Wave curls wig	2025-06-16 15:18:08.204+00	2025-06-16 15:18:08.204+00
17	3	Update Listing	User James updated listing: Test	2025-06-16 15:20:53.108+00	2025-06-16 15:20:53.108+00
18	3	Update Listing	User James updated listing: Test	2025-06-16 15:21:21.592+00	2025-06-16 15:21:21.592+00
19	3	Update Listing	User James updated listing: Test	2025-06-16 15:21:34.795+00	2025-06-16 15:21:34.795+00
20	3	Add Listing	User James added a new listing titled "test2"	2025-06-16 21:28:39.827+00	2025-06-16 21:28:39.827+00
21	3	Update Listing	User James updated listing: Makeup	2025-06-16 22:03:35.899+00	2025-06-16 22:03:35.899+00
22	1	Add Listing	User Genevieve added a new listing titled "Nail Art"	2025-06-17 18:57:43.21+00	2025-06-17 18:57:43.21+00
23	1	Update Listing	User Genevieve updated listing: Nail Art	2025-06-17 18:58:02.874+00	2025-06-17 18:58:02.874+00
24	1	Delete Listing	User Genevieve deleted listing: Nail Art	2025-06-17 18:58:09.145+00	2025-06-17 18:58:09.145+00
\.


--
-- Data for Name: Contacts; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Contacts" (id, name, email, subject, message, status, "createdAt", "updatedAt", "userId") FROM stdin;
2	James	n09876543@humber.ca	Sidebar scroll issue	I have an issue using the sidebar on mobile, when I open it and try to scroll; it closes back, I have to hold down the sidebar to scroll.	pending	2025-06-16 18:33:32.096+00	2025-06-16 18:33:32.096+00	\N
1	James	n09876543@humber.ca	Deployment test	I am testing the admin support after deployment	resolved	2025-06-13 01:08:07.318+00	2025-06-16 18:34:48.367+00	\N
3	James	n09876543@humber.ca	Issue Notification	I don't receive notification when an issue I raised is resolved.	resolved	2025-06-16 19:19:56.124+00	2025-06-16 19:20:27.014+00	\N
4	Genevieve	n01613636@humber.ca	Issue Notification	I don't receive notification on issues I raised	resolved	2025-06-16 20:02:12.937+00	2025-06-16 20:03:35.741+00	\N
5	Genevieve	n01613636@humber.ca	Image upload	Image upload on messsage	resolved	2025-06-17 19:00:07.203+00	2025-06-17 19:02:21.371+00	\N
\.


--
-- Data for Name: Favorites; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Favorites" (id, "userId", "favoriteUserId", "createdAt", "updatedAt") FROM stdin;
1	3	1	2025-06-13 01:18:50.53+00	2025-06-13 01:18:50.53+00
3	4	1	2025-06-16 14:47:29.293+00	2025-06-16 14:47:29.293+00
4	3	4	2025-06-16 22:05:25.963+00	2025-06-16 22:05:25.963+00
5	1	4	2025-06-17 18:51:51.442+00	2025-06-17 18:51:51.442+00
\.


--
-- Data for Name: Flags; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Flags" (id, reason, comment, "userId", "listingId", "createdAt", "updatedAt") FROM stdin;
1	Incorrect info	Incorrect Info	3	1	2025-06-13 01:06:04.524+00	2025-06-13 01:06:04.524+00
\.


--
-- Data for Name: Listings; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Listings" (id, title, description, category, subcategory, price, images, "coverImage", "userId", "createdAt", "updatedAt") FROM stdin;
1	Lace wigs	All kinds of wigs	Product	Hair	65	"[\\"https://res.cloudinary.com/dqtokk1cn/image/upload/v1749683458/student-shelf/listings/1749683457945-1739306807108-pixie2.jpg.jpg\\",\\"https://res.cloudinary.com/dqtokk1cn/image/upload/v1749683458/student-shelf/listings/1749683457952-1739308483988-bone.jpeg.jpg\\",\\"https://res.cloudinary.com/dqtokk1cn/image/upload/v1749683458/student-shelf/listings/1749683457954-1739310886352-bouncy.jpeg.jpg\\"]"	https://res.cloudinary.com/dqtokk1cn/image/upload/v1749683458/student-shelf/listings/1749683457954-1739310886352-bouncy.jpeg.jpg	1	2025-06-11 23:10:59.305+00	2025-06-11 23:10:59.305+00
2	Handmade Soap	Unscented handmade soap	Product	Beauty & Personal Care	2	"[\\"https://res.cloudinary.com/dqtokk1cn/image/upload/v1750032598/student-shelf/listings/1750032598119-soap3.jpeg.jpg\\",\\"https://res.cloudinary.com/dqtokk1cn/image/upload/v1750032598/student-shelf/listings/1750032598119-soap2.jpeg.jpg\\",\\"https://res.cloudinary.com/dqtokk1cn/image/upload/v1750032598/student-shelf/listings/1750032598119-soap1.jpeg.jpg\\"]"	https://res.cloudinary.com/dqtokk1cn/image/upload/v1750032598/student-shelf/listings/1750032598119-soap3.jpeg.jpg	3	2025-06-16 00:09:59.237+00	2025-06-16 00:09:59.237+00
3	Male haircuts	All kinds of male haircut	Service	Hair & Beauty	35	"[\\"https://res.cloudinary.com/dqtokk1cn/image/upload/v1750034192/student-shelf/listings/1750034192032-hcut3.jpeg.jpg\\",\\"https://res.cloudinary.com/dqtokk1cn/image/upload/v1750034192/student-shelf/listings/1750034192094-hcut2.jpg.jpg\\",\\"https://res.cloudinary.com/dqtokk1cn/image/upload/v1750034192/student-shelf/listings/1750034192146-hcut1.jpeg.jpg\\"]"	https://res.cloudinary.com/dqtokk1cn/image/upload/v1750034192/student-shelf/listings/1750034192587-hcut3.jpeg.jpg	4	2025-06-16 00:36:33.461+00	2025-06-16 00:36:33.461+00
4	Men Braiding	All kinds of braiding for men	Service	Hair & Beauty	40	"[\\"https://res.cloudinary.com/dqtokk1cn/image/upload/v1750034800/student-shelf/listings/1750034800059-braid1.jpg.jpg\\",\\"https://res.cloudinary.com/dqtokk1cn/image/upload/v1750034800/student-shelf/listings/1750034800090-braid2.jpg.jpg\\",\\"https://res.cloudinary.com/dqtokk1cn/image/upload/v1750034800/student-shelf/listings/1750034800122-braid3.jpg.jpg\\"]"	https://res.cloudinary.com/dqtokk1cn/image/upload/v1750034800/student-shelf/listings/1750034800139-braid1.jpg.jpg	4	2025-06-16 00:46:41.015+00	2025-06-16 00:46:41.015+00
5	Male Braids	All kinds of male briaded hair	Service	Hair & Beauty	55	"[\\"https://res.cloudinary.com/dqtokk1cn/image/upload/v1750034959/student-shelf/listings/1750034958954-dr3.jpg.jpg\\",\\"https://res.cloudinary.com/dqtokk1cn/image/upload/v1750034959/student-shelf/listings/1750034959338-dr2.jpg.jpg\\",\\"https://res.cloudinary.com/dqtokk1cn/image/upload/v1750034959/student-shelf/listings/1750034959340-dr1.jpg.jpg\\"]"	https://res.cloudinary.com/dqtokk1cn/image/upload/v1750034960/student-shelf/listings/1750034959653-dr3.jpg.jpg	4	2025-06-16 00:49:20.654+00	2025-06-16 00:49:20.654+00
7	Braided Wigs	All kinds of braided wigs	Product	Hair	55	"[\\"https://res.cloudinary.com/dqtokk1cn/image/upload/v1750035641/student-shelf/listings/1750035641123-wg3.png.png\\",\\"https://res.cloudinary.com/dqtokk1cn/image/upload/v1750035642/student-shelf/listings/1750035641648-wg2.jpg.jpg\\",\\"https://res.cloudinary.com/dqtokk1cn/image/upload/v1750035641/student-shelf/listings/1750035641650-wg1.jpeg.jpg\\"]"	https://res.cloudinary.com/dqtokk1cn/image/upload/v1750035641/student-shelf/listings/1750035641650-wg1.jpeg.jpg	1	2025-06-16 01:00:42.974+00	2025-06-16 01:00:42.974+00
6	Wave curls wig	Frontal wavy curl wigs	Product	Hair	75	"[\\"https://res.cloudinary.com/dqtokk1cn/image/upload/v1750035302/student-shelf/listings/1750035301812-wave3.jpg.jpg\\",\\"https://res.cloudinary.com/dqtokk1cn/image/upload/v1750035302/student-shelf/listings/1750035301812-wave2.jpg.jpg\\",\\"https://res.cloudinary.com/dqtokk1cn/image/upload/v1750035302/student-shelf/listings/1750035301812-wave1.jpeg.jpg\\"]"	https://res.cloudinary.com/dqtokk1cn/image/upload/v1750035302/student-shelf/listings/1750035301812-wave1.jpeg.jpg	1	2025-06-16 00:55:02.631+00	2025-06-16 15:18:08.144+00
11	Makeup	All events kind of makeup.	Service	Hair & Beauty	25	"[\\"https://res.cloudinary.com/dqtokk1cn/image/upload/v1750109319/student-shelf/listings/1750109318708-mk3.jpg.jpg\\",\\"https://res.cloudinary.com/dqtokk1cn/image/upload/v1750109319/student-shelf/listings/1750109318708-mk2.webp.webp\\",\\"https://res.cloudinary.com/dqtokk1cn/image/upload/v1750109319/student-shelf/listings/1750109318759-mk1.webp.webp\\"]"	https://res.cloudinary.com/dqtokk1cn/image/upload/v1750109319/student-shelf/listings/1750109318790-mk1.webp.webp	3	2025-06-16 21:28:39.754+00	2025-06-16 22:03:35.863+00
\.


--
-- Data for Name: Messages; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Messages" (id, "senderId", "receiverId", "messageText", "imageUrl", read, "createdAt", "updatedAt") FROM stdin;
1	3	1	Hi	\N	t	2025-06-13 01:19:07.388+00	2025-06-13 01:21:04.761+00
2	1	3	Hello James	\N	t	2025-06-16 13:54:51.143+00	2025-06-16 13:54:53.706+00
4	1	3	hey	\N	f	2025-06-17 18:52:31.176+00	2025-06-17 18:52:31.176+00
3	4	1	Hello Genevieve	\N	t	2025-06-16 14:47:41.823+00	2025-06-17 18:53:13.013+00
5	1	4	Hey	\N	t	2025-06-17 18:53:20.906+00	2025-06-17 18:53:33.661+00
6	4	1	hey	https://res.cloudinary.com/dqtokk1cn/image/upload/v1750186431/student-shelf/messages/1750186430910-nail1.jpg.jpg	t	2025-06-17 18:53:52.409+00	2025-06-17 18:53:53.77+00
7	4	1		\N	t	2025-06-17 18:53:52.967+00	2025-06-17 18:53:53.77+00
\.


--
-- Data for Name: Notifications; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Notifications" (id, "userId", type, message, link, "isRead", "createdAt", "updatedAt") FROM stdin;
1	1	favorite	James favorited your profile.	/seller/3	f	2025-06-13 01:18:50.573+00	2025-06-13 01:18:50.573+00
2	1	message	You have a new message from James	/messages/3	t	2025-06-13 01:19:07.429+00	2025-06-13 01:21:03.844+00
3	3	message	You have a new message from Genevieve	/messages/1	f	2025-06-16 13:54:51.181+00	2025-06-16 13:54:51.181+00
4	4	favorite	Genevieve favorited your profile.	/seller/1	f	2025-06-16 13:55:48.303+00	2025-06-16 13:55:48.303+00
5	4	review	Genevieve left a review on your profile.	/seller/4	f	2025-06-16 14:45:57.014+00	2025-06-16 14:45:57.014+00
6	1	review	James left a review on your profile.	/seller/1	f	2025-06-16 14:46:20.283+00	2025-06-16 14:46:20.283+00
7	1	favorite	Trisha favorited your profile.	/seller/4	f	2025-06-16 14:47:29.325+00	2025-06-16 14:47:29.325+00
8	1	message	You have a new message from Trisha	/messages/4	f	2025-06-16 14:47:41.869+00	2025-06-16 14:47:41.869+00
9	1	review	Trisha left a review on your profile.	/seller/1	f	2025-06-16 14:48:07.906+00	2025-06-16 14:48:07.906+00
10	1	review	Trisha left a review on your profile.	/seller/1	f	2025-06-16 14:49:01.776+00	2025-06-16 14:49:01.776+00
11	1	support	Issue raised (“Issue Notification”) on June 16, 2025 has been resolved.	/support/contact	f	2025-06-16 20:03:35.823+00	2025-06-16 20:03:35.823+00
12	4	favorite	James favorited your profile.	/seller/3	f	2025-06-16 22:05:25.998+00	2025-06-16 22:05:25.998+00
13	4	favorite	Genevieve favorited your profile.	/seller/1	f	2025-06-17 18:51:51.479+00	2025-06-17 18:51:51.479+00
14	3	message	You have a new message from Genevieve	/messages/1	f	2025-06-17 18:52:31.213+00	2025-06-17 18:52:31.213+00
15	4	message	You have a new message from Genevieve	/messages/1	t	2025-06-17 18:53:20.945+00	2025-06-17 18:53:32.776+00
16	1	message	You have a new message from Trisha	/messages/4	f	2025-06-17 18:53:52.446+00	2025-06-17 18:53:52.446+00
17	1	message	You have a new message from Trisha	/messages/4	f	2025-06-17 18:53:52.997+00	2025-06-17 18:53:52.997+00
18	4	review	Genevieve left a review on your profile.	/seller/4	f	2025-06-17 18:54:38.726+00	2025-06-17 18:54:38.726+00
19	1	support	Issue “Image upload” raised on June 17, 2025 has been resolved.	/support/contact	f	2025-06-17 19:02:21.437+00	2025-06-17 19:02:21.437+00
\.


--
-- Data for Name: Reviews; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Reviews" (id, "sellerId", "buyerId", rating, comment, "createdAt", "updatedAt") FROM stdin;
1	4	1	5	Nice hair cut service	2025-06-16 14:45:56.878+00	2025-06-16 14:45:56.878+00
2	1	3	5	Good quality hair and affordable	2025-06-16 14:46:20.178+00	2025-06-16 14:46:20.178+00
3	1	4	4	I love the wigs	2025-06-16 14:48:07.815+00	2025-06-16 14:48:07.815+00
4	1	4	5	Fast delivery and affordable	2025-06-16 14:49:01.681+00	2025-06-16 14:49:01.681+00
5	4	1	4	Awesome Service	2025-06-17 18:54:38.628+00	2025-06-17 18:54:38.628+00
\.


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."SequelizeMeta" (name) FROM stdin;
20250209220708-create-user.js
20250209220744-create-listing.js
20250303013056-add_isVerified_to_users.js
20250303022809-create-reviews.js
20250502225113-create-favorites.js
20250503010646-create-notifications.js
20250505174613-create-messages.js
20250509030033-create-flag.js
20250510213732-add-isAdmin-to-users.js
20250513031305-create-contact.js
20250513032251-add-userId-to-contacts.js
20250513033019-add-default-isVerified.js
20250513231230-create-activitylog.js
20250613015758-add-unique-constraint-to-user-email.js
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."Users" (id, name, email, password, campus, bio, policy, "phoneNumber", "profileImage", rating, "activeListings", "createdAt", "updatedAt", "isVerified", "isAdmin") FROM stdin;
2	Admin User	n01234567@humber.ca	$2a$10$Pmlkk/AtjStrPQZDRfrr8euS.M7bPliG6AVLPFmyf2tbVWroAR7sG	North	\N	\N	\N	\N	\N	\N	2025-06-12 23:39:21.74+00	2025-06-12 23:39:21.74+00	t	t
6	Theodore	n01613030@humber.ca	$2a$10$bIHwDIhFiXgvVoyoBJhxLeKSs5lFjcRsQ8UY3KJUwsbLFj/SbXI9q	North	\N	\N	\N	\N	0	0	2025-06-13 02:19:29.025+00	2025-06-13 02:19:59.326+00	f	f
4	Trisha	n01122334@humber.ca	$2a$10$LiO2w5HHUYNEs9EMwCzQNenAVG0YFDeCRFACk0EUfp6QLJo2U/tjC	IGS	\N	\N	\N	https://res.cloudinary.com/dqtokk1cn/image/upload/v1750035052/student-shelf/profile/1750035052535-prof1.jpg.jpg	4.5	0	2025-06-13 01:44:58.643+00	2025-06-17 18:54:38.693+00	t	f
1	Genevieve	n01613636@humber.ca	$2a$10$CKKYOLW8xnhAz9ZhEIK6u.ewkFBgykY4ieslAqIctttxigIojZJ7.	North	Hair service	\N	\N	https://res.cloudinary.com/dqtokk1cn/image/upload/v1750186582/student-shelf/profile/1750186582248-nail1.jpg.jpg	4.7	0	2025-06-11 17:15:21.385+00	2025-06-17 18:56:23.511+00	t	f
3	James	n09876543@humber.ca	$2a$10$dq8x3wkY8ENzRjLyltniq.lXTCHJAxYE8kaSEywdxLpG85xg.hnqC	Lakeshore	\N	\N	\N	\N	0	0	2025-06-13 01:04:50.733+00	2025-06-17 18:59:04.487+00	t	f
\.


--
-- Name: ActivityLogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."ActivityLogs_id_seq"', 24, true);


--
-- Name: Contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Contacts_id_seq"', 5, true);


--
-- Name: Favorites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Favorites_id_seq"', 5, true);


--
-- Name: Flags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Flags_id_seq"', 3, true);


--
-- Name: Listings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Listings_id_seq"', 12, true);


--
-- Name: Messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Messages_id_seq"', 7, true);


--
-- Name: Notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Notifications_id_seq"', 19, true);


--
-- Name: Reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Reviews_id_seq"', 5, true);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."Users_id_seq"', 6, true);


--
-- Name: ActivityLogs ActivityLogs_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."ActivityLogs"
    ADD CONSTRAINT "ActivityLogs_pkey" PRIMARY KEY (id);


--
-- Name: Contacts Contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Contacts"
    ADD CONSTRAINT "Contacts_pkey" PRIMARY KEY (id);


--
-- Name: Favorites Favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Favorites"
    ADD CONSTRAINT "Favorites_pkey" PRIMARY KEY (id);


--
-- Name: Flags Flags_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Flags"
    ADD CONSTRAINT "Flags_pkey" PRIMARY KEY (id);


--
-- Name: Listings Listings_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Listings"
    ADD CONSTRAINT "Listings_pkey" PRIMARY KEY (id);


--
-- Name: Messages Messages_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Messages"
    ADD CONSTRAINT "Messages_pkey" PRIMARY KEY (id);


--
-- Name: Notifications Notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "Notifications_pkey" PRIMARY KEY (id);


--
-- Name: Reviews Reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "Reviews_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Users unique_user_email_constraint; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT unique_user_email_constraint UNIQUE (email);


--
-- Name: ActivityLogs ActivityLogs_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."ActivityLogs"
    ADD CONSTRAINT "ActivityLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Contacts Contacts_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Contacts"
    ADD CONSTRAINT "Contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE SET NULL;


--
-- Name: Favorites Favorites_favoriteUserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Favorites"
    ADD CONSTRAINT "Favorites_favoriteUserId_fkey" FOREIGN KEY ("favoriteUserId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Favorites Favorites_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Favorites"
    ADD CONSTRAINT "Favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Flags Flags_listingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Flags"
    ADD CONSTRAINT "Flags_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES public."Listings"(id) ON DELETE CASCADE;


--
-- Name: Flags Flags_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Flags"
    ADD CONSTRAINT "Flags_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Messages Messages_receiverId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Messages"
    ADD CONSTRAINT "Messages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Messages Messages_senderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Messages"
    ADD CONSTRAINT "Messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Notifications Notifications_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "Notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Reviews Reviews_buyerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "Reviews_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: Reviews Reviews_sellerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "Reviews_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO avnadmin;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO avnadmin;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO avnadmin;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO avnadmin;


--
-- PostgreSQL database dump complete
--

