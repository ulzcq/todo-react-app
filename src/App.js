import React, {useEffect, useState} from "react";
import Todo from './Todo';
import AddTodo from './AddTodo';
import { Container, List, Paper } from '@mui/material';
import './App.css';
import { call } from "./service/ApiService";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    call("/todo", "GET", null)
    .then((response) => setItems(response.data));
  },[]);

  const editItem = (item) => { //item 매개변수 추가됨
    call("/todo", "PUT", item)
    .then((response) => setItems(response.data));

    // setItems([...items]); //새 배열로 초기화
    // console.log("items : ", items);
  };

  const deleteItem = (item) => {
    call("/todo", "DELETE", item)
    .then((response) => setItems(response.data));

    // const newItems = items.filter(e => e.id != item.id); //삭제할 아이템 제외
    // setItems([...newItems]); //다시 배열에 저장
  };

  const addItem = (item) => {
    call("/todo", "POST", item)
    .then((response) => setItems(response.data));

    // item.id = "ID-" + items.length; //key를 위한 id
    // item.done = false; //done 초기화
    // setItems([...items, item]); //새 배열을 만들어서 추가 및 세팅
    // console.log("items : ", items);
  };

  let todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item) => (
          <Todo item={item} key={item.id} editItem={editItem} deleteItem={deleteItem} />
        ))}
      </List>
    </Paper>
  );

  return(
    <div className="App">
    <Container maxWidth="md">
      <AddTodo addItem={addItem} />
      <div className="TodoList">{todoItems}</div>
    </Container>
  </div>
  );
}

export default App;
