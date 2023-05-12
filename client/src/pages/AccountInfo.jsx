import getAccount from '../lib/checkoutApi'
import { useEffect, useState } from 'react';
import './pagesCSS/AccountInfo.css';

export default function AccountInfo() {
  const [account, setAccount] = useState({});

  useEffect(() => {
    async function accountInfo() {
      try {
        const info = await getAccount();
        setAccount(info);
      } catch (err) {
        console.error(err);
      }
    }
    accountInfo();
  }, []);

  const { firstName, lastName, address, city, state, zipCode, email, username } = account;
  return (
    <div className="container mt-5 mb-5 p-5 blue-account">
      <div className="row">
        <div className="col">
          <h1 className="red-account">Account Info</h1>
          <hr />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div>
            <h4>First Name:</h4>
            <p>{firstName}</p>
          </div>
          <div>
            <h4>Last Name:</h4>
            <p>{lastName}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div>
            <h4>Username:</h4>
            <p>{username}</p>
          </div>
          <div>
            <h4>Email:</h4>
            <p>{email}</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <h1 className="red-account">Address</h1>
          <hr />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div>
            <h4>Street Address:</h4>
            <p>{address}</p>
          </div>
          <div>
            <h4>City:</h4>
            <p>{city}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div>
            <h4>State:</h4>
            <p>{state}</p>
          </div>
          <div>
            <h4>Zip Code:</h4>
            <p>{zipCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
