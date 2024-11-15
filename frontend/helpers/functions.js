import axios from "axios";
import { dbUrl, returnToken } from "../src/utils";

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${dbUrl}/get-all-users`);

    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const addToContact = async (userid) => {
  try {
    const token = returnToken();
    const res = await axios.post(
      `${dbUrl}/add-to-contact`,
      { userid },
      { headers: { Authorization: token } }
    );
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const getUsersBySearchOrNumber = async (searchText) => {
  try {
    const res = await axios.post(`${dbUrl}/get-users-by-search-or-number`, {
      searchText: searchText,
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const handleBlockUser = async (userid) => {
  try {
    const token = returnToken();
    const res = await axios.post(
      `${dbUrl}/block-user`,
      { userid },
      { headers: { Authorization: token } }
    );
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const handleUnblockUser = async (userid) => {
  try {
    const token = returnToken();
    const res = await axios.post(
      `${dbUrl}/unblock-user`,
      { userid },
      { headers: { Authorization: token } }
    );

    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const removeFromContact = async (userid) => {
  try {
    const token = returnToken();
    const res = await axios.post(
      `${dbUrl}/remove-from-contact`,
      { userid },
      { headers: { Authorization: token } }
    );
    return res;
  } catch (error) {
    console.log(error.message);
  }
};


