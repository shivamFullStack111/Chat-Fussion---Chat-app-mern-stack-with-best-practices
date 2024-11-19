import axios from "axios";
import { dbUrl } from "../src/utils";
import { returnToken } from "../src/utils";

export const createConversation = async (
  users,
  type = "private",
  groupName
) => {
  try {
    const token = returnToken();

    const res = await axios.post(
      `${dbUrl}/create-conversation`,
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
    const res = await axios.post(
      `${dbUrl}/get-all-messages`,
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
    const res = await axios.post(`${dbUrl}/send-message`);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export const getContactsBySearch = async () => {
  try {
    const token = returnToken();
    const res = await axios.post(
      `${dbUrl}/get-contacts-by-search`,
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
  conversationid,
  
) => {
  try {
    const token = returnToken();
    const res = await axios.post(
      `${dbUrl}/create-message`,
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
