import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Header.styles.scss';

import { ReactComponent as Logo } from '../../assests/crown.svg';
import { auth } from '../../firebase/firebase.utlils';

import CartDropDown from '../Cart-Dropdown/Cart-Dropdown.component';
import CartIcon from '../Cart-Icon/Cart-Icon.component';

const Header = ({ currentUser, hidden }) => {
  return (
    <div className="header">
      <Link to="/" className="logo-container">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link to="/shop" className="option">
          SHOP
        </Link>
        <Link to="/shop" className="option">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link to="/signin">SIGN IN</Link>
        )}
        <CartIcon />
      </div>
      {hidden ? null : <CartDropDown />}
    </div>
  );
};

const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,
  hidden,
});

export default connect(mapStateToProps)(Header);
