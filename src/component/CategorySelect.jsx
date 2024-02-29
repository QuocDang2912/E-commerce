import React, { useState } from 'react'
import { useEffect } from 'react'
import categoryApi from '../Api/CategoryApi'
import SelectBox from './SelectBox'

export default function CategorySelect({ handleChange, defaultValue }) {
    const [categories, setcategories] = useState([])
    const [loading, setLoading] = useState(true)
    let myView = loading === true ? <select> <option>Loading category</option> </select> : <SelectBox name='category' defaultValue={defaultValue} data={categories} handleChange={handleChange} />

    useEffect(() => {

        const fetCh = async () => {
            var response = await categoryApi.getAll();
            let temp = response.data.data

            let tempDn = temp.map((category) => {
                return {
                    label: category.attributes.categoryName,
                    value: category.id
                }
            })
            setcategories(tempDn)
            setLoading(false)
        }
        fetCh()

    }, [])



    return (
        <>
            {
                myView
            }
        </>

    )
}
