import React from 'react'

const Toast = ({ alert }) => {
  return (
    alert && <div className={`toast custom-toast position-fixed animate__animated animate__fadeInRightBig ${alert.style}`} style={{zIndex:'9999'}} role="alert" aria-live="assertive" aria-atomic="true">
      <div className="toast-header">
        <strong className="me-auto">{alert.headMsg}</strong>
        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
      </div>
      <div className="toast-body">
        {alert.msg}
      </div>
    </div>
  )
}

export default Toast
