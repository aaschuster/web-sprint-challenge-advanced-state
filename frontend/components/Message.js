import React from 'react'
import { connect } from "react-redux"

function Message( {message} ) {
  return <div id="message">{message}</div>
}

const mapProps = state => {
  return {
    message: state.infoMessage
  }
}

export default connect(mapProps)(Message);
