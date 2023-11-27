import React from "react";
import "./Tabel.css";

const Table = ({ data, columns }) => {
  return (
    <table className="right-table">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} className="table-header table-item">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="table-item">
                {column === "Username" ? row["Username"] : row[column]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
