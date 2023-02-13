import React, { useEffect } from 'react'

function Alert(props) {
  const { alert, remove,list } = props
  useEffect(() => {
    setTimeout(() => {
      remove();
    }, 3000);
    
  }, [list]);

  return (
    // use backticks!
    <p className={`alert alert-${alert.type}`}>{alert.message}</p>
    
  )
}

export default Alert