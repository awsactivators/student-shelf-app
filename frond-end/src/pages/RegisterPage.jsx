import React, {useState} from "react";
import "./../styles/RegisterPage.css"; 

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrengthError, setPasswordStrengthError] = useState("");


  const handleRegister = (e) => {
    e.preventDefault();

    // Validate the email format
    const emailRegex = /^[nN]\d{8}@humber\.ca$/;
    if (!emailRegex.test(email)) {
      setEmailError("Input your Humber student email!");
      return;
    } else {
      setEmailError("");
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-_])[A-Za-z\d@$!%*?&-_]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordStrengthError(
        "Password must be at least 8 characters long and include a capital letter, a small letter, a number, and a special character."
      );
      return;
    } else {
      setPasswordStrengthError("");
    }

    // Validate password match
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    } else {
      setPasswordError("");
    }

    setEmailError("");
    console.log("Account registered successfully!");
    // Logic to handle registration here
  };

  return (
    <div class="custom-register-page container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div class="custom-card card p-4 bg-dark">
        <div class="custom-card-body">
          <h2 class="custom-title text-center mb-4">Create an Account</h2>
          <form onSubmit={handleRegister}>
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
                Student Email:
              </label>
              <input
                type="email"
                class="custom-input"
                id="email"
                placeholder="Enter your student email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {emailError && <small className="text-danger">{emailError}</small>}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordStrengthError && (
                <small className="text-danger">{passwordStrengthError}</small>
              )}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {passwordError && <small className="text-danger">{passwordError}</small>}
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
