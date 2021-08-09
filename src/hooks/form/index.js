import update from 'immutability-helper';
import { useFormik } from 'formik';

export default ({ hash, ...settings }) => {
  const formik = useFormik(settings);

  return update(formik, { [hash]: { $set: formik }, fields: { $set: {} } });
};
