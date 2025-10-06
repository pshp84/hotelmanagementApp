<template>
  <div class="login-page">
    <!-- Left side - Branding/Info -->
    <div class="login-page__branding">
      <div class="branding-content">
        <router-link to="/" class="branding-logo">
          <h1>HotelHub</h1>
        </router-link>
        <div class="branding-text">
          <h2>Welcome to HotelHub</h2>
          <p>
            Discover amazing hotels and book your perfect stay with ease. Join
            thousands of satisfied travelers who trust us for their
            accommodation needs.
          </p>
        </div>
        <div class="branding-features">
          <div class="feature-item">
            <svg class="feature-icon" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <span>Best Price Guarantee</span>
          </div>
          <div class="feature-item">
            <svg class="feature-icon" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <span>24/7 Customer Support</span>
          </div>
          <div class="feature-item">
            <svg class="feature-icon" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
            <span>Secure Booking Process</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right side - Form -->
    <div class="login-page__form">
      <div class="form-container">
        <!-- Form Header -->
        <div class="form-header">
          <h2>{{ isLogin ? "Welcome Back" : "Create Account" }}</h2>
          <p>
            {{
              isLogin
                ? "Sign in to your account to continue"
                : "Join HotelHub to start booking amazing hotels"
            }}
          </p>

          <!-- Form Toggle -->
          <div class="form-toggle">
            <button
              @click="switchToLogin"
              :class="{ active: isLogin }"
              :aria-pressed="isLogin"
              aria-label="Switch to login form"
            >
              Login
            </button>
            <button
              @click="switchToRegister"
              :class="{ active: !isLogin }"
              :aria-pressed="!isLogin"
              aria-label="Switch to registration form"
            >
              Register
            </button>
          </div>
        </div>

        <div v-if="successMessage" class="message success-message" role="alert">
          <svg class="message-icon" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          {{ successMessage }}
        </div>

        <div v-if="errorMessage" class="message error-message" role="alert">
          <svg class="message-icon" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          {{ errorMessage }}
        </div>

        <form
          v-if="isLogin"
          @submit.prevent="handleLogin"
          class="auth-form"
          novalidate
        >
          <div class="form-group">
            <label for="login-email" class="form-label">
              Email Address
              <span class="required">*</span>
            </label>
            <div class="input-wrapper">
              <input
                type="email"
                id="login-email"
                class="form-input"
                :class="{ error: loginErrors.email }"
                v-model="loginData.email"
                @blur="validateLoginField('email')"
                @input="clearFieldError('login', 'email')"
                placeholder="Enter your email"
                required
                autocomplete="email"
                aria-describedby="login-email-error"
              />
              <svg class="input-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                />
                <path
                  d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                />
              </svg>
            </div>
            <div
              v-if="loginErrors.email"
              id="login-email-error"
              class="form-error"
            >
              {{ loginErrors.email }}
            </div>
          </div>

          <div class="form-group">
            <label for="login-password" class="form-label">
              Password
              <span class="required">*</span>
            </label>
            <div class="input-wrapper">
              <input
                :type="showLoginPassword ? 'text' : 'password'"
                id="login-password"
                class="form-input"
                :class="{ error: loginErrors.password }"
                v-model="loginData.password"
                @blur="validateLoginField('password')"
                @input="clearFieldError('login', 'password')"
                placeholder="Enter your password"
                required
                autocomplete="current-password"
                aria-describedby="login-password-error"
              />
              <svg class="input-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <button
                type="button"
                class="password-toggle"
                @click="showLoginPassword = !showLoginPassword"
                :aria-label="
                  showLoginPassword ? 'Hide password' : 'Show password'
                "
              >
                <svg
                  v-if="showLoginPassword"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                    clip-rule="evenodd"
                  />
                  <path
                    d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                  />
                </svg>
                <svg v-else viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fill-rule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div
              v-if="loginErrors.password"
              id="login-password-error"
              class="form-error"
            >
              {{ loginErrors.password }}
            </div>
          </div>

          <div class="form-options">
            <label class="checkbox-wrapper">
              <input
                type="checkbox"
                v-model="loginData.rememberMe"
                class="checkbox-input"
              />
              <span class="checkbox-label">Remember me</span>
            </label>
            <button
              type="button"
              class="forgot-password-link"
              @click="handleForgotPassword"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            class="btn btn--primary"
            :disabled="authStore.isLoading || !isLoginFormValid"
          >
            <span v-if="authStore.isLoading" class="btn-spinner"></span>
            <span>Sign In</span>
          </button>

          <div class="social-login">
            <div class="divider">
              <span>Or continue with</span>
            </div>
            <div class="social-buttons">
              <button
                type="button"
                class="social-btn google-btn"
                @click="handleSocialLogin('google')"
              >
                <svg class="social-icon" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                class="social-btn github-btn"
                @click="handleSocialLogin('github')"
              >
                <svg
                  class="social-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
                GitHub
              </button>
            </div>
          </div>
        </form>

        <!-- Register Form -->
        <form
          v-else
          @submit.prevent="handleRegister"
          class="auth-form"
          novalidate
        >
          <div class="form-group">
            <label for="reg-name" class="form-label">
              Full Name
              <span class="required">*</span>
            </label>
            <div class="input-wrapper">
              <input
                type="text"
                id="reg-name"
                class="form-input"
                :class="{ error: registerErrors.name }"
                v-model="registerData.name"
                @blur="validateRegisterField('name')"
                @input="clearFieldError('register', 'name')"
                placeholder="Enter your full name"
                required
                autocomplete="name"
                aria-describedby="reg-name-error"
              />
              <svg class="input-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div
              v-if="registerErrors.name"
              id="reg-name-error"
              class="form-error"
            >
              {{ registerErrors.name }}
            </div>
          </div>

          <div class="form-group">
            <label for="reg-email" class="form-label">
              Email Address
              <span class="required">*</span>
            </label>
            <div class="input-wrapper">
              <input
                type="email"
                id="reg-email"
                class="form-input"
                :class="{ error: registerErrors.email }"
                v-model="registerData.email"
                @blur="validateRegisterField('email')"
                @input="clearFieldError('register', 'email')"
                placeholder="Enter your email"
                required
                autocomplete="email"
                aria-describedby="reg-email-error"
              />
              <svg class="input-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                />
                <path
                  d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                />
              </svg>
            </div>
            <div
              v-if="registerErrors.email"
              id="reg-email-error"
              class="form-error"
            >
              {{ registerErrors.email }}
            </div>
          </div>

          <div class="form-group">
            <label for="reg-password" class="form-label">
              Password
              <span class="required">*</span>
            </label>
            <div class="input-wrapper">
              <input
                :type="showRegisterPassword ? 'text' : 'password'"
                id="reg-password"
                class="form-input"
                :class="{ error: registerErrors.password }"
                v-model="registerData.password"
                @blur="validateRegisterField('password')"
                @input="
                  clearFieldError('register', 'password');
                  checkPasswordStrength();
                "
                placeholder="Create a strong password"
                required
                autocomplete="new-password"
                aria-describedby="reg-password-error reg-password-strength"
              />
              <svg class="input-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <button
                type="button"
                class="password-toggle"
                @click="showRegisterPassword = !showRegisterPassword"
                :aria-label="
                  showRegisterPassword ? 'Hide password' : 'Show password'
                "
              >
                <svg
                  v-if="showRegisterPassword"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                    clip-rule="evenodd"
                  />
                  <path
                    d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                  />
                </svg>
                <svg v-else viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fill-rule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div
              v-if="registerErrors.password"
              id="reg-password-error"
              class="form-error"
            >
              {{ registerErrors.password }}
            </div>
          </div>

          <!-- Password Strength Indicator -->
          <div
            v-if="registerData.password"
            class="password-strength"
            id="reg-password-strength"
          >
            <div class="strength-label">Password strength:</div>
            <div class="strength-bar">
              <div
                class="strength-fill"
                :class="passwordStrength.level"
                :style="{ width: passwordStrength.percentage + '%' }"
              ></div>
            </div>
            <div class="strength-text" :class="passwordStrength.level">
              {{ passwordStrength.text }}
            </div>
          </div>

          <div class="form-group">
            <label for="reg-confirm-password" class="form-label">
              Confirm Password
              <span class="required">*</span>
            </label>
            <div class="input-wrapper">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="reg-confirm-password"
                class="form-input"
                :class="{ error: registerErrors.confirmPassword }"
                v-model="registerData.confirmPassword"
                @blur="validateRegisterField('confirmPassword')"
                @input="clearFieldError('register', 'confirmPassword')"
                placeholder="Confirm your password"
                required
                autocomplete="new-password"
                aria-describedby="reg-confirm-password-error"
              />
              <svg class="input-icon" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <button
                type="button"
                class="password-toggle"
                @click="showConfirmPassword = !showConfirmPassword"
                :aria-label="
                  showConfirmPassword ? 'Hide password' : 'Show password'
                "
              >
                <svg
                  v-if="showConfirmPassword"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                    clip-rule="evenodd"
                  />
                  <path
                    d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                  />
                </svg>
                <svg v-else viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fill-rule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div
              v-if="registerErrors.confirmPassword"
              id="reg-confirm-password-error"
              class="form-error"
            >
              {{ registerErrors.confirmPassword }}
            </div>
          </div>

          <div class="form-group">
            <label class="checkbox-wrapper">
              <input
                type="checkbox"
                v-model="registerData.agreeToTerms"
                class="checkbox-input"
                required
              />
              <span class="checkbox-label">
                I agree to the
                <a href="#" class="terms-link">Terms of Service</a>
                and
                <a href="#" class="terms-link">Privacy Policy</a>
                <span class="required">*</span>
              </span>
            </label>
          </div>

          <button
            type="submit"
            class="btn btn--primary"
            :disabled="authStore.isLoading || !isRegisterFormValid"
          >
            <span v-if="authStore.isLoading" class="btn-spinner"></span>
            <span>Create Account</span>
          </button>

          <div class="social-login">
            <div class="divider">
              <span>Or continue with</span>
            </div>
            <div class="social-buttons">
              <button
                type="button"
                class="social-btn google-btn"
                @click="handleSocialLogin('google')"
              >
                <svg class="social-icon" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                class="social-btn github-btn"
                @click="handleSocialLogin('github')"
              >
                <svg
                  class="social-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
                GitHub
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const isLogin = ref(true);
const successMessage = ref("");
const errorMessage = ref("");

