import { atom } from 'recoil';

export const stockItemsState = atom({
  key: 'stockItemsState',
  default: '',
});

export const socketState = atom({
  key: 'socketState',
  default: 'true',
});

export const isURLSearchParams = atom({
  key: 'isURLSearchParams',
  default: { areas: {}, memo: {}, info: {} },
});
