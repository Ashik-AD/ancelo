import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
  onClose?: () => void;
}
function Modal({ children, onClose }: Props) {
  let portalElement = document.querySelector(".modal") as HTMLDivElement;

  useEffect(() => {
    const overlay = document.createElement("div");
    overlay.setAttribute("id", "modal__overlay");
    portalElement.append(overlay);
    if (!portalElement) {
      portalElement = document.createElement("div");
      portalElement.setAttribute("class", "modal");
    }
    if (onClose) {
      overlay.addEventListener("click", onClose);
    }
    return () => {
      portalElement.removeChild(overlay)
      if (onClose) {
        overlay.removeEventListener("click", onClose);
      }
    };
  }, []);
  return createPortal(children, portalElement);
}
export default Modal;
