--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Homebrew)
-- Dumped by pg_dump version 14.13 (Homebrew)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart; Type: TABLE; Schema: public; Owner: sdarr
--

CREATE TABLE public.cart (
    id integer NOT NULL,
    buyer_id integer,
    product_id integer,
    quantity integer NOT NULL
);


ALTER TABLE public.cart OWNER TO sdarr;

--
-- Name: cart_id_seq; Type: SEQUENCE; Schema: public; Owner: sdarr
--

CREATE SEQUENCE public.cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cart_id_seq OWNER TO sdarr;

--
-- Name: cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sdarr
--

ALTER SEQUENCE public.cart_id_seq OWNED BY public.cart.id;


--
-- Name: orderdetails; Type: TABLE; Schema: public; Owner: sdarr
--

CREATE TABLE public.orderdetails (
    id integer NOT NULL,
    order_id integer,
    product_id integer,
    quantity integer NOT NULL,
    price double precision NOT NULL
);


ALTER TABLE public.orderdetails OWNER TO sdarr;

--
-- Name: orderdetails_id_seq; Type: SEQUENCE; Schema: public; Owner: sdarr
--

CREATE SEQUENCE public.orderdetails_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orderdetails_id_seq OWNER TO sdarr;

--
-- Name: orderdetails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sdarr
--

ALTER SEQUENCE public.orderdetails_id_seq OWNED BY public.orderdetails.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: sdarr
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    buyer_id integer,
    order_status character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.orders OWNER TO sdarr;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: sdarr
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO sdarr;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sdarr
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: sdarr
--

CREATE TABLE public.products (
    id integer NOT NULL,
    seller_id integer,
    name character varying(255) NOT NULL,
    description text,
    quantity integer NOT NULL,
    price double precision NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.products OWNER TO sdarr;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: sdarr
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO sdarr;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sdarr
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: sdarr
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    product_id integer,
    user_id integer,
    rating integer,
    review_text text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.reviews OWNER TO sdarr;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: sdarr
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_id_seq OWNER TO sdarr;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sdarr
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: sellers; Type: TABLE; Schema: public; Owner: sdarr
--

CREATE TABLE public.sellers (
    id integer NOT NULL,
    user_id integer,
    store_name character varying(255) NOT NULL,
    store_description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.sellers OWNER TO sdarr;

--
-- Name: sellers_id_seq; Type: SEQUENCE; Schema: public; Owner: sdarr
--

CREATE SEQUENCE public.sellers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sellers_id_seq OWNER TO sdarr;

--
-- Name: sellers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sdarr
--

ALTER SEQUENCE public.sellers_id_seq OWNED BY public.sellers.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: sdarr
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    role character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO sdarr;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: sdarr
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO sdarr;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: sdarr
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: cart id; Type: DEFAULT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.cart ALTER COLUMN id SET DEFAULT nextval('public.cart_id_seq'::regclass);


--
-- Name: orderdetails id; Type: DEFAULT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.orderdetails ALTER COLUMN id SET DEFAULT nextval('public.orderdetails_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: sellers id; Type: DEFAULT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.sellers ALTER COLUMN id SET DEFAULT nextval('public.sellers_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);


--
-- Name: orderdetails orderdetails_pkey; Type: CONSTRAINT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.orderdetails
    ADD CONSTRAINT orderdetails_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: sellers sellers_pkey; Type: CONSTRAINT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.sellers
    ADD CONSTRAINT sellers_pkey PRIMARY KEY (id);


--
-- Name: cart unique_buyer_product; Type: CONSTRAINT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT unique_buyer_product UNIQUE (buyer_id, product_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: cart cart_buyer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_buyer_id_fkey FOREIGN KEY (buyer_id) REFERENCES public.users(id);


--
-- Name: cart cart_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: orderdetails orderdetails_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.orderdetails
    ADD CONSTRAINT orderdetails_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: orderdetails orderdetails_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.orderdetails
    ADD CONSTRAINT orderdetails_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: orders orders_buyer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_buyer_id_fkey FOREIGN KEY (buyer_id) REFERENCES public.users(id);


--
-- Name: products products_seller_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_seller_id_fkey FOREIGN KEY (seller_id) REFERENCES public.sellers(id);


--
-- Name: reviews reviews_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: sellers sellers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: sdarr
--

ALTER TABLE ONLY public.sellers
    ADD CONSTRAINT sellers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

