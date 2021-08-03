import { forwardRef, useCallback } from 'react';

export default forwardRef(({ onChange: change, id, label, value }, ref) => {
  const onChange = useCallback(
    ({ target: { value } }) => change(value),
    [change]
  );

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} onChange={onChange} ref={ref} value={value} />
    </div>
  );
});
