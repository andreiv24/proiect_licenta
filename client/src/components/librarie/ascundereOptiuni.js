import React, { useState } from "react";

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { List, ListItem, ListItemSecondaryAction, ListItemText, Checkbox, Collapse } from '@mui/material'

const AscundereOptiuni = (props) => {
    const [open, setOpen] = useState(props.initialState)
    const [checked, setChecked] = useState([]);
    const handleOptiuniOpen = () => setOpen(!open);
    const renderList = () => (
        props.list ?
            props.list.map((value)=>(
                <ListItem key={value._id}>
                    <ListItemText primary={value.denumire}/>
                    <ListItemSecondaryAction>
                        <Checkbox
                            color="primary"
                            onChange={ ()=> handleToggle(value._id) }
                            checked={checked.indexOf(value._id) !== -1}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            ))
        :null
    )

    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if(currentIndex === -1){
            newChecked.push(value)
        }else{
            newChecked.splice(currentIndex,1)
        }

        setChecked(newChecked);
        props.handleFilters(newChecked);

    }

    return(
        <div className="collapse_items_wrapper">
            <List>
                <ListItem onClick={handleOptiuniOpen}>
                    <ListItemText
                        primary={props.title}
                        className="collapse_title"
                    />
                    { open ? <ArrowDropDownIcon /> : <ArrowDropUpIcon /> }
                </ListItem>
                <Collapse in={open} timeout="auto">
                    <List component="div" disablePadding>
                        {renderList()}
                    </List>
                </Collapse>
            </List>
        </div>
    )
}

export default AscundereOptiuni;