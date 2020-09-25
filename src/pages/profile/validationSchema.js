import * as Yup from 'yup';

import {
  validationMessages,
  cellPhoneRegex,
  passwordRegex,
} from 'utils/consts';

export default Yup.object().shape({
  name: Yup.string().required(validationMessages.required),
  cellPhone: Yup.string()
    .required(validationMessages.required)
    .matches(cellPhoneRegex, validationMessages.invalidField('Celular')),
  email: Yup.string()
    .email(validationMessages.invalidField('E-mail'))
    .required(validationMessages.required),
  actualPassword: Yup.string(),
  newPassword: Yup.string().when('actualPassword', {
    is: (actualPassword) => !!actualPassword,
    then: Yup.string()
      .required(validationMessages.required)
      .matches(passwordRegex, validationMessages.passwordStrength),
  }),
  confirmPassword: Yup.string().when('actualPassword', {
    is: (actualPassword) => !!actualPassword,
    then: Yup.string()
      .required(validationMessages.required)
      .test('passwords-match', 'As senhas não correspondem', function validate(
        value,
      ) {
        return this.parent.newPassword === value;
      }),
  }),
});
