import { useState, useEffect } from 'react';
import { call, signout } from "./ApiService";
import './App.css';
import { Container, Grid, Button, AppBar, Toolbar, Typography, Tabs, Tab, Box, Paper } from "@mui/material";
import AddLecture from './AddLecture';
import SearchLecture from './SearchLecture';
import EditLecture from './EditLecture';
import LectureRow from './LectureRow';
import DeleteLecture from './DeleteLecture';
import { FaPlusCircle, FaSearch, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [searchedItem, setSearchedItem] = useState(null);

  useEffect(() => {
    call("/lecture", "GET", null).then((response) => {
      setItems(response.data);
      setLoading(false);
    });
  }, []);

  const editItem = async (item) => {
    await call("/lecture", "PUT", item);
    const updatedItems = items.map((i) => (i.id === item.id ? item : i));
    setItems(updatedItems);
    setSearchedItem(item);
  };

  const deleteItem = (item) => {
    call("/lecture", "DELETE", item)
      .then((response) => setItems(response.data));
  };

  const deleteLectureItem = async (lecture) => {
    const response = await call("/lecture", "GET", null);
    const itemToDelete = response.data.find(item => item.lecture === lecture);
    if (itemToDelete) {
      await call("/lecture", "DELETE", itemToDelete);
      setItems(items.filter(item => item.id !== itemToDelete.id));
    }
  };

  const addItem = (item) => {
    call("/lecture", "POST", item)
      .then((response) => setItems(response.data));
  };

  const searchItem = async (lecture) => {
    const response = await call("/lecture", "GET", null);
    const foundItem = response.data.find(item => item.lecture === lecture);
    return foundItem;
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSearchedItem(null); 
  };

  let lectureItems = items.length > 0 && (
    <table style={{ width: "100%", marginTop: 20, borderCollapse: "collapse" }}>
      <caption>lecture table</caption>
      <thead>
        <tr>
          <th style={{ border: "1px solid black", padding: "8px" }}>id</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>lecture</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>professor</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>university</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>studentName</th>
          <th style={{ border: "1px solid black", padding: "8px" }}>삭제버튼</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <LectureRow key={item.id} item={item} deleteItem={deleteItem} />
        ))}
      </tbody>
    </table>
  );

  let navigationBar = (
    <AppBar position="static" style={{ backgroundColor: '#C2B280' }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item container alignItems="center" xs>
            <img src="/book.png" alt="Book Logo" style={{ marginRight: 10, height: '30px' }} />
            <Typography variant="h6" style={{ color: '#FFFFFF' }}>
              수강 목록
            </Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" onClick={signout} style={{ marginLeft: 'auto' }}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  let lectureListPage = (
    <div>
      {navigationBar}
      <Container maxWidth="md">
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
          <Tab label={<><FaPlusCircle style={{ marginBottom: 10 }} />강의 추가</>} />
          <Tab label={<><FaSearch style={{ marginBottom: 10 }} />강의 검색</>} />
          <Tab label={<><FaEdit style={{ marginBottom: 10 }} />강의 수정</>} />
          <Tab label={<><MdDelete style={{ marginBottom: 8 }} />강의 삭제</>} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <AddLecture addItem={addItem} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SearchLecture searchItem={searchItem} setSearchedItem={setSearchedItem} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <EditLecture searchItem={searchItem} editItem={editItem} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <DeleteLecture deleteLectureItem={deleteLectureItem} />
        </TabPanel>
        {(value === 1 || value === 2) && searchedItem && (
          <Paper sx={{ mt: 2, p: 2 }}>
            <Typography variant="h6">강의 정보</Typography>
            <Typography>강의명: {searchedItem.lecture}</Typography>
            <Typography>담당교수님: {searchedItem.professor}</Typography>
            <Typography>학교명: {searchedItem.university}</Typography>
            <Typography>수강학생 이름: {searchedItem.studentName}</Typography>
          </Paper>
        )}
        <div className="LectureList">{lectureItems}</div>
      </Container>
    </div>
  );

  let loadingPage = <h1> 로딩중.. </h1>;
  let content = loadingPage;

  if (!loading) {
    content = lectureListPage;
  }

  return <div className='App'>{content}</div>;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default App;
