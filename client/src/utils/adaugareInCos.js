import React from "react";
import { Modal, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const AdaugareInCos = ({modal, handleClose, errorType}) => {
    return(
        <>
            <Modal show={modal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Ne pare rău</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        errorType === 'auth'?
                            <div>Trebuie să aveți un cont pentru a continua</div>
                        :
                            <div>Trebuie să aveți contul verificat pentru a continua</div>
                    }
                </Modal.Body>
                { errorType === 'auth' ?
                <Modal.Footer>
                        <LinkContainer to="/autentificare">
                            <Button variant="primary">
                                Autentificare/Înregistrare
                            </Button>
                        </LinkContainer>
                </Modal.Footer>
                :null}
            </Modal>
        </>
    )
}

export default AdaugareInCos;