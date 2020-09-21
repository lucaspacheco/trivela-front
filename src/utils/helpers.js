/**
 * Returns a cookie value if defined.
 *
 * @param {string} cname Cookie name.
 *
 * @returns {string}
 */
export const getCookie = (cname) => {
  if (typeof document === 'undefined') {
    return null;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${cname}=`);

  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }

  return null;
};

/**
 * Sets a cookie
 *
 * @param {string} cname Cookie name.
 * @param {string} cvalue Cookie value.
 * @param {number} exdays Number of days before expiring.
 *
 * @returns {string} Cookie definition string.
 */
export const setCookie = (cname, cvalue, exdays = 4) => {
  if (typeof document === 'undefined') {
    return null;
  }

  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toGMTString()}`;

  const cookieDefinition = `${cname}=${cvalue || ''};${expires};path=/`;

  document.cookie = cookieDefinition;

  return cookieDefinition;
};

/**
 * Validats a CPF
 *
 * @param {string} cname The cpf to be validated
 *
 * @returns {boolean} True if CPF is valid, false otherwise.
 */
export const isValidCPF = (CPF = '') => {
  if (
    CPF.length !== 14 ||
    !Array.from(CPF).filter((e) => e !== CPF[0]).length
  ) {
    return false;
  }

  const internalCPF = CPF.replace(/[\s.-]*/gim, '');

  let sum = 0;
  let rest;

  for (let i = 1; i <= 9; i += 1)
    sum += Number(internalCPF.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== Number(internalCPF.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i += 1)
    sum += Number(internalCPF.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== Number(internalCPF.substring(10, 11))) return false;
  return true;
};

/**
 * Format money to BRL
 *
 * @param {number} value Raw value
 * @returns {string}
 */
export const formatMoney = (value) => {
  return String(
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value),
  ).replace(String.fromCharCode(160), String.fromCharCode(32));
};

/**
 * Turns a string date into a formatted String.
 *
 * @param {string} date The date  (e.g.: 1987-05-31T03:00:00.000Z) to be turned into a formatted string
 * @returns {string}
 */
export const dateToString = (date) => {
  if (!date) return '';
  const jsDate = new Date(date);

  const day = jsDate.getDate();
  const month = jsDate.getMonth();
  const year = jsDate.getFullYear();
  const hour = jsDate.getHours();
  const minutes = jsDate.getMinutes();

  return `${day}/${month + 1}/${year} às ${hour}h${minutes}m`;
};
