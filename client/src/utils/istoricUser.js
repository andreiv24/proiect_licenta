import React from "react";
import { Table } from "react-bootstrap";
import Moment from "react-moment";

const IstoricUser = ({istoric}) => {
    return(
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Dată</th>
                        <th>Produs</th>
                        <th>Suma totală</th>
                        <th>ID</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        istoric.map((item)=>(
                            <tr key={item[0].tranzactieId}>
                                <td><Moment to={item[0].data_tranzactie}></Moment></td>
                                <td>
                                    {item[0].items.map((article,i)=>(
                                        <div key={i}>{article.name}</div>
                                    ))}
                                </td>
                                {
                                    (item[0].amount)*5 === 1 ? 
                                    <td>{(item[0].amount)*5} leu</td>
                                    :
                                    <td>{(item[0].amount)*5} lei</td>
                                }
                                <td>{item[0].orderID}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}

export default IstoricUser;