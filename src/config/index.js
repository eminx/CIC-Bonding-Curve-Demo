const getNewSupplyCashIn = (reserve, supply, trr, amount) => {
  const newSupply = supply + supply * (Math.pow(1 + amount / reserve, trr) - 1);
  return Math.round(newSupply);
};

const getNewReserveCashOut = (reserve, supply, trr, amount) => {
  const newReserve =
    reserve + reserve * (Math.pow(1 + (-1 * amount) / supply, 1 / trr) - 1);
  return Math.round(newReserve);
};

const getPrice = (reserve, supply, trr) => {
  const price = reserve / (supply * trr);
  return price.toFixed(2);
};

const getCRR = (reserve, supply) => {
  const crr = reserve / supply;
  return crr.toFixed(2);
};

const defaultInitials = {
  reserve: 100000,
  supply: 400000,
  trr: 0.25,
  crr: 0.25,
};

const defaultAmount = 1000;

const defaultPriceSetItem = {
  step: 0,
  price: getPrice(
    defaultInitials.reserve,
    defaultInitials.supply,
    defaultInitials.trr
  ),
};

export {
  getNewReserveCashOut,
  getNewSupplyCashIn,
  getPrice,
  getCRR,
  defaultInitials,
  defaultAmount,
  defaultPriceSetItem,
};
