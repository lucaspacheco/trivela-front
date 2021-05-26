export const validationMessages = {
  required: 'Campo obrigatório',
  passwordStrength:
    'A senha precisa conter no mínimo 8 caracteres, número, letra maiúscula, minúscula e ao menos um símbolo',
  invalidField: (field) => `${field} inválido`,
};

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()+=_\\/])(?=.{8,})/g;

export const cellPhoneRegex = /\(\d{2}\)\s\d{4,5}-\d{4}/g;
export const tokenRegex = /\d{5}/g;
