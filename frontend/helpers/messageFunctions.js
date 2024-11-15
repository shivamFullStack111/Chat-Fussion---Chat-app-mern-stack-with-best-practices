import axios from "axios";
import { dbUrl } from "../src/utils";
import { returnToken } from "../src/utils";

export const createConversation = async (users) => {
  try {
    const token = returnToken();

    const res = await axios.post(
      `${dbUrl}/create-conversation`,
      { users },
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
