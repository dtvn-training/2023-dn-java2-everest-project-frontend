import React from "react";
import "./Dashboaright.css";
export default function Dashboaright() {
  return (
    <div class="dashboard_right">
      <div class="right-header">
        <input placeholder="Search..." class="right-search"></input>
        <div class="header-input-date">
          <div class="input-date">
            <div class="inputdate-title">Start date: </div>
            <input type="date"></input>
          </div>
          <div class="input-date">
            <div class="inputdate-title">End date: </div>
            <input type="date"></input>
          </div>
        </div>
      </div>
      <div class="right-body">
        <table class="right-table">
          <tr>
            <td class="table-header table-item">Campaign Name</td>
            <td class="table-header table-item">Status</td>
            <td class="table-header table-item">Used Amount</td>
            <td class="table-header table-item">Usage Rate</td>
            <td class="table-header table-item">Budget</td>
            <td class="table-header table-item">Start date</td>
            <td class="table-header table-item">End date</td>
          </tr>
          <tr>
            <td class="table-item">Campaign Name</td>
            <td class="table-item">Status</td>
            <td class="table-item">10$</td>
            <td class="table-item">0.5%</td>
            <td class="table-item">10000</td>
            <td class="table-item">2024-12-01 10:00</td>
            <td class="table-item">2024-12-01 10:00</td>
          </tr>
          <tr>
            <td class="table-item">Campaign Name</td>
            <td class="table-item">Status</td>
            <td class="table-item">10$</td>
            <td class="table-item">0.5%</td>
            <td class="table-item">10000</td>
            <td class="table-item">2024-12-01 10:00</td>
            <td class="table-item">2024-12-01 10:00</td>
          </tr>
          <tr>
            <td class="table-item">Campaign Name</td>
            <td class="table-item">Status</td>
            <td class="table-item">10$</td>
            <td class="table-item">0.5%</td>
            <td class="table-item">10000</td>
            <td class="table-item">2024-12-01 10:00</td>
            <td class="table-item">2024-12-01 10:00</td>
          </tr>
          <tr>
            <td class="table-item">Campaign Name</td>
            <td class="table-item">Status</td>
            <td class="table-item">10$</td>
            <td class="table-item">0.5%</td>
            <td class="table-item">10000</td>
            <td class="table-item">2024-12-01 10:00</td>
            <td class="table-item">2024-12-01 10:00</td>
          </tr>
          <tr>
            <td class="table-item">Campaign Name</td>
            <td class="table-item">Status</td>
            <td class="table-item">10$</td>
            <td class="table-item">0.5%</td>
            <td class="table-item">10000</td>
            <td class="table-item">2024-12-01 10:00</td>
            <td class="table-item">2024-12-01 10:00</td>
          </tr>
        </table>
        <div class="right-footer">
          <div class="pagination">
            <a href="#">❮</a>
            <a href="#">1</a>
            <a href="#" class="active">
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
}
