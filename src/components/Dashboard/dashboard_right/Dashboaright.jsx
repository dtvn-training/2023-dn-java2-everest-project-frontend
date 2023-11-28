import React from "react";
import "./Dashboaright.css";

const Dashboaright = () => {
  return (
    <div className="dashboard_right">
      <div className="right-header">
        <input placeholder="Search..." className="right-search"></input>
        <div className="header-input-date">
          <div className="input-date">
            <div className="inputdate-title">Start date: </div>
            <input type="date"></input>
          </div>
          <div className="input-date">
            <div className="inputdate-title">End date: </div>
            <input type="date"></input>
          </div>
        </div>
      </div>
      <div className="right-body">
        <table className="right-table">
          <tr>
            <td className="table-header table-item">Campaign Name</td>
            <td className="table-header table-item">Status</td>
            <td className="table-header table-item">Used Amount</td>
            <td className="table-header table-item">Usage Rate</td>
            <td className="table-header table-item">Budget</td>
            <td className="table-header table-item">Start date</td>
            <td className="table-header table-item">End date</td>
          </tr>
          <tr>
            <td className="table-item">Campaign Name</td>
            <td className="table-item">Status</td>
            <td className="table-item">10$</td>
            <td className="table-item">0.5%</td>
            <td className="table-item">10000</td>
            <td className="table-item">2024-12-01 10:00</td>
            <td className="table-item">2024-12-01 10:00</td>
          </tr>
          <tr>
            <td className="table-item">Campaign Name</td>
            <td className="table-item">Status</td>
            <td className="table-item">10$</td>
            <td className="table-item">0.5%</td>
            <td className="table-item">10000</td>
            <td className="table-item">2024-12-01 10:00</td>
            <td className="table-item">2024-12-01 10:00</td>
          </tr>
          <tr>
            <td className="table-item">Campaign Name</td>
            <td className="table-item">Status</td>
            <td className="table-item">10$</td>
            <td className="table-item">0.5%</td>
            <td className="table-item">10000</td>
            <td className="table-item">2024-12-01 10:00</td>
            <td className="table-item">2024-12-01 10:00</td>
          </tr>
          <tr>
            <td className="table-item">Campaign Name</td>
            <td className="table-item">Status</td>
            <td className="table-item">10$</td>
            <td className="table-item">0.5%</td>
            <td className="table-item">10000</td>
            <td className="table-item">2024-12-01 10:00</td>
            <td className="table-item">2024-12-01 10:00</td>
          </tr>
          <tr>
            <td className="table-item">Campaign Name</td>
            <td className="table-item">Status</td>
            <td className="table-item">10$</td>
            <td className="table-item">0.5%</td>
            <td className="table-item">10000</td>
            <td className="table-item">2024-12-01 10:00</td>
            <td className="table-item">2024-12-01 10:00</td>
          </tr>
        </table>
        <div className="right-footer">
          <div className="pagination">
            <a href="#">❮</a>
            <a href="#">1</a>
            <a href="#" className="active">
              2
            </a>
            <a href="#">3</a>
            <a href="#">6</a>
            <a href="#">❯</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboaright;
