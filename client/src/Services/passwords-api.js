import axios from 'axios';

axios.defaults.baseURL = 'https://blooming-mesa-35113.herokuapp.com';

export async function fetchPasswords() {
  try {
    const { data } = await axios.get('/passwords');
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function addPassword({ source, username, password }) {
  try {
    const obj = { source, username, password };
    const { data } = await axios.post('/passwords', obj);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePassword(passId) {
  try {
    return await axios.delete(`/passwords/${passId}`);
  } catch (error) {
    console.log(error);
  }
}

export async function updatePassword(passId, { source, username, password }) {
  try {
    const result = { source, username, password };
    const { data } = await axios.put(`/passwords/${passId}`, result);
    return data;
  } catch (error) {
    console.log(error);
  }
}
