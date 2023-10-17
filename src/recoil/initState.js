import { atom, selector } from "recoil";

export const tokenState = atom({
  key: "tokenState",
  default: localStorage.getItem("token") || "",
});
export const initState = atom({
  key: "initText",
  default: "",
});
export const newinitState = selector({
  key: "newInitState",
  get: ({ get }) => {
    const currentInit = get(initState);
    return currentInit.filter((init) => init.status === "new");
  },
});
export default initState;
