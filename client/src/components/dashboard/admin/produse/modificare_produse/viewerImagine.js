import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ViewerImagine = ({formik,deleteImagine}) => {
    const [ idToDelete, setIdToDelete ] = useState(null);
    const [ show, setShow ] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (index) => {
        setIdToDelete(index)
        setShow(true)
    }

    const confirmDelete = () => {
        deleteImagine(idToDelete)
        handleClose()
        setIdToDelete(null);
    }

    return(
        <>
            { formik.values && formik.values.imagini ?
                formik.values.imagini.map((item,i)=>(
                    <div key={item}
                        className="pic_block"
                        onClick={()=> handleShow(i)}
                        style={{
                            background:`url(${item})`
                        }}
                    ></div>
                ))
            :null}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmare ștergere</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Ești sigur că vrei să ștergi imaginea?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Anulare
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Ștergere
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ViewerImagine;