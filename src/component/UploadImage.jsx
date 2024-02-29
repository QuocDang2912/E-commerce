import axios from 'axios'
import React, { useState } from 'react'

export default function UploadImage({ addImage }) {
    const [file, setFile] = useState(null)
    const handleChange = (e) => {
        setFile(e.target.files[0])
        console.log('file ', e.target.files)
    }
    const handleUpload = async (e) => {
        console.log('file', file)
        const data = new FormData();
        data.append('files', file)
        e.target.innerText = 'Loading...'
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:1337/api/upload',
            data
        })
        e.target.innerText = 'upload'
        let id = response.data[0].id
        let url = response.data[0].url
        addImage(id, url)
        console.log(response)
    }
    return (
        <div className='fileUpload'>
            <input type='file' onChange={handleChange} />
            <button onClick={handleUpload}>upload</button>

        </div>
    )
}
