import { readAnsContract } from "./exm.js";

const WL_TXS_COUNT = 1020;

export async function getStats() {
  try {
    const state = await readAnsContract();
    const holders_count = state.balances.length;
    const domains_count =
      state?.balances.map((usr) => usr.ownedDomains).flat().length +
      state?.marketplace.filter(
        (order) => order.status === "open" && order.expiry > new Date()
      ).length;

    const tx_count = state.signatures.length + state.minting_fees_id.length + WL_TXS_COUNT;
    const marketplace_volume = state.marketplace
      .filter((order) => order.status === "executed")
      .map((order) => order.ask_price)
      .reduce((a, b) => a + b);

    return { holders_count, domains_count, tx_count, marketplace_volume };
  } catch (error) {
    return {
      holders_count: "error",
      domains_count: "error",
      tx_count: "error",
      marketplace_volume: "error",
    };
  }
}
