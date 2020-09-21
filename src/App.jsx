import React, { useState, useEffect } from 'react';
import Table from './components/Table/Table.jsx';
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
      <strong>Employee List</strong><br />
      <i>What's Happening?  Go ahead, sort and filter the list of employees why don'tcha?</i>
      
      </header>
      <br/>
      <select className= "sort" onChange={(e) => setFieldToSortBy(e.target.value)}>select field to sort by:
        {
          [
            { field: "", name: "Sort by:" },
            { field: "id", name: "ID" },
            { field: "name", name: "Name" },
            { field: "occupation", name: "Occupation" },
            { field: "location", name: "Location" }
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
            { field: "location", name: "Location" }
          ].map(({ field, name }, i) => (<option value={field} key={i}>{name}</option>))
        }
      </select>
      
      <input type="text" className="input" placeholder="Type to filter employees" onChange={(e) => setValueToFilterBy(e.target.value)}></input>
      <Table data={filteredEmployees} />


    </div>

  );
}
export default App;

