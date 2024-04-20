import { useState } from 'react';
import './App.css';
import Todo from './Todo';
import { Container, List, Paper } from "@mui/material";
import AddTodo from './AddTodo';

function App() {
  // item 상태 변수
  const [items, setItems] = useState([]);

  const editItem = () => {
    setItems([...items]);
  }
  
  const deleteItem = (item) => {
    const newItems = items.filter(e => e.id != item.id);
    setItems([...newItems]);
  }

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
            <Todo item={item} key={item.id} deleteItem={deleteItem} editItem={editItem}/>
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
