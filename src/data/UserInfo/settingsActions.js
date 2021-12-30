import { infoActions } from "./infoSlice";

export function themeChange(theme) {
  return (dispatch) => {
    if (theme === "light") {
      document.body.classList.add("light-mode");
    } else if (theme === "dark") {
      document.body.classList.remove("light-mode");
    }
  };
}
