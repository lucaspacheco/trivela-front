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

  const cookieDefinition = `${cname}=${cvalue};${expires};path=/`;

  document.cookie = cookieDefinition;

  return cookieDefinition;
};
