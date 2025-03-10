import React from 'react'

export default function BlobAnimation({ type,sizes }) {

    return (<>
        <div className={`${type} relative z-0 ${sizes}  `}></div >
    </>
    )
}
