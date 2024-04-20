import { useState } from 'react';
import './App.css';
import Todo from './Todo';
import { Container, List, Paper } from "@mui/material";
import AddTodo from './AddTodo';

function App() {
  // item 상태 변수
  const [items, setItems] = useState([{
    id: "0",
    title: "Hello World 1",
    done: true 
  }, {
    id: "1",
    title: "Hello World 2",
    done: false
  }]);

  const addItem = (item) => {
    item.id = "ID" + item.length;
    item.done = false;
    setItems([...items, item]); // 자동으로 리렌더링이 일어남
    console.log("items : ", items);
  }

  let todoItems = 
    items.length > 0 && (
      <Paper style={{margin: 16}}>
        <List>
          {items.map((item) => (
            <Todo item={item} key={item.id} />
          ))}
        </List>
      </Paper>
    )

  return ( <div className='App'>
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className='TodoList'> {todoItems} </div>
      </Container>
    </div>
  );
}

export default App;
