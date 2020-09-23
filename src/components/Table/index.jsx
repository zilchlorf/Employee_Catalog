import React from 'react';
import employees from "../../Employees.json"
// import CardImg from "../CardImage";

// import image from "../images/drunk-face.jpeg"
//Inspired by: https://medium.com/@subalerts/create-dynamic-table-from-json-in-react-js-1a4a7b1146ef
export default function Table(props,{image}) {
  const { data } = props;
  if (!data || !data.length) return <></>;

  console.log(employees);
  return (
    <div>
      <table>
        <thead>
          <tr>{["ID", "Name", "Occupation", "Location","Phone Number","Email Address"].map((title, i) => (<th key={i}>{title}</th>))}</tr>
        </thead>
        <tbody>
          {
            data.map((employee, i) =>
              (
                <tr key={i}>
                  {
                    ["id", "name", "occupation", "location","phoneNumber","email"].map((field, i) => (<td key={i}>{employee[field]} </td>))

                  }
                </tr>
              )
            )
          }
        </tbody>
      </table>
    </div>

  );
}