const showLoginPassword = ref(false);
const showRegisterPassword = ref(false);
const showConfirmPassword = ref(false);

const loginData = ref({
  email: "",
  password: "",
  rememberMe: false,
});

const registerData = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
});

const loginErrors = ref({ email: "", password: "" });
const registerErrors = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const passwordStrength = ref({ level: "weak", percentage: 0, text: "" });

const isLoginFormValid = computed(() => {
  return (
    loginData.value.email &&
    loginData.value.password &&
    !loginErrors.value.email &&
    !loginErrors.value.password
  );
});

const isRegisterFormValid = computed(() => {
  return (
    registerData.value.name &&
    registerData.value.email &&
    registerData.value.password &&
    registerData.value.confirmPassword &&
    registerData.value.agreeToTerms &&
    !Object.values(registerErrors.value).some((error) => error) &&
    passwordStrength.value.level !== "weak"
  );
});

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return "";
};

const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  return "";
};

const validateName = (name) => {
  if (!name) return "Name is required";
  if (name.length < 2) return "Name must be at least 2 characters";
  return "";
};

const validateLoginField = (field) => {
  switch (field) {
    case "email":
      loginErrors.value.email = validateEmail(loginData.value.email);
      break;
    case "password":
      loginErrors.value.password = validatePassword(loginData.value.password);
      break;
  }
};

