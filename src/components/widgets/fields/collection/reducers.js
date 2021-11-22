import update from 'immutability-helper';

export const getInitialState = () => ({ options: [] });

export const set = (next) => (current) => update(current, { $merge: next });
