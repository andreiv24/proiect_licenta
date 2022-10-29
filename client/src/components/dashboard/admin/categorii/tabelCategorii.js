import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Modal, Button } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { getCategoriiAll } from "store/actions/categorii.actions";
import Loading from 'utils/loader';

function TabelCategorii ({gotoEdit, removeModal, handleClose, handleModal, handleRemove}) {
    const categorii = useSelector(state=>state.categorii);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getCategoriiAll());
    },[dispatch])
    return(
        <>
            { categorii && categorii.all ?
            <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Denumirea categoriei</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categorii.all.map((item)=>(
                                <tr key={item._id}>
                                    <td>{item.denumire}</td>
                                    <td className="action_btn remove_btn"
                                        onClick={()=>handleModal(item._id)}
                                    >
                                        Ștergere categorie
                                    </td>
                                    <td className="action_btn edit_btn"
                                        onClick={()=>gotoEdit(item._id)}
                                    >
                                        Editare categorie
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <hr />
                <LinkContainer to="/contul_meu/admin/adaugare_categorie">
                    <Button variant="secondary">Adăugare categorie</Button>
                </LinkContainer>
            </>
            :
            <Loading/>
        }

        <Modal show={removeModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmare ștergere categorie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Ești sigur că vrei să ștergi categoria?
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

export default TabelCategorii;