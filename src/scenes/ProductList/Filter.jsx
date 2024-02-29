import React from 'react'

export default function Filter({ handleFilterName, handleFilterByMaxPrice }) {
    return (
        <div className='well well-small'>
            <input type='text' placeholder='Filter name' onChange={handleFilterName} />
            <p>Price Max</p>
            <input type='text' placeholder='Filter max Price' onChange={handleFilterByMaxPrice} />
        </div>
    )
}
