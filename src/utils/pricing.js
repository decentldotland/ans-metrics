import axios from "axios";

export async function pricing(state) {
  try {
    const arPrice = await fetchArPrice();
    const priceTable = state.pricing;
    for (const key in priceTable) {
      const newValue = [priceTable[key], priceTable[key] / arPrice];
      priceTable[key] = newValue;
    }

    return priceTable;
  } catch (error) {
    return priceTable;
  }
}

async function fetchArPrice() {
  try {
    const req = (
      await axios.get(
        `https://api.redstone.finance/prices/?symbol=AR&provider=redstone&limit=1`
      )
    )?.data;
    return req[0]?.value;
  } catch (error) {
    return 0;
  }
}
