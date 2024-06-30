import { DeleteOutlineOutlined } from "@mui/icons-material";
import { ListItem, ListItemText, InputBase, ListItemSecondaryAction, IconButton } from "@mui/material";
import React, {useState} from "react";

const Lecture = (props) => {
    const deleteItem = props.deleteItem;
    const editItem = props.editItem;

    // item 상태 변수
    const [item, setItem] = useState(props.item);
    const [readOnly, setReadOnly] = useState(true);

    const deleteEventHandler = () => {
        deleteItem(item);
    }

    const turnOffReadOnly = () => {
        setReadOnly(false);
    }

    const turnOnReadOnly = (e) => {
        if(e.key === "Enter" && readOnly === false) {
            setReadOnly(true);
            editItem(item);
        }
    }
    
    const editEventHandler = (e) => {
        setItem({...item, title:e.target.value});
    }

    return (
        <ListItem>
            <ListItemText>
                <InputBase
                    inputProps={{"aria-label": "naked", readOnly: readOnly}}
                    onClick={turnOffReadOnly}
                    onKeyPress={turnOnReadOnly}
                    onChange={editEventHandler}
                    type="text"
                    id={item.id}
                    name={item.id}
                    value={item.lecture}
                    multiline={true}
                    fullWidth={true}
                />
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton onClick={deleteEventHandler} aria-label="Delete Todo">
                    <DeleteOutlineOutlined />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default Lecture;