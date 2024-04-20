
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton } from "@mui/material";
import React, {useState} from "react";

const Todo = (props) => {
    // let title = props.item; 

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
        if(e.key === "Enter") {
            setReadOnly(true);
        }
    }
    
    const editEventHandler = (e) => {
        item.title = e.target.value;
        editItem();
    }

    const checkboxEventHandler = (e) => {
        item.done = e.target.checked;
        editItem();
    }

    return (
        <ListItem>
            <Checkbox checked={item.done} onChange={checkboxEventHandler}/>
            <ListItemText>
                <InputBase
                    inputProps={{"aria-label": "naked", readOnly: readOnly}}
                    onClick={turnOffReadOnly}
                    onKeyPress={turnOnReadOnly}
                    onChange={editEventHandler}
                    type="text"
                    id={item.id}
                    name={item.id}
                    value={item.title}
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

export default Todo;