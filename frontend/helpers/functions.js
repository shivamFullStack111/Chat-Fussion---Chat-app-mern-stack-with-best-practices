import { returnToken } from "../src/utils";
import { api, config } from "../src/config/config";

export const getAllUsers = async () => {
  try {
    const res = await api.get(`${config?.API_URL}/get-all-users`);

    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const addToContact = async (userid) => {
  try {
    const token = returnToken();
    const res = await api.post(
      `${config?.API_URL}/add-to-contact`,
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
    const res = await api.post(`${config?.API_URL}/get-users-by-search-or-number`, {
      searchText: searchText,
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const handleBlockUser = async (userid) => {
  try {
    const res = await api.post(
      `${config?.API_URL}/block-user`,
      { userid },
    );
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const handleUnblockUser = async (userid) => {
  try {
    const res = await api.post(
      `${config?.API_URL}/unblock-user`,
      { userid },
    );

    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const removeFromContact = async (userid) => {
  try {
    const token = returnToken();
    const res = await api.post(
      `${config?.API_URL}/remove-from-contact`,
      { userid },
      { headers: { Authorization: token } }
    );
    return res;
  } catch (error) {
    console.log(error.message);
  }
};


