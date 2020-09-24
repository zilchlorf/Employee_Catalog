import React, { useState, useEffect } from 'react';
import Table from './components/Table/index.jsx';
import "./style.css"


function App() {
  const [employees, setEmployees] = useState(require("./Employees.json"));
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [fieldToSortBy, setFieldToSortBy] = useState("id");
  const [fieldToFilterBy, setFieldToFilterBy] = useState("");
  const [valueToFilter, setValueToFilterBy] = useState("");

  useEffect(() => {
    if (!fieldToSortBy) return;
    const sorter = (a, b) => a[fieldToSortBy] < b[fieldToSortBy] ? -1 : 1;
    setEmployees(employees => {
      return employees.sort(sorter);
    });
  }, [fieldToSortBy]);

  useEffect(() => {
    if (!employees) return;
    setFilteredEmployees(() => {
      return employees.filter((employee) => {
        if (!fieldToFilterBy || !valueToFilter) return true;
        switch (typeof employee[fieldToFilterBy]) {
          case "string": {
            const regex = new RegExp(valueToFilter, 'i');
            return regex.test(employee[fieldToFilterBy]);
          }
          case "number": {
            return employee[fieldToFilterBy] === +valueToFilter;
          }
          default:
            return false;
        }
      });
    });
  }, [employees, fieldToFilterBy, valueToFilter, fieldToSortBy]);

  return (
    <div className="App">
      <header className="header">
      <strong id="title">Employee Catalog</strong><br />
      <i>Sort and filter the list of employees by ID, Name, Occupation, Location, Phone Number or Email Address</i>
      
      </header>
      <br/>
      <select className= "sort" onChange={(e) => setFieldToSortBy(e.target.value)}>select field to sort by:
        {
          [
            { field: "", name: "Sort by:" },
            { field: "id", name: "ID" },
            { field: "name", name: "Name" },
            { field: "occupation", name: "Occupation" },
            { field: "location", name: "Location" },
            { field: "phoneNumber", name: "Phone Number" },
            { field: "email", name: "Email Address" }

          ].map(({ field, name }, i) => (<option value={field} key={i}>{name}</option>))
        }
      </select>
     
      <br/>
      
      <select className= "filter" onChange={(e) => setFieldToFilterBy(e.target.value)}>
        {
          [
            { field: "", name: "Filter by:" },
            { field: "id", name: "ID" },
            { field: "name", name: "Name" },
            { field: "occupation", name: "Occupation" },
            { field: "location", name: "Location" },
            { field: "phoneNumber", name: "Phone Number" },
            { field: "email", name: "Email Address" }
          ].map(({ field, name }, i) => (<option value={field} key={i}>{name}</option>))
        }
      </select>
      
      <input type="text" className="input" placeholder="Type to filter employees" onChange={(e) => setValueToFilterBy(e.target.value)}></input>
      <Table data={filteredEmployees} image={employees.image}/>


    </div>

  );
}
export default App;

