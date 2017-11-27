const firebase = require('firebase')

// -- // -- // -- // Firebase Config // -- // -- // -- //
var config = {
  apiKey: 'AIzaSyBPKiW_fkfozsPt_G5pwToBUKv_hisZhZk',
  authDomain: 'puyo-stone.firebaseapp.com',
  databaseURL: 'https://puyo-stone.firebaseio.com',
  projectId: 'puyo-stone',
  storageBucket: 'puyo-stone.appspot.com',
  messagingSenderId: '854792287240'
};
// -- // -- // -- // -- // -- // -- // -- // -- // -- //

// Initialize the app, but make sure to do it only once.
//   (We need this for the tests. The test runner busts the require
//   cache when in watch mode; this will cause us to evaluate this
//   file multiple times. Without this protection, we would try to
//   initialize the app again, which causes Firebase to throw.
//
//   This is why global state makes a sad panda.)
firebase.__bonesApp || (firebase.__bonesApp = firebase.initializeApp(config))

module.exports = firebase
