import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

//Maps the respectve string object to ID
const COLLECTION_ID_MAP = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  womens: 4,
  mens: 5,
};

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) => Object.keys(collections).map((key) => collections[key])
);

export const selectCollection = memoize((collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
  )
);

// So reselect as a library is focused on created memoized selectors, specifically when it comes to the flow of state from the redux store.
// Reselect as a library is built to accept and memoize state from reducers but our collectionUrlParam
// is an argument we are trying to pass to our selectors that is completely unrelated to our reducers!
// For this reason we have to leverage a separate helper to memoize this. Which is why we use lodash.memoize!
// It's the same memoization library that lodash suggests in their own documentation.

// *** Converted shop data from array to list object (aka Data Normalization) better performance that mapping over every element ***
//https://www.kirupa.com/html5/hashtables_vs_arrays.htm
