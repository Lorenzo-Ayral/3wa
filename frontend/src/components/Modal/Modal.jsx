import styles from "../../css/components/Modal/Modal.module.css";

function Modal({ modalIsOpen, closeModal, modalTitle, modalBody, modalConfirm }) {
    const modalClass = `${styles.modal} ${modalIsOpen ? styles.show : ""}`;

    return (
        <div className={modalClass}>
            <div className={styles["modal-dialog"]}>
                <div className={styles["modal-content"]}>
                    <div className={styles["modal-header"]}>
                        <h5 className={styles["modal-title"]}>{modalTitle}</h5>
                        <button type="button" className={styles.close} onClick={closeModal}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className={styles["modal-body"]}>
                        <>{modalBody}</>
                    </div>
                    <div className={styles["modal-footer"]}>
                        <button type="button" className={styles.btn + " " + styles["btn-secondary"]} onClick={closeModal}>
                            Annuler
                        </button>
                        <button type="button" className={styles.btn + " " + styles["btn-danger"]} onClick={modalConfirm}>
                            Confirmer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
