import Cookies from "js-cookie";

const Auth = {
  isAuthorization() {
    if (Cookies.get("auth") === "true" && Cookies.get("userId").length === 1) return true;
    return false;
  },
  getUserId() {
    return Cookies.get("userId");
  },
  signOut(navigate) {
    Cookies.remove("auth");
    Cookies.remove("userId");
    navigate("/login");
  },
};

export default Auth;