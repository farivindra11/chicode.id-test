import React from "react";

export default function Tables(headCells) {

  console.log(headCells, "head");

  const TblContainer = (props) => {
    console.log(props);
    <div className="table-responsive">
      <table className="table table-striped table-sm">
        {props.children}
      </table>
    </div>
  }

  const TblHead = (props) => {
    <thead>
      <tr>
        {headCells?.map((key, i) => (
          <th key={i}>{key}</th>
        ))}
      </tr>
    </thead>;
  };

  return {
    TblContainer,
    TblHead,
  };
}
