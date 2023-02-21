import { readAnsContract } from "./exm.js";

export async function getLeaderboard() {
  try {
    const state = await readAnsContract();
    const sortedBalances = state.balances.sort(
      (a, b) => b.ownedDomains.length - a.ownedDomains.length
    );
    const balanceSortedBalances = Object.fromEntries(
      sortedBalances.map((user) => [user.address, user.ownedDomains.length])
    );
    const marketplaceOrders = state.marketplace.filter(
      (order) => order.status === "open" && order.expiry > new Date()
    );

    for (const order of marketplaceOrders) {
      if (order.owner in balanceSortedBalances) {
        balanceSortedBalances[order.owner] += 1;
      } else {
        balanceSortedBalances[order.owner] = 1;
      }
    }

    return balanceSortedBalances;
  } catch (error) {
    console.log(error);
    return {};
  }
}
