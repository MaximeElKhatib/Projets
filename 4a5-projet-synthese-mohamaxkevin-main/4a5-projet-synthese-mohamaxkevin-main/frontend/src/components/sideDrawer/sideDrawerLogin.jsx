import "./sideDrawer.css";
import { createPortal } from "react-dom";

const sideDrawerLogin = () => {
  return createPortal(
    <aside className="sideSign"></aside>,
    document.getElementById("drawer")
  );
};
export default sideDrawerLogin;
