import axios from "axios";
import { ANS_CONTRACT_ADDRESS } from "./constants.js";

export async function readAnsContract() {
  try {
    const state = (
      await axios.get(`https://api.mem.tech/api/state/${ANS_CONTRACT_ADDRESS}`)
    )?.data;
    return state;
  } catch (error) {
    console.log(error);
    return {};
  }
}
