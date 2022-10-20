import React, {useState} from "react";

import { Button, Grid, TextField } from "@mui/material";

const AddTodo = (props) => {
    //사용자의 입력을 임시로 저장할 오브젝트
    const [item, setItem] = useState({ title: "" });
    const addItem = props.addItem; //App.js에서 넘겨받음

    const onButtonClick = () => {
        addItem(item);
        setItem({ title: ""});
    }

    const enterKeyEventHandler = (e) => {
        if(e.key === "Enter") {
            onButtonClick();
        }
    }

    //TextField에 사용자 입력이 들어올 때마다 실행
    const onInputChange = (e) => {
        setItem({title: e.target.value}); //입력된 값을 item의 title로 지정
        console.log(item); //item 새로 업데이트
    }

    return(
    <Grid container style={{ marginTop: 20 }}>
          <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
            <TextField placeholder="Add Todo here" fullWidth
            onChange={onInputChange}
            onKeyPress={enterKeyEventHandler}
            value={item.title} />
          </Grid>
          <Grid xs={1} md={1} item>
            <Button 
            fullWidth style={{ height: '100%' }} color="secondary" variant="outlined"
            onClick={onButtonClick}>
              +
            </Button>
          </Grid>
    </Grid>
    );
}

export default AddTodo;