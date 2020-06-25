const getPercent = (value, total) => {
  const ratio = total > 0 ? value / total : 0;

  return toPercent(ratio, 2);
};

const toPercent = (decimal, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;

const setInitCICBal = (total) => {
    const newBal = total*0.25
    return newBal;
};

const setInitResBal = (total) => {
    const newBal = total*0.1
    return newBal;
};

const getNewSupplyCashIn = (reserve, supply, trr, amount) => {
    if (reserve >0) {
    const newSupply = supply * (Math.pow(1 + amount / reserve, trr) - 1);
	return newSupply;//Math.round(newSupply);
	}
    else{
	return 0;
    }

};

const getNewReserveCashOut = (reserve, supply, trr, amount) => {
        if (supply >0) {
    const newReserve = reserve * (Math.pow(1 + (-1 * amount) / supply, 1 / trr) - 1);
	    return newReserve;//Math.round(newReserve);
	}
    else{
	return 0;
    }
};

const getPrice = (reserve, supply, trr) => {
    if (supply >0) {
  const price = reserve / (supply * trr);
	return price;//.toFixed(2);
    }
    else {
	return 0;
    }
};

const getInvPrice = (reserve, supply, trr) => {
  if (reserve >0) {
  const price =  (supply * trr)/ reserve;
      return price;//.toFixed(2);
  }
    else{
	return 0;
    }
};

const getCRR = (reserve, supply) => {
    if (supply >0) {
	const crr = reserve / supply;
        return crr; //.toFixed(2);
    }
    else {
	return 0;
    }
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
  cicBal: 20000,
  resBal: 20000,
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
    setInitCICBal,
    setInitResBal,
    getPercent,
    toPercent,
};
