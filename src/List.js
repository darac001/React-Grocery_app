import React from 'react'
import { RiDeleteBack2Line } from "react-icons/ri";
function List(props) {
  const{items,removeItem}=props
  return (
    <div>      
      {
        items.map((item,index) => {
          const { id, title } = item
          return (
            <article key={id} className="grocery-item">
              <p className="item">
                <span>{index + 1}. </span>{title}
              </p>
              <button className="delete-btn" onClick={() => removeItem(id)}>
                <RiDeleteBack2Line />
              </button>
              <div key={id} className="line"></div>
            </article>
          );
      })}
  </div>
    )
}

export default List