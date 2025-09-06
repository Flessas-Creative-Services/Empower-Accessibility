import { useState } from "react";
import OpenMenuIcon from "../assets/hamburger.svg?react";
import CloseMenuIcon from "../assets/close.svg?react";

export default function MenuButton({ classes }: { classes: string }) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const toggleMenu = () => setIsOpenMenu((prev) => !prev);

  return isOpenMenu ? (
    <button
      type="button"
      aria-expanded="true"
      className={classes}
      onClick={toggleMenu}
    >
      <span className="visually-hidden">Menu</span>
      <CloseMenuIcon aria-hidden={true} />
    </button>
  ) : (
    <button
      type="button"
      aria-expanded="false"
      className={classes}
      onClick={toggleMenu}
    >
      <span className="visually-hidden">Menu</span>
      <OpenMenuIcon aria-hidden={true} />
    </button>
  );
}
