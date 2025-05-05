import React from "react";
import { Link } from "react-router-dom";
import "./../styles/LandingPage.css";
import shoppingCart from "./../assets/images/shopping-cart.png";
import successImg from "./../assets/images/success.png";
import secureImg from "./../assets/images/secure.png";
import freemiumImg from "./../assets/images/freemium.png";
import logo from "./../assets/images/sslogo.png";

function LandingPage() {
  return (
    <div className="container-fluid text-white d-flex flex-column landing-page">
      {/* Header */}
      <header className="py-3 text-white">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-center">
          {/* Logo */}
          <img
            src={logo}
            alt="Student Shelf Logo"
            className="me-md-3 mb-3 mb-md-0 logo-img"
          />
          {/* Title */}
          <h1 className="display-4 text-center text-md-start">STUDENT SHELF</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="row flex-grow-1 align-items-center px-5 main-container">
        {/* Text Content */}
        <div className="col-md-6 text-center text-md-start">
          <h2 className="mb-4">A Dynamic Marketplace for Students</h2>
          <p className="lead">
            Designed to help you buy, sell, and connect with ease whether it’s
            finding the perfect product, offering your services, or discovering
            great deals, all within a trusted student community.
          </p>
          <p className="fst-italic slogan">
            Find What You Need, Share What You Have. From Students, For Students.
          </p>
          {/* Buttons */}
          <div className="mt-4 d-flex flex-column flex-sm-row justify-content-center justify-content-md-start login-register-btn">
            <button className="btn btn-success btn-lg mb-3 mb-sm-0 me-sm-3">
              <Link to="/register" className="text-white text-decoration-none">
                Register
              </Link>
            </button>
            <button className="btn btn-info btn-lg">
              <Link to="/login" className="text-white text-decoration-none">
                Login
              </Link>
            </button>
          </div>
        </div>

        {/* Image Content */}
        <div className="col-md-6 text-center">
          <img
            src={shoppingCart}
            alt="Shopping Cart"
            className="img-fluid rounded shopping-cart-img"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="container my-5">
        <div className="row text-center">
          {/* First Card */}
          <div className="col-sm-6 col-md-4 mb-4">
            <div className="card h-100 bg-secondary text-white feature-card">
              <img
                src={successImg}
                className="card-img-top"
                alt="Buy & Sell Scrabble Image"
              />
              <div className="card-body">
                <p className="card-text">
                  With Student Shelf, you can buy and sell products or services.
                </p>
              </div>
            </div>
          </div>

          {/* Second Card */}
          <div className="col-sm-6 col-md-4 mb-4">
            <div className="card h-100 bg-secondary text-white feature-card">
              <img
                src={secureImg}
                className="card-img-top"
                alt="Padlock Image"
              />
              <div className="card-body">
                <p className="card-text">
                  Student Shelf is safe, secured, and reliable for student trading.
                </p>
              </div>
            </div>
          </div>

          {/* Third Card */}
          <div className="col-sm-6 col-md-4 mb-4 mx-auto mx-md-0">
            <div className="card h-100 bg-secondary text-white feature-card">
              <img
                src={freemiumImg}
                className="card-img-top"
                alt="Freemium Image"
              />
              <div className="card-body">
                <p className="card-text">
                  Student Shelf currently offers freemium services for all students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-3 text-center landing-footer">
        <p>Copyright © 2024 studentshelf.com. All Rights Reserved | 2024</p>
      </footer>
    </div>
  );
}

export default LandingPage;
