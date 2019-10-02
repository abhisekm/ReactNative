import createDataContext from './createDataContext';

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return ({ email, password }) => {
    // make api call to sign up

    // if we sign up, modify our state and say we are authenticated

    // if signup failed, how an error msg
  };
};

const signin = (dispatch) => {
  return ({ email, password }) => {
    //Sign in via api

    //Handle success

    //handle failure
  };
};

const signout = (dispatch) => {
  return () => {
    //sign out
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signup, signout },
  { isSignedIn: false }
);