import { getInternalData } from '../API/fetch.js';

export const ActionList = {
  async__getData: 'async__getData',
  setAbc: 'setAbc',
};

const Actions = {
  [ActionList.async__getData]: async () => {
    const payload = await getInternalData('mock/data.json');
    return {
      key: 'data',
      payload,
    };
  },
  [ActionList.setAbc]: (a) => {
    return {
      key: 'abc',
      payload: a,
    };
  },
};
export default Actions;
