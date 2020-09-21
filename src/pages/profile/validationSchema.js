import * as Yup from 'yup';

import { validationMessages, cellPhoneRegex } from 'utils/consts';

export default Yup.object().shape({
  name: Yup.string().required(validationMessages.required),
  cellPhone: Yup.string()
    .required(validationMessages.required)
    .matches(cellPhoneRegex, validationMessages.invalidField('Celular')),
  email: Yup.string()
    .email(validationMessages.invalidField('E-mail'))
    .required(validationMessages.required),
  password: Yup.string().required(validationMessages.required),
});
