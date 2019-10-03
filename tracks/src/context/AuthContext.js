import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signin':
      return { errorMessage: '', token: action.payload };
    case 'signout':
      return { errorMessage: '', token: null };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'signin', payload: token })
    navigate('TrackList');
  } else {
    navigate('Signup');
  }
}

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};

const signup = (dispatch) => async ({ email, password }) => {
  try {
    // make api call to sign up
    const response = await trackerApi.post('/signup', { email, password });
    await AsyncStorage.setItem('token', response.data.token);

    // if we sign up, modify our state and say we are authenticated
    dispatch({ type: 'signin', payload: response.data.token })
    navigate('TrackList');
  } catch (err) {
    // if signup failed, how an error msg
    dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' })
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    //Sign in via api
    const response = await trackerApi.post('/signin', { email, password });
    await AsyncStorage.setItem('token', response.data.token);

    //Handle success
    dispatch({ type: 'signin', payload: response.data.token })
    navigate('TrackList');
  } catch (err) {
    //handle failure
    dispatch({ type: 'add_error', payload: 'Something went wrong with sign in' })
  }
};

const signout = (dispatch) => async () => {
  //sign out
  const token = await AsyncStorage.removeItem('token');
  dispatch({ type: 'signout' })
  navigate('loginFlow');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signup, signout, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: '' }
);