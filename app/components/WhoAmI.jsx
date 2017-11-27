import React from 'react';
import firebase from '../../fire';
import { Link } from 'react-router';
const auth = firebase.auth();

import Login from './Login';

export const name = user => {
  if (!user) return 'Nobody'
  if (user.isAnonymous) return 'Anonymous'
  return user.displayName || user.email
}

export const WhoAmI = ({ user, auth }) =>
  <div className="whoami">
    <span className="whoami-user-name">Hello, {name(user)}</span>
    { // If nobody is logged in, or the current user is anonymous,
      (!user || user.isAnonymous) ?
        // ...then show signin links...
        <div>
          <Login auth={auth} />
        </div>
        /// ...otherwise, show a logout button.
        :<div>
          <Link to='/game'>Play the game</Link>
          <button className='logout' onClick={() => auth.signOut()}>logout</button>
        </div>}
    </div>

function checkUser(user) {

}

// function insertUser(user) {
//   const ref = firebase.database.ref();
//   userRef = ref.push();
//   userRef.set({
//     email: user.email,
//     name: user.displayName,
//     score: 0
//   })
// }

export default class extends React.Component {
  componentDidMount() {
    const find = false;
    const {auth} = this.props
    this.unsubscribe = auth.onAuthStateChanged(user => {
      // insertUser(user);
      this.setState({ user });
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const {user} = this.state || {}
    return <WhoAmI user={user} auth={auth} />
  }
}
