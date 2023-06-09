import './pagesCSS/AccountInfo.css';
import { GrFormClose } from 'react-icons/gr';
import { getAccount } from '../lib/checkoutApi'
import { useEffect, useState } from 'react';
import { updateAccountInfo } from '../lib/accountApi';

export default function AccountInfo() {
  const [account, setAccount] = useState({});
  const [edit, setEdit ] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function accountInfo() {
      try {
        const info = await getAccount();
        setAccount(info);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    accountInfo();
  }, []);

  async function handleUpdateAccount(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      await updateAccountInfo(formData);
      const info = await getAccount();
      setAccount(info);
    } catch (err) {
      setError(err);
    } finally {
      setEdit(false);
    }
  }

  if (isLoading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
      <span className="spinner-border text-secondary" role="status"></span>
    </div>
  );

  const { firstName, lastName, address, city, state, zipCode, email, username } = account;
  return (
    <form onSubmit={handleUpdateAccount}>
      <div className="container mt-5 mb-5 p-5 blue-account">
        <div className="row">
          <div className="col d-flex justify-content-between align-items-center">
            <h1 className="red-account">{!edit ? 'Account' : 'Edit Account'}</h1>
            {!edit
              ? <button className="btn btn-outline-info" type="button" onClick={() => setEdit(true)}>Update</button>
              : <div className="d-flex">
                <button className="btn btn-outline-success" type="submit">Confirm</button>
                  <button className="btn btn-link" type="button" onClick={() => setEdit(false)}><GrFormClose size={24} /></button>
                </div>}
          </div>
          <hr />
        </div>
        <div className="row">
          <div className="col-md-6">
            <div>
              <label><h4>First Name:</h4>
              {!edit
                ? <p>{firstName}</p>
                : <input
                  required
                  autoFocus
                  type="text"
                  name="firstName"
                  defaultValue={firstName}
                  className="form-control bg-light" />}
              </label>
            </div>
            <div>
              <label><h4>Last Name:</h4>
              {!edit
                ? <p>{lastName}</p>
                : <input
                  required
                  autoFocus
                  type="text"
                  name="lastName"
                  defaultValue={lastName}
                  className="form-control bg-light" />}
                </label>
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <label><h4>Username:</h4>
              {!edit
                ? <p>{username}</p>
                : <input
                  required
                  autoFocus
                  type="text"
                  name="username"
                  defaultValue={username}
                  className="form-control bg-light" />}
              </label>
            </div>
            <div>
              <label><h4>Email:</h4>
              {!edit
                ? <p>{email}</p>
                : <input
                  required
                  autoFocus
                  type="text"
                  name="email"
                  defaultValue={email}
                  className="form-control bg-light" />}
              </label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <h1 className="red-account">{!edit ? 'Address' : 'Edit Address'}</h1>
            <hr />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div>
              <label><h4>Street Address:</h4>
              {!edit
                ? <p>{address}</p>
                : <input
                  required
                  autoFocus
                  type="text"
                  name="address"
                  defaultValue={address}
                  className="form-control bg-light" />}
              </label>
            </div>
            <div>
              <label><h4>City:</h4>
              {!edit
                ? <p>{city}</p>
                : <input
                  required
                  autoFocus
                  type="text"
                  name="city"
                  defaultValue={city}
                  className="form-control bg-light" />}
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <label><h4>State:</h4>
              {!edit
                ? <p>{state}</p>
                : <input
                  required
                  autoFocus
                  type="text"
                  name="state"
                  maxLength={2}
                  defaultValue={state}
                  className="form-control bg-light" />}
              </label>
            </div>
            <div>
              <label><h4>Zip Code:</h4>
              {!edit
                ? <p>{zipCode}</p>
                : <input
                  required
                  autoFocus
                  type="number"
                  name="zipCode"
                  maxLength={5}
                  defaultValue={zipCode}
                  className="form-control bg-light" />}
              </label>
            </div>
          </div>
        </div>
      </div>
      {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
    </form>
  );
};
