import './pagesCSS/Account.css';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountForm from '../components/AccountForm';
import AppContext from '../components/AppContext';
import ColorTitle from  '../components/ColorTitle';

export default function Account({ action }) {
  const navigate = useNavigate();

  const { user, handleSignIn } = useContext(AppContext);

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate]);

  const welcomeMessage = action === 'sign-in'
    ? 'Please sign in to continue'
    : 'Create an account to get started!';

    return (
      <div className="row pt-5 mb-5 mx-auto align-items-center mt-5">
        <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-xl-4 offset-xl-4">
          <header className="text-center">
            <h2 className="mb-2">
              <ColorTitle word="The Post Party Playground" />
            </h2>
            <p className="text-muted mb-4">{welcomeMessage}</p>
          </header>
          <div className="card p-3 mb-5 blue">
            <AccountForm
              key={action}
              action={action}
              onSignIn={handleSignIn}/>
          </div>
        </div>
      </div>
    );
}
