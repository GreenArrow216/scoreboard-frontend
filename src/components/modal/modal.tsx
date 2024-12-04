import { ReactNode } from "react";
import X from '../../assets/x.svg'

import "./modal.css";

const Modal = (props: {
  children: ReactNode;
  title: string;
  isOpen: boolean;
}) => {
  return (
    <div className={`modal ${props.isOpen ? "open" : "close"}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>{props.title}</h3>
          <div className="btn icon-btn">
            <img src={X} alt={'close.svg'}/>
          </div>
        </div>
        <div className="modal-body">{props.children}</div>
        <div className="modal-footer">
          <button>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
