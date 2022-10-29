import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { errorHelper } from "utils/tools";

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { List, ListItem, ListItemText, Collapse, TextField, Button } from '@mui/material';

const defaultPret = { min: 0, max: 10000 }

const Preturi = (props) => {
    const [open, setOpen] = useState(props.initialState)
    const handleOptiuniOpen = () => setOpen(!open);
    const resetPreturi = () => {
        props.handleRange(defaultPret)
    }
    const formik = useFormik({
        initialValues: { min: 0, max: 10000 },
        validationSchema: Yup.object({
            min: Yup.number()
                .min(0, 'Valoarea minimă care poate fi introdusă este de 0 lei')
                .required('Trebuie introdus un preț'),
            max: Yup.number()
                .max(10000, 'Valoarea maximă care poate fi introdusă este de 10000 de lei')
                .required('Trebuie introdus un preț')
        }),
        onSubmit: (values) => {
            props.handleRange([values.min, values.max])
        }
    })

    return (
        <div className="collapse_items_wrapper">
            <List>
                <ListItem onClick={handleOptiuniOpen}>
                    <ListItemText
                        primary={props.title}
                        className="collapse_title"
                    />
                    {open ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                </ListItem>
                <Collapse in={open} timeout="auto">
                    <List component="div" disablePadding>
                        <form className="mt-3" onSubmit={formik.handleSubmit}>
                            <div>
                                <TextField
                                    placeholder="Introduceți prețul minim"
                                    name="min"
                                    variant="outlined"
                                    type="number"
                                    required="ddd"
                                    {...formik.getFieldProps('min')}
                                    {...errorHelper(formik, 'min')}
                                />
                            </div>
                            <p></p>
                            <div>
                                <TextField
                                    placeholder="Introduceți prețul maxim"
                                    name="max"
                                    variant="outlined"
                                    type="number"
                                    {...formik.getFieldProps('max')}
                                    {...errorHelper(formik, 'max')}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="mt-3"
                                variant="outlined"
                                color="secondary"
                                size="small"
                            >
                                Căutare produse
                            </Button>
                        </form>
                        <Button
                            className="mt-3"
                            variant="outlined"
                            color="secondary"
                            size="small"
                            onClick={resetPreturi}
                        >
                            Resetare
                        </Button>
                    </List>
                </Collapse>
            </List>
        </div>
    )
}

export default Preturi;