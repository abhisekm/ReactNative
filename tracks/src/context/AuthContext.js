import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signup':
      return { errorMessage: '', token: action.payload };
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return async ({ email, password }) => {
    try {
      // make api call to sign up
      const response = await trackerApi.post('/signup', { email, password });
      await AsyncStorage.setItem('token', response.data.token);

      // if we sign up, modify our state and say we are authenticated
      dispatch({ type: 'signup', payload: response.data.token })
      navigate('TrackList');
    } catch (err) {
      // if signup failed, how an error msg
      dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' })
    }
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
  { token: null, errorMessage: '' }
);