import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Homepage from './pages/homepage/Hompage.component';
import ShopPage from './pages/shop/Shop.component.jsx';
import Header from './components/header/Header.component.jsx';
import SignInAndSignUp from './pages/sign-in-and-sign-up/Sign-In-And-Sign-Up.component.jsx';

import { auth, createUserProfileDocument } from './firebase/firebase.utlils';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //Check User Auth during Signin In
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        //snaphot of database
        userRef.onSnapshot((snapShot) => {
          this.setState(
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data(),
              },
              //added 2nd paramter to setState for console log as setstate is ASync
            },
            () => {
              console.log(this.state);
            }
          );
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
