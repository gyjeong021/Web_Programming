import React, { useState } from "react";
import { Button, Box } from "@mui/material";

function DeleteLecture({ deleteLectureItem }) {
  const [lecture, setLecture] = useState('');

  const onInputChange = (e) => {
    setLecture(e.target.value);
  };

  const onDelete = () => {
    deleteLectureItem(lecture);
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
        <h3 style={{ margin: 0, fontSize: 13 }}>강의명 :</h3>
        <input
          name="lecture"
          value={lecture}
          onChange={onInputChange}
          style={{ marginLeft: 8, flex: 1 }}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={onDelete}
        style={{ backgroundColor: '#C2B280', height: '25px' }}
    >
        강의 삭제
      </Button>
    </Box>
  );
}

export default DeleteLecture;
