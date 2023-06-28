import { useCallback, useState } from "react";

export function useModal(show?: boolean) {
  const [showModal, setShowModal] = useState(show || false);

  const onToggle = useCallback(() => {
    setShowModal(prevState => !prevState)
    console.log('hola')
  }, [showModal])
  return { showModal, onToggle } as const;
}
