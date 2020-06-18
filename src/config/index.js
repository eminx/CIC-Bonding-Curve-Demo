const getNewSupplyCashIn = (reserve, supply, trr, amount) => {
  const newSupply = supply * (Math.pow(1 + amount / reserve, trr) - 1);
  return Math.round(newSupply);
};

const getNewReserveCashOut = (reserve, supply, trr, amount) => {
  const newReserve = reserve * (Math.pow(1 + (-1 * amount) / supply, 1 / trr) - 1);
  return Math.round(newReserve);
};

const getPrice = (reserve, supply, trr) => {
  const price = reserve / (supply * trr);
  return price.toFixed(2);
};

const getInvPrice = (reserve, supply, trr) => {
  const price =  (supply * trr)/ reserve;
  return price.toFixed(2);
};

const getCRR = (reserve, supply) => {
  const crr = reserve / supply;
  return crr.toFixed(2);
};

//const getcicBal = () => {
//  const bal = cicBal;
//  return bal.toFixed(2);
//};

//const getresBal = () => {
//  const bal = resBal;
//  return bal.toFixed(2);
//};

const defaultInitials = {
  reserve: 100000,
  supply: 400000,
  trr: 0.25,
  crr: 0.25,
  cicBal: 10000,
  resBal: 10000,
  cicPurchases: 0,
  resPurchases: 0,
  cicSales: 0,
  resSales: 0,

};

const currentInitials = {
  reserve: 100000,
  supply: 400000,
  trr: 0.25,
  crr: 0.25,
  cicBal: 10000,
  resBal: 10000,
  cicPurchases: 0,
  resPurchases: 0,
  cicSales: 0,
  resSales: 0,

};


const defaultCICAmount = 1000;
const defaultResAmount = 1000;

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
  getInvPrice,
  getCRR,
  defaultInitials,
  currentInitials,
  defaultCICAmount,
  defaultResAmount,
  defaultPriceSetItem,
};
