import React, {useEffect, useState} from "react";
import Todo from './Todo';
import AddTodo from './AddTodo';
import { 
  Container, 
  List, 
  Paper,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
 } from "@mui/material";
import './App.css';
import { call , signout} from "./service/ApiService";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    call("/todo", "GET", null).then((response) => {
      setItems(response.data)
      setLoading(true);
    });
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

  // navigationBar 추가
  let navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">오늘의 할일</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" raised onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

   /* 로딩중이 아닐 때 렌더링 할 부분 */
   let todoListPage = (
    <div>
      {navigationBar} {/* 네비게이션 바 렌더링 */}
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );

  /* 로딩중일 때 렌더링 할 부분 */
  let loadingPage = <h1> 로딩중.. </h1>;
  let content = loadingPage;

  if (!loading) {
    /* 로딩중이 아니면 todoListPage를 선택*/
    content = todoListPage;
  }

  /* 선택한 content 렌더링 */
  return <div className="App">{content}</div>;
}

export default App;
