import { returnToken } from "../src/utils";
import { api, config } from "../src/config/config";

export const createConversation = async (
  users,
  type = "private",
  groupName
) => {
  try {
    const token = returnToken();

    const res = await api.post(
      `${config?.API_URL}/create-conversation`,
      { users, type, groupName },
      { headers: { Authorization: token } }
    );

    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllMessages = async (conversationid) => {
  try {
    const token = returnToken();
    const res = await api.post(
      `${config?.API_URL}/get-all-messages`,
      { conversationid },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const sendMessage = async () => {
  try {
    const res = await api.post(`${config?.API_URL}/send-message`);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const getContactsBySearch = async () => {
  try {
    const token = returnToken();
    const res = await api.post(
      `${config?.API_URL}/get-contacts-by-search`,
      { searchTex: "" },
      { headers: { Authorization: token } }
    );
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const handleMessageSend = async (
  type = "text",
  text,
  receiver,
  conversationid
) => {
  try {
    const token = returnToken();
    const res = await api.post(
      `${config?.API_URL}/create-message`,
      {
        type,
        text,
        receiver,
        conversationid,
      },
      { headers: { Authorization: token } }
    );

    console.log(res.data);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};
