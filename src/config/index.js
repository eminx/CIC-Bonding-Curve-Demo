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

const defaultInitials = {
  reserve: 1000,
  supply: 4000,
  trr: 0.25,
};

const defaultPriceSetItem = {
  step: 0,
  price: getPrice(
    defaultInitials.reserve,
    defaultInitials.supply,
    defaultInitials.trr
  ),
};

const defaultAmount = 50;

export {
  getNewReserveCashOut,
  getNewSupplyCashIn,
  getPrice,
  defaultInitials,
  defaultPriceSetItem,
  defaultAmount,
};
