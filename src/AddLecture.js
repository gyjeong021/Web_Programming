import React, {useState} from "react";
import {Button, Box} from "@mui/material";

const AddLecture = (props) => {
    const [item, setItem] = useState({ 
        lecture: "",
        professor: "",
        university: "",
        studentName: ""
    });

    const addItem = props.addItem; //부모가 전달해준 함수

    const onButtonClick = (e) => {
        addItem(item);
        setItem({lecture: "", professor: "", university: "", studentName: ""}); // setItem 하면 리렌더링 일어남
    }

    const onInputChange = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        
        setItem(prevItem => ({
            ...prevItem,
            [fieldName]: fieldValue
        }));
    }

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
                <h3 style={{ margin: 0, fontSize:13 }}>강의명 :</h3>
                <input
                name="lecture"
                value={item.lecture}
                onChange={onInputChange}
                style={{ marginLeft: 8, flex: 1 }}
                />
            </div>
            <div className="inputField" style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                <h3 style={{ margin: 0, fontSize:13 }}>담당 교수님 :</h3>
                <input
                name="professor"
                value={item.professor}
                onChange={onInputChange}
                style={{ marginLeft: 8, flex: 1 }}
                />
            </div>
            <div className="inputField" style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                <h3 style={{ margin: 0, fontSize:13 }}>대학명 :</h3>
                <input
                name="university"
                value={item.university}
                onChange={onInputChange}
                style={{ marginLeft: 8, flex: 1 }}
                />
            </div>
            <div className="inputField" style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                <h3 style={{ margin: 0, fontSize:13 }}>수강 학생 이름 :</h3>
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
                onClick={onButtonClick}
                style={{ backgroundColor: '#C2B280', height: '25px' }}
            >
                강의 추가
            </Button>    
        </Box>
    );
}

export default AddLecture;