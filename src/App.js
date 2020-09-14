import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import Homepage from './pages/homepage/Hompage.component';
import ShopPage from './pages/shop/Shop.component.jsx';
import Header from './components/header/Header.component.jsx';
import SignInAndSignUp from './pages/sign-in-and-sign-up/Sign-In-And-Sign-Up.component.jsx';

import { auth, createUserProfileDocument } from './firebase/firebase.utlils';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //Check User Auth during Signin In
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        //snaphot of database
        userRef.onSnapshot((snapShot) => {
          setCurrentUser(
            {
              id: snapShot.id,
              ...snapShot.data(),
            },
            () => {
              console.log(this.state);
            }
          );
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispathToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispathToProps)(App);

// userRef.onSnapshot((snapShot) => {
//   this.setState(
//     {
//       currentUser: {
//         id: snapShot.id,
//         ...snapShot.data(),
//       },
//       //added 2nd paramter to setState for console log as setstate is ASync
//     },
//     () => {
//       console.log(this.state);
//     }
//   );
// });
