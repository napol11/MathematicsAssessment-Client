import Cookies from "js-cookie";
export const token = { token: "kmuttToken", type: "kmuttTypeMenu" };

export const remove = () => {
  Cookies.remove(token.token);
  Cookies.remove(token.type);
};