const validateRegisterField = (field) => {
  switch (field) {
    case "name":
      registerErrors.value.name = validateName(registerData.value.name);
      break;
    case "email":
      registerErrors.value.email = validateEmail(registerData.value.email);
      break;
    case "password":
      registerErrors.value.password = validatePassword(
        registerData.value.password
      );
      break;
    case "confirmPassword":
      if (registerData.value.password !== registerData.value.confirmPassword) {
        registerErrors.value.confirmPassword = "Passwords do not match";
      } else {
        registerErrors.value.confirmPassword = "";
      }
      break;
  }
};

const clearFieldError = (form, field) => {
  if (form === "login") {
    loginErrors.value[field] = "";
  } else {
    registerErrors.value[field] = "";
  }
  errorMessage.value = "";
};

const checkPasswordStrength = () => {
  const password = registerData.value.password;
  let score = 0;

  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) {
    passwordStrength.value = { level: "weak", percentage: 33, text: "Weak" };
  } else if (score <= 3) {
    passwordStrength.value = {
      level: "medium",
      percentage: 66,
      text: "Medium",
    };
  } else {
    passwordStrength.value = {
      level: "strong",
      percentage: 100,
      text: "Strong",
    };
  }
};

const handleLogin = async () => {
  if (!isLoginFormValid.value) return;

  errorMessage.value = "";
  successMessage.value = "";

  try {
    await authStore.login({
      email: loginData.value.email,
      password: loginData.value.password,
    });

    successMessage.value = "Login successful! Redirecting...";

    setTimeout(() => {
      loginData.value = { email: "", password: "", rememberMe: false };
    }, 1000);
  } catch (error) {
    errorMessage.value =
      authStore.error || "Invalid email or password. Please try again.";
  }
};

