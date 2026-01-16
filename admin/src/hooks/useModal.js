import { useState } from "react";

export default function useModal(initialState = false) {
  const [open, setOpen] = useState(initialState);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return { open, openModal, closeModal, setOpen };
}
