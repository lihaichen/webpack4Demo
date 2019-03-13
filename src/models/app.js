import { Map } from 'immutable';

export default {
  namespace: 'app',
  state: Map({ count: 0 }),
  subscriptions: {
    setup({ dispatch, history }) {},
  },
  effects: {},
  reducers: {
    save(state, action) {
      return state.merge(action.payload);
    },
  },
};