const handleRegister = async () => {
  if (!isRegisterFormValid.value) return;

  errorMessage.value = "";
  successMessage.value = "";

  try {
    await authStore.register({
      name: registerData.value.name,
      email: registerData.value.email,
      password: registerData.value.password,
    });

    successMessage.value = "Account created successfully! Redirecting...";

    setTimeout(() => {
      registerData.value = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
      };
      passwordStrength.value = { level: "weak", percentage: 0, text: "" };
    }, 1000);
  } catch (error) {
    errorMessage.value =
      authStore.error || "Registration failed. Please try again.";
  }
};

const handleSocialLogin = async (provider) => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const socialUser = {
      name: `Social User (${provider})`,
      email: `user@${provider}.com`,
    };

    authStore.login(socialUser);
    successMessage.value = `Signed in with ${provider}!`;
  } catch (error) {
    errorMessage.value = `Failed to sign in with ${provider}. Please try again.`;
  } finally {
    isLoading.value = false;
  }
};

const handleForgotPassword = () => {
  if (!loginData.value.email) {
    errorMessage.value = "Please enter your email address first.";
    return;
  }

  successMessage.value = `Password reset instructions sent to ${loginData.value.email}`;
  setTimeout(() => {
    successMessage.value = "";
  }, 5000);
};

const switchToLogin = () => {
  isLogin.value = true;
  clearMessages();
  resetForms();
};

const switchToRegister = () => {
  isLogin.value = false;
  clearMessages();
  resetForms();
};

const clearMessages = () => {
  errorMessage.value = "";
  successMessage.value = "";
};

const resetForms = () => {
  loginErrors.value = { email: "", password: "" };
  registerErrors.value = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  passwordStrength.value = { level: "weak", percentage: 0, text: "" };
};

watch(
  [loginData, registerData],
  () => {
    if (errorMessage.value || successMessage.value) {
      clearMessages();
    }
  },
  { deep: true }
);
</script>

<style scoped>
.login-page {
  display: flex;
  min-height: 100vh;
  background-color: var(--body-color);
}

.login-page__branding {
  flex: 1;
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--title-color) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-xl);
  position: relative;
  overflow: hidden;
}

.login-page__branding::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.05)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.05)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.03)"/><circle cx="10" cy="60" r="0.5" fill="rgba(255,255,255,0.03)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.branding-content {
  position: relative;
  z-index: 2;
  color: white;
  text-align: center;
  max-width: 400px;
}

