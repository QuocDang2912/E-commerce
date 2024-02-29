import React from 'react'

export default function SelectBox({ name, data, defaultValue, handleChange, }) {





    let myView = data.map((dataItem) => {

        return <option value={dataItem.value}>{dataItem.label}</option>


    })


    return (
        <div>
            <select name={name} value={defaultValue} onChange={handleChange}>
                {myView}
            </select>
        </div>
    )
}
