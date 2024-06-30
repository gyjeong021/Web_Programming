import React, { useState } from "react";
import { Button, Box } from "@mui/material";

const EditLecture = ({ editItem, searchItem }) => {
  const [searchLecture, setSearchLecture] = useState("");
  const [item, setItem] = useState({
    id: '',
    lecture: '',
    professor: '',
    university: '',
    studentName: ''
  });

  const onInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const onSearchButtonClick = async () => {
    const foundItem = await searchItem(searchLecture);
    if (foundItem) {
      setItem(foundItem);
    }
  };

  const onEditButtonClick = () => {
    editItem(item);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        border: '1px solid grey',
        borderRadius: 1,
        marginTop: 2,
        maxWidth: 400,
        margin: '0 auto',
      }}
    >
      <div className="inputField" style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <h3 style={{ margin: 0, fontSize: 13 }}>강의명 검색 :</h3>
        <input
          name="searchLecture"
          value={searchLecture}
          onChange={(e) => setSearchLecture(e.target.value)}
          style={{ marginLeft: 8, flex: 1 }}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={onSearchButtonClick}
        style={{ backgroundColor: '#C2B280', marginBottom: '16px', height: '25px' }}
      >
        강의 검색
      </Button>
      <div className="inputField" style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <h3 style={{ margin: 0, fontSize: 13 }}>강의명 :</h3>
        <input
          name="lecture"
          value={item.lecture}
          onChange={onInputChange}
          style={{ marginLeft: 8, flex: 1 }}
        />
      </div>
      <div className="inputField" style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <h3 style={{ margin: 0, fontSize: 13 }}>담당 교수님 :</h3>
        <input
          name="professor"
          value={item.professor}
          onChange={onInputChange}
          style={{ marginLeft: 8, flex: 1 }}
        />
      </div>
      <div className="inputField" style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <h3 style={{ margin: 0, fontSize: 13 }}>학교명 :</h3>
        <input
          name="university"
          value={item.university}
          onChange={onInputChange}
          style={{ marginLeft: 8, flex: 1 }}
        />
      </div>
      <div className="inputField" style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
        <h3 style={{ margin: 0, fontSize: 13 }}>수강 학생 이름 :</h3>
        <input
          name="studentName"
          value={item.studentName}
          onChange={onInputChange}
          style={{ marginLeft: 8, flex: 1 }}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={onEditButtonClick}
        style={{ backgroundColor: '#C2B280', height: '25px' }}
      >
        강의 수정
      </Button>
    </Box>
  );
};

export default EditLecture;
