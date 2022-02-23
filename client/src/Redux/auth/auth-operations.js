import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'http://localhost:5000';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = createAsyncThunk('auth/register', async credentials => {
  try {
    const { data } = await axios.post('/auth/register', credentials);
    token.set(data.token);

    return data;
  } catch (error) {
    // TODO: Add error.message
  }
});

const logIn = createAsyncThunk('auth/login', async credentials => {
  try {
    const { data } = await axios.post('/auth/login', credentials);
    token.set(data.token);

    return data;
  } catch (error) {
    console.log(error);
  }
});

const logOut = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.get('/auth/logout');
    token.unset();
  } catch (error) {
    // TODO: Add error.message
  }
});

const fetchCarrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    }
    token.set(persistedToken);
    try {
      const { data } = await axios.get('/passwords/current');
      return data;
    } catch (error) {
      // TODO: Add error.message
    }
  }
);
// eslint-disable-next-line import/no-anonymous-default-export
export default { register, logIn, logOut, fetchCarrentUser };
