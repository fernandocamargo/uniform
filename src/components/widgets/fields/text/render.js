import { forwardRef, useCallback } from 'react';

export default forwardRef(
  ({ onChange: change, className, error, id, label, value }, ref) => {
    const onChange = useCallback(
      ({ target: { value } }) => change(value),
      [change]
    );

    return (
      <div className={className}>
        <label htmlFor={id}>{label}</label>
        <input id={id} onChange={onChange} ref={ref} value={value} />
        {!!error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }
);
