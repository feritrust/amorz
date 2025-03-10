export const setCookie = (name, value, options = {}) => {
    let cookie = `${name}=${value};`;
  
    // Handle optional parameters
    if (options.path) cookie += `path=${options.path};`;
    if (options.secure) cookie += "secure;";
    if (options.sameSite) cookie += `SameSite=${options.sameSite};`;
    if (options.maxAge) cookie += `Max-Age=${options.maxAge};`;
  
    document.cookie = cookie;
  };
  
  export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };
  
  export const deleteCookie = (name) => {
    document.cookie = `${name}=; Max-Age=-99999999; path=/;`;
  };
  