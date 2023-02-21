import { readAnsContract } from "./exm.js";

export async function getRecents(type) {
  try {
    const state = await readAnsContract();
    const recentDomains = state.balances
      .map((usr) => usr.ownedDomains)
      .flat()
      .sort((a, b) => Number(b.created_at) - Number(a.created_at));
    const marketplaceDomains = state.marketplace
      .filter((order) => order.status === "open" && order.expiry > new Date())
      .map((order) => order.object)
      .sort((a, b) => b.created_at - a.created_at);
    const result = recentDomains
      .concat(marketplaceDomains)
      .sort((a, b) => b.created_at - a.created_at)
      .map((element) => ({
        domain: element.domain,
        color: element.color,
        created_at: element.created_at,
      }));

    if (type === "listing") {
      return marketplaceDomains
        .map((element) => ({
          domain: element.domain,
          color: element.color,
          created_at: element.created_at,
        }));
    }

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}
