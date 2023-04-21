import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpOrIn } from '../lib/accountApi';
import './AuthForm.css';

export default function AuthForm({ action, onSignIn }) {
  const navigate = useNavigate();
  const [error, setError] = useState();

  async function handleSubmitSignIn(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { username, password } = Object.fromEntries(formData.entries());
    try {
      const result = await signUpOrIn(action, username, password);
      if (action === 'sign-up') {
        navigate('/sign-in')
      } else if (result.user && result.token) {
        onSignIn(result)
      }
    } catch (err) {
      setError(err);
    }
  }

  async function handleSubmitSignUp(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { username, password, firstName, lastName, email, address, state, city, zipCode } = Object.fromEntries(formData.entries());
    try {
      const result = await signUpOrIn(action, username, password, firstName, lastName, email, address, state, city, zipCode);
      if (action === 'sign-up') {
        navigate('/sign-in')
      } else if (result.user && result.token) {
        onSignIn(result)
      }
    } catch (err) {
      setError(err);
    }
  }

  const alternateActionTo = action === 'sign-up'
    ? '/sign-in'
    : '/sign-up';
  const alternateActionText = action === 'sign-up'
    ? 'Sign in instead'
    : 'Register now';
  const submitButtonText = action === 'sign-up'
    ? 'Register'
    : 'Log In';

  return (
    <form className="w-100" onSubmit={`${action}` === 'sign-in' ? handleSubmitSignIn : handleSubmitSignUp}>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label bold">
            Username:
            <input
              required
              autoFocus
              type="text"
              name="username"
              className="form-control bg-light" />
          </label>
        </div>
        <div className="col-md-6">
          <label className="form-label bold">
            Password:
            <input
              required
              type="password"
              name="password"
              className="form-control bg-light" />
          </label>
        </div>
      </div>
      {action === 'sign-up' &&
        <>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label bold">
                First Name:
                <input
                  required
                  type="text"
                  name="firstName"
                  className="form-control bg-light" />
              </label>
            </div>
            <div className="col-md-4">
              <label className="form-label bold">
                Last Name:
                <input
                  required
                  type="text"
                  name="lastName"
                  className="form-control bg-light" />
              </label>
            </div>
            <div className="col-md-4">
              <label className="form-label bold">
                Email:
                <input
                  required
                  type="email"
                  name="email"
                  className="form-control bg-light" />
              </label>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label bold">
                Address:
                <input
                  required
                  type="text"
                  name="address"
                  className="form-control bg-light" />
              </label>
            </div>
            <div className="col-md-4">
              <label className="form-label bold">
                State:
                <input
                  required
                  type="text"
                  name="state"
                  className="form-control bg-light" />
              </label>
            </div>
            <div className="col-md-4">
              <label className="form-label bold">
                City:
                <input
                  required
                  type="text"
                  name="city"
                  className="form-control bg-light" />
              </label>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label bold">
                Zip Code:
                <input
                  required
                  type="text"
                  name="zipCode"
                  className="form-control bg-light" />
              </label>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-4"></div>
          </div>
        </>
      }
      <div className="d-flex justify-content-between align-items-center">
        <small>
          <Link className="text-muted" to={alternateActionTo}>
            {alternateActionText}
          </Link>
        </small>
        <button type="submit" className="btn btn-primary">
          {submitButtonText}
        </button>
      </div>
      {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
    </form>

  );
}
