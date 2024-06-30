import React from 'react';

const LectureRow = ({ item, deleteItem }) => {
  const handleDelete = () => {
    deleteItem(item);
  };

  return (
    <tr>
        <td>{item.id}</td>
        <td>{item.lecture}</td>
        <td>{item.professor}</td>
        <td>{item.university}</td>
        <td>{item.studentName}</td>
        <td>
        <button onClick={handleDelete}>delete</button>
      </td>
    </tr>
  );
};

export default LectureRow;
