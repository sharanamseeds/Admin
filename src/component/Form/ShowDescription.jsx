import React from 'react'

function ShowDescription({ description }) {
    return (description ? <div dangerouslySetInnerHTML={{ __html: description }} /> : "")
}

export default ShowDescription
