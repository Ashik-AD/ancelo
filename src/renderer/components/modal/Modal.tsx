import React, { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
  onClose?: () => void;
}
function Modal({ children, onClose }: Props) {
  let portalElement = document.querySelector(".modal") as HTMLDivElement;
  useEffect(() => {
    if (!portalElement) {
      portalElement = document.createElement("div");
      portalElement.setAttribute("class", "modal");
    }
    if (onClose) {
      portalElement.addEventListener("click", (eve: any) => {
        if(eve.currentTarget.classList.contains("modal")){
        onClose();
        }
      });
    }
    portalElement.classList.add("modal--active");
    return () => {
      portalElement.classList.remove("modal--active");
      if (onClose) {
        portalElement.removeEventListener("click", onClose);
      }
    };
  }, []);
  return createPortal(children, portalElement);
}
export default Modal;
