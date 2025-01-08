import React from "react";
import "./../styles/RegisterPage.css"; 

function RegisterPage() {
  const handleRegister = (e) => {
      e.preventDefault();
      console.log("Account registered successfully!");
      // logic to handle registration here
  };

  return (
    <div class="custom-register-page container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div class="custom-card card p-4 bg-dark">
        <div class="custom-card-body">
          <h2 class="custom-title text-center mb-4">Create an Account</h2>
          <form onSubmit={handleRegister}>
            {/* Student Number Input */}
            <div class="custom-form-group mb-3">
              <label htmlFor="studentNumber" class="custom-label">
                Student Number:
              </label>
              <input
                type="text"
                class="custom-input"
                id="studentNumber"
                placeholder="Enter your student number"
                required
              />
            </div>

            {/* Name Input */}
            <div class="custom-form-group mb-3">
              <label htmlFor="name" class="custom-label">
                Name:
              </label>
              <input
                type="text"
                class="custom-input"
                id="name"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Input */}
            <div class="custom-form-group mb-3">
              <label htmlFor="email" class="custom-label">
                Email:
              </label>
              <input
                type="email"
                class="custom-input"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Campus Input */}
            <div class="custom-form-group mb-3">
              <label htmlFor="campus" class="custom-label">
                Campus:
              </label>
              <input
                type="text"
                class="custom-input"
                id="campus"
                placeholder="Enter your campus"
                required
              />
            </div>

            {/* Password Input */}
            <div class="custom-form-group mb-3">
              <label htmlFor="password" class="custom-label">
                Password:
              </label>
              <input
                type="password"
                class="custom-input"
                id="password"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div class="custom-form-group mb-3">
              <label htmlFor="confirmPassword" class="custom-label">
                Confirm Password:
              </label>
              <input
                type="password"
                class="custom-input"
                id="confirmPassword"
                placeholder="Confirm your password"
                required
              />
            </div>

            {/* Terms & Conditions */}
            <div class="custom-checkbox mb-3">
              <input
                type="checkbox"
                class="custom-checkbox-input"
                id="terms"
                required
              />
              <label class="custom-checkbox-label" htmlFor="terms">
                Terms and Conditions <span class="agreement-link"><a href="/agreement/terms">Agreement</a></span> Confirmation
              </label>
            </div>

            {/* Register Button */}
            <div class="d-grid">
              <button type="submit" class="custom-btn">
                Register
              </button>
            </div>

            {/* Login Link */}
            <div class="text-center mt-3">
              <p>
                Already Registered?{" "}
                <a href="/login" class="custom-link">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
