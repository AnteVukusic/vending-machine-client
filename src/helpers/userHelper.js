function getUserProductsList(user) {
  const ret = {};
  for (let i = 0; i < user.purchases.length; i++) {
    const purchasedItems = user.purchases[i].items;
    for (let j = 0; j < purchasedItems.length; j++) {
      const purchasedItem = purchasedItems[j];
      if (!ret[purchasedItem.productId]) {
        ret[purchasedItem.productId] = {
          ...purchasedItem,
        };
      } else {
        ret[purchasedItem.productId].amountBought += purchasedItem.amountBought;
      }
    }
  }
  return Object.keys(ret).map((key) => ret[key]);
}

export const userHelper = {
  getUserProductsList,
};
