import { useState } from 'react';
import './App.css';
import Todo from './Todo';
import { List, Paper } from "@mui/material";

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
  }, {
    id: "2",
    title: "Hello World 3",
    done: true
  }]);

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

  return (
    <div className="App">
      {/* <Todo item={items[0]} />
      <Todo item={items[1]} /> */}
      {todoItems}
    </div>
  );
}

export default App;
