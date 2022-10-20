import React, { useState } from "react";
import { 
    ListItem, 
    ListItemText, 
    InputBase, 
    Checkbox, 
    ListItemSecondaryAction, 
    IconButton
} from "@mui/material"
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";

const Todo = (props) => {
    const [item, setItem] = useState(props.item);
    const [readOnly, setReadOnly] = useState(true);
    const deleteItem = props.deleteItem;
    const editItem = props.editItem;

    const checkboxEventHandler = (e) => {
        item.done = e.target.checked;
        editItem(item);
    }

    const editEventHandler = (e) => {
        setItem({...item, title: e.target.value});

        // item.title = e.target.value;
        // editItem(); //다시 렌더링
    };

    //엔터키를 누르는 순간 http요청 보냄
    const turnOnReadOnly = (e) => {
        if(e.key === "Enter" && readOnly === false){
            setReadOnly(true);
            editItem(item);
        }
    };

    const turnOffReadOnly = () => {
        setReadOnly(false);
    };

    const deleteEventHandler = () => {
        deleteItem(item);
    };

    return(
        <ListItem>
            <Checkbox checked={item.done} onChange={checkboxEventHandler}/>
            <ListItemText>
                <InputBase 
                inputProps={{"aria-label" : "naked", readOnly: readOnly}}
                onClick={turnOffReadOnly}
                onKeyDown={turnOnReadOnly}
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
                <IconButton aria-label="Delete todo" onClick={deleteEventHandler}>
                    <DeleteOutlined/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>   
    );
};

export default Todo;