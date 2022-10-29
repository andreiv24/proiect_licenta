import React from "react";
import { Table, Pagination, Modal, Button } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

import Moment from 'react-moment';
import Loading from 'utils/loader';

function TabelProduse ({prods, prev, next, gotoEdit, removeModal, handleClose, handleModal, handleRemove}) {
    const goToPrevPage = (page) => {
        prev(page)
    }
    const goToNextPage = (page) => {
        next(page)
    }
    return(
        <>
            { prods && prods.docs ?
            <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Adăugat</th>
                            <th>Denumirea produsului</th>
                            <th>Disponibil</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            prods.docs.map((item)=>(
                                <tr key={item._id}>
                                    <td><Moment to={item.data}></Moment></td>
                                    <td>{item.denumire_produs}</td>
                                    <td>{item.in_stoc}</td>
                                    <td className="action_btn remove_btn"
                                        onClick={()=>handleModal(item._id)}
                                    >
                                        Ștergere produs
                                    </td>
                                    <td className="action_btn edit_btn"
                                        onClick={()=>gotoEdit(item._id)}
                                    >
                                        Editare produs
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <Pagination>
                    { prods.hasPrevPage ?
                    <>
                        <Pagination.Prev onClick={()=>goToPrevPage(prods.prevPage)}/>
                        <Pagination.Item onClick={()=>goToPrevPage(prods.prevPage)}>
                            {prods.prevPage}
                        </Pagination.Item>
                    </>
                :null}
                <Pagination.Item active>{prods.page}</Pagination.Item>
                { prods.hasNextPage ?
                    <>
                        <Pagination.Item onClick={()=>goToNextPage(prods.nextPage)}>
                            {prods.nextPage}
                        </Pagination.Item>
                        <Pagination.Next onClick={()=>goToNextPage(prods.nextPage)}/>
                    </>
                :null}
                </Pagination>
                <hr />
                <LinkContainer to="/contul_meu/admin/adaugare_produs">
                    <Button variant="secondary">Adăugare produs</Button>
                </LinkContainer>
            </>
            :
            <Loading/>
        }

        <Modal show={removeModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmare ștergere produs</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Ești sigur că vrei să ștergi produsul?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Anulare
                </Button>
                <Button variant="danger" onClick={()=> handleRemove()}>
                    Ștergere
                </Button>
            </Modal.Footer>
        </Modal>

        </>
    )
}

export default TabelProduse;