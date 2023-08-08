import { Icon } from "@iconify/react";
import { toast } from "react-hot-toast";
import fetcher from "lib/fetch";
import style from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "renderer/store";
import { useModal } from "renderer/hooks/useModal";
import Modal from "../modal/Modal";
import SessionForm, { SessionFormState } from "./SessionForm";
import { Sessions } from "@prisma/client";
import { shallow } from "zustand/shallow";

export default function ActionDropdown(
  { id, title, description, schedule }: Sessions,
) {
  const { updateSession, removeSession } = useAppStore(
    ({ sessions }) =>
      sessions(({ removeSession, updateSession }) => ({
        updateSession,
        removeSession,
      })),
    shallow,
  );
  const { showModal, onToggle } = useModal();
  const router = useNavigate();

  async function handleDelete() {
    const res = await fetcher(`/sessions/${id}/flush`, { method: "DELETE" });
    if (res.error) {
      toast.error(res.error);
      return;
    }
    removeSession(id);
    toast.success("One session remove successful");
    router("/session");
  }

  async function handleUpdate(values: SessionFormState) {
    const res = await fetcher(`/sessions/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: values.title,
        description: values.description,
        schedule: values.schedule,
      }),
    });

    if (res.error) {
      toast.error(res.error);
      return;
    }

    updateSession(res.session);
    onToggle();
    toast.success(`Session update successful`);
  }

  return (
    <>
      <div className={style.action__dropdown}>
        <span
          className={`${style.dropdown__btn__open}`}
          tabIndex={0}
          role="button"
          aria-label="Session options"
        >
          <Icon icon="mdi:dots-horizontal" />
        </span>
        <ul className={style.action__content}>
          <li tabIndex={0} aria-label="Edit session" onClick={onToggle}>
            <Icon icon="mdi:pencil-outline" className={style.action__icon} />
            <span className="medium">Edit</span>
          </li>
          <li tabIndex={0} aria-label="Delete session" onClick={handleDelete}>
            <Icon icon="mdi:delete-variant" className={style.action__icon} />
            <span className="medium">Delete</span>
          </li>
        </ul>
      </div>
      {showModal &&
        (
          <Modal onClose={onToggle}>
            <div className={style.model__content}>
              <h2>Edit Session</h2>
              <SessionForm
                isUpdate
                values={{ title, description: description!!, schedule }}
                onCreate={handleUpdate}
                onCancel={onToggle}
              />
            </div>
          </Modal>
        )}
    </>
  );
}
