function createAction(type, payload) {
  return payload ? { type, payload } : { type };
}

export const actionHelper = {
  createAction,
};
