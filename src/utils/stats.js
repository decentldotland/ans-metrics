import { readAnsContract } from "./exm.js";

export async function getStats() {
  try {
    const state = await readAnsContract();
    const holders_count = state.balances.length;
    const domains_count =
      state?.balances.map((usr) => usr.ownedDomains).flat().length +
      state?.marketplace.filter(
        (order) => order.status === "open" && order.expiry > new Date()
      ).length;

    return { holders_count, domains_count };
  } catch (error) {
    return { holders_count: "error", domains_count: "error" };
  }
}
