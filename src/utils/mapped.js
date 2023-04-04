import { readAnsContract } from "./exm.js";

export async function mapState() {
  try {
    const state = await readAnsContract();
    const map = state.balances.map((usr) => ({
      address: usr.address,
      primary: usr.primary_domain,
    }));

    return map;
  } catch (error) {
    console.log(error);
    return [];
  }
}
