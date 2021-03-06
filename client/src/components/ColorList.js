import React, { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

import {axiosWithAuth} from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, history }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    if (editing) {
      axiosWithAuth()
        .put(`/colors/${colorToEdit.id}`, colorToEdit)
        .then(res => {
          console.log(res);
          updateColors(colors.map(c=>{
            if (c.id!==colorToEdit.id) {
              return c;
            } else {
              return colorToEdit;
            }
          }));
          setEditing(false);
          setColorToEdit(initialColor);
        })
        .catch(err => {
          console.log("Err is: ", err);
      });
    } else {
      axiosWithAuth()
        .post('/colors', colorToEdit)
        .then(res => {
          console.log(res);
          updateColors(res.data);
        })
        .catch(err => {
          console.log("Error is: ",err);
        })
    }
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    if (window.confirm("Are you sure?")) {
      axiosWithAuth()
        .delete(`/colors/${color.id}`)
        .then(res => {
          console.log(res);
          updateColors(colors.filter(c=>c.id!==color.id));
        })
        .catch(err => {
          console.log("Err is: ", err);
      });
    } else {
      console.log("You pressed Cancel");
    }
  };

  return (
    <div className="colors-wrap">
      <div className="myLinks" id="myLinks">
        <Link to="/logout">Logout</Link>
      </div>
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
        <form onSubmit={saveEdit}>
          {editing?<legend>edit color</legend>:<legend>add color</legend>}
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
    </div>
  );
};

export default ColorList;
