export const saveToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const getToken = () => {
  return localStorage.getItem("accessToken");
};

export const logout = () => {
  localStorage.removeItem("accessToken");

  window.location.href = "/login";
};
