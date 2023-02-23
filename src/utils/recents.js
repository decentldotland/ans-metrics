import { readAnsContract } from "./exm.js";
import { pricing } from "./pricing.js";

export async function getRecents(type) {
  try {
    const state = await readAnsContract();
    const priceTable = await pricing(state);

    for (const user of state.balances) {
      for (const domain of user.ownedDomains) {
        domain.owner = user.address
      }
    };

    const recentDomains = state.balances
      .map((usr) => usr.ownedDomains)
      .flat()
      .sort((a, b) => Number(b.created_at) - Number(a.created_at));
    const marketplaceDomains = state.marketplace
      .filter((order) => order.status === "open" && order.expiry > new Date())
      .sort((a, b) => b.object.created_at - a.object.created_at);
    const result = recentDomains
      .concat(marketplaceDomains)
      .sort((a, b) => b.created_at - a.created_at)
      .map((element) => ({
        domain: element.domain,
        owner: element.owner,
        color: element.color,
        created_at: element.created_at,
        mint_cost: priceTable[`l${element.domain.length}`],
      }));

    if (type === "listing") {
      return marketplaceDomains
        .map((element) => ({
          id: element.id,
          type: element.type,
          for: element.for,
          domain: element.domain,
          owner: element.owner,
          color: element.object.color,
          minted_at: element.object.created_at,
          listed_at: element.timestamp,
          expiry: element.expiry,
          ask_price: element.ask_price,
          mint_cost: priceTable[`l${element.domain.length}`],
        }));
    }

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}
