export const getInitialState = () => ({
  loading: false,
  data: null,
  error: null,
});

export const attempt = () => () => ({ loading: true, data: null, error: null });

export const succeed = (data) => () => ({ loading: false, error: null, data });

export const fail = (error) => () => ({ loading: false, data: null, error });