.branding-logo {
  text-decoration: none;
  color: white;
  display: block;
  margin-bottom: var(--space-xl);
}

.branding-logo h1 {
  font-size: 3rem;
  font-weight: 800;
  margin: 0;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.branding-text h2 {
  font-size: var(--h2-font-size);
  font-weight: 700;
  margin-bottom: var(--space-md);
  color: white;
}

.branding-text p {
  font-size: var(--normal-font-size);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: var(--space-xl);
}

.branding-features {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: rgba(255, 255, 255, 0.9);
  font-size: var(--small-font-size);
}

.feature-icon {
  width: 20px;
  height: 20px;
  color: var(--accent-color);
  flex-shrink: 0;
}

.login-page__form {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-xl);
  background-color: white;
  position: relative;
}

.form-container {
  width: 100%;
  max-width: 400px;
}

.form-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}

.form-header h2 {
  font-size: var(--h2-font-size);
  font-weight: 700;
  color: var(--title-color);
  margin-bottom: var(--space-xs);
}

.form-header p {
  color: var(--text-color-light);
  margin-bottom: var(--space-lg);
  font-size: var(--normal-font-size);
}

.form-toggle {
  display: flex;
  background-color: var(--border-color);
  border-radius: var(--radius);
  padding: 0.25rem;
  max-width: 300px;
  margin: 0 auto;
}

.form-toggle button {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  background-color: transparent;
  color: var(--text-color-light);
  cursor: pointer;
  font-weight: var(--font-medium);
  border-radius: calc(var(--radius) - 0.25rem);
  transition: all 0.3s ease;
  font-size: var(--normal-font-size);
}

.form-toggle button:hover {
  color: var(--text-color);
}

.form-toggle button.active {
  background-color: var(--accent-color);
  color: var(--primary-color);
  box-shadow: 0 2px 8px rgba(224, 164, 88, 0.2);
}

/* Form content */
.auth-form {
  padding: 0;
}

/* Messages */
.message {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm);
  border-radius: var(--radius);
  margin-bottom: var(--space-md);
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
}

.success-message {
  background-color: rgba(42, 157, 143, 0.1);
  color: var(--success-color);
  border: 1px solid rgba(42, 157, 143, 0.2);
}

.error-message {
  background-color: rgba(231, 111, 81, 0.1);
  color: var(--error-color);
  border: 1px solid rgba(231, 111, 81, 0.2);
}

.message-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* Form elements */
.form-group {
  margin-bottom: var(--space-md);
}

.form-label {
  display: block;
  font-weight: var(--font-medium);
  margin-bottom: var(--space-xs);
  color: var(--title-color);
  font-size: var(--normal-font-size);
}

.required {
  color: var(--error-color);
  margin-left: 4px;
}

.input-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  font-size: var(--normal-font-size);
  transition: all 0.3s ease;
  background-color: #fff;
  color: var(--text-color);
}

.form-input:focus {
  outline: none;
  border-color: var(--border-color);
  box-shadow: none;
}

.form-input.error {
  border-color: var(--error-color);
  box-shadow: none;
}

.form-input::placeholder {
  color: var(--text-color-light);
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--text-color-light);
  pointer-events: none;
}

.password-toggle {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-color-light);
  padding: 0.25rem;
  border-radius: 4px;
  transition: color 0.3s ease;
}

.password-toggle:hover {
  color: var(--text-color-light);
  background-color: transparent;
}

.password-toggle svg {
  width: 20px;
  height: 20px;
}

.form-error {
  color: var(--error-color);
  font-size: var(--small-font-size);
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.password-strength {
  margin-top: var(--space-xs);
}

.strength-label {
  font-size: var(--small-font-size);
  color: var(--text-color-light);
  margin-bottom: 0.25rem;
}

.strength-bar {
  height: 4px;
  background-color: var(--border-color);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.25rem;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.strength-fill.weak {
  background-color: var(--error-color);
}

.strength-fill.medium {
  background-color: var(--accent-color);
}

.strength-fill.strong {
  background-color: var(--success-color);
}

.strength-text {
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
}

.strength-text.weak {
  color: var(--error-color);
}

.strength-text.medium {
  color: var(--accent-color);
}

.strength-text.strong {
  color: var(--success-color);
}

/* Form options */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-lg);
  gap: var(--space-sm);
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  cursor: pointer;
}

