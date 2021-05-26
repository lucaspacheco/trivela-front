import * as Yup from 'yup';

import { isValidCPF } from 'utils/helpers';
import {
  validationMessages,
  phoneRegex,
  passwordRegex,
} from 'utils/consts';

export default Yup.object().shape({
  name: Yup.string().required(validationMessages.required),
  cpf: Yup.string()
    .required(validationMessages.required)
    .test('cpf-valid', validationMessages.invalidField('CPF'), (value) =>
      isValidCPF(value),
    ),
  cartolaTeam: Yup.object().nullable().required(validationMessages.required),
  phone: Yup.string()
    .required(validationMessages.required)
    .matches(phoneRegex, validationMessages.invalidField('Celular')),
  email: Yup.string()
    .required(validationMessages.required)
    .email(validationMessages.invalidField('E-mail')),
  confirmEmail: Yup.string()
    .required(validationMessages.required)
    .test('emails-match', 'Os e-mails não correspondem', function validate(
      value,
    ) {
      return this.parent.email === value;
    }),
  /*password: Yup.string()
    .required(validationMessages.required)
    .matches(passwordRegex, validationMessages.passwordStrength),
  confirmPassword: Yup.string()
    .required(validationMessages.required)
    .test('passwords-match', 'As senhas não correspondem', function validate(
      value,
    ) {
      return this.parent.password === value;
    }),*/
});
