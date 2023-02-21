import axios from "axios";
import { ANS_CONTRACT_ADDRESS } from "./constants.js";

export async function readAnsContract() {
  try {
    const state = (
      await axios.get(`https://api.exm.dev/read/${ANS_CONTRACT_ADDRESS}`)
    )?.data;
    return state;
  } catch (error) {
    console.log(error);
    return {};
  }
}