.checkbox-input {
  width: 16px;
  height: 16px;
  accent-color: var(--accent-color);
}

.checkbox-label {
  font-size: var(--small-font-size);
  color: var(--text-color);
  user-select: none;
}

.forgot-password-link {
  background: none;
  border: none;
  color: var(--accent-color);
  font-size: var(--small-font-size);
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.forgot-password-link:hover {
  color: var(--accent-color);
}

.terms-link {
  color: var(--accent-color);
  text-decoration: underline;
  transition: color 0.3s ease;
}

.terms-link:hover {
  color: var(--accent-color);
}

/* Buttons */
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  padding: 0.875rem 1.5rem;
  border-radius: var(--radius);
  font-weight: var(--font-semi-bold);
  font-size: var(--normal-font-size);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  width: 100%;
  margin-bottom: var(--space-lg);
  position: relative;
  overflow: hidden;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid rgba(13, 27, 42, 0.6);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: var(--space-xs);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.btn--primary {
  background-color: var(--accent-color);
  color: var(--primary-color);
}

.btn--primary:hover:not(:disabled) {
  background-color: var(--accent-color);
  transform: none;
  box-shadow: none;
}

/* Social login */
.social-login {
  margin-top: var(--space-lg);
}

.divider {
  position: relative;
  text-align: center;
  margin-bottom: var(--space-md);
}

.divider::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: var(--border-color);
  z-index: 1;
}

.divider span {
  background-color: white;
  padding: 0 var(--space-sm);
  color: var(--text-color-light);
  font-size: var(--small-font-size);
  position: relative;
  z-index: 2;
}

.social-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-sm);
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  padding: 0.75rem;
  border: 2px solid var(--border-color);
  border-radius: var(--radius);
  background-color: white;
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: var(--small-font-size);
  font-weight: var(--font-medium);
}

.social-btn:hover {
  border-color: var(--border-color);
  transform: none;
  box-shadow: none;
}

.social-icon {
  width: 20px;
  height: 20px;
}

/* Responsive design */
@media (max-width: 768px) {
  .login-page {
    flex-direction: column;
  }

  .login-page__branding {
    flex: none;
    min-height: 40vh;
    padding: var(--space-lg);
  }

  .login-page__form {
    flex: none;
    min-height: 60vh;
    padding: var(--space-lg);
  }

  .branding-content {
    max-width: none;
  }

  .branding-logo h1 {
    font-size: 2rem;
  }

  .branding-text h2 {
    font-size: var(--h3-font-size);
  }

  .branding-text p {
    font-size: var(--small-font-size);
  }

  .branding-features {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-sm);
  }

  .feature-item {
    font-size: 0.75rem;
  }

  .feature-item span {
    display: none;
  }

  .social-buttons {
    grid-template-columns: 1fr;
  }

  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-sm);
  }
}

@media (max-width: 480px) {
  .login-page__branding {
    min-height: 30vh;
    padding: var(--space-md);
  }

  .login-page__form {
    min-height: 70vh;
    padding: var(--space-md);
  }

  .branding-logo h1 {
    font-size: 1.5rem;
  }

  .form-header h2 {
    font-size: var(--h3-font-size);
  }

  .form-toggle {
    max-width: 250px;
  }

  .form-toggle button {
    padding: 0.5rem 0.75rem;
    font-size: var(--small-font-size);
  }
}

/* Animation for form transitions */
.auth-form {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Focus management for accessibility */
.form-input:focus,
.btn:focus,
.social-btn:focus,
.password-toggle:focus,
.checkbox-input:focus {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .btn,
  .form-input,
  .social-btn,
  .password-toggle,
  .form-toggle button,
  .auth-form {
    transition: none;
    animation: none;
  }

  .btn-spinner {
    animation: none;
  }
}
</style>
