import React from "react";
import "./../styles/LoginPage.css"; 

function LoginPage() {

  return (
    <div className="container-fluid login-page vh-100 d-flex align-items-center justify-content-center">
      <div className="card bg-dark text-white p-4 card-container">
        <div className="card-body">
          <h2 className="card-title text-center mb-4 title login-title">Login</h2>
          <form>
            {/* Student Number Input */}
            <div className="mb-3 cus-input-field">
              <label htmlFor="studentNumber" className="form-label cus-form-label">
                Student Number:
              </label>
              <input
                type="text"
                className="form-control form-input-control"
                id="studentNumber"
                placeholder="Enter your student number"
              />
            </div>

            {/* Password Input */}
            <div className="mb-3 cus-input-field">
              <label htmlFor="password" className="form-label cus-form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control form-input-control"
                id="password"
                placeholder="Enter your password"
              />
              <div className="text-end mt-2 forgot-password-content">
                  <a href="/forgot-password" className="text-reset">
                    Forgot Password? <span className="text-info reset-link">Reset</span>
                  </a>
              </div>
            </div>

            {/* Login Button */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg login-submit-btn">
                Login
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center mt-3">
              <p className="account-register">
                You don’t have an account?{" "}
                <a href="/register" className="text-info register-link">
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

