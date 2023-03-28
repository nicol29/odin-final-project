function Modal ({ setModalState, modalStyle, children }) {
  const toggleModal = (e) => {
    const target = e.target.className;

    if (target === "post-modal-bg" || target === "close-modal") {
      setModalState({});
    }
  }

  return (
    <div className="post-modal-bg" onClick={(e) => toggleModal(e)}>
      <div className="close-modal">
        ✕
      </div>
      <div className={modalStyle}>
        {children}
      </div>
    </div>
  )
}

export default Modal;