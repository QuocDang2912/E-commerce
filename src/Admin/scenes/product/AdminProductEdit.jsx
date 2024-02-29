
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import CategorySelect from '../../../component/CategorySelect'
import ProductApi from '../../../Api/ProductApi'
import { validateProduct } from '../../../helpers/Validate'
import 'react-toastify/dist/ReactToastify.css';
import UploadImage from '../../../component/UploadImage'
import { AppUrl } from '../../../Api/AppUrl'
import { useParams } from 'react-router-dom'
export default function AdminProductEdit() {
    const { id } = useParams()

    const [data, setData] = useState({
        "productName": "",
        "description": "",
        "price": "",
        "category": "",

        "image": ["1", "2"]
    })
    const [image, setImage] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            let params = {
                populate: '*'
            }
            let response = await ProductApi.get(id, params)
            let productData = response.data.data
            console.log(response)
            setData({
                "productName": productData.attributes.productName,
                "description": productData.attributes.description,
                "price": productData.attributes.price,
                "category": productData.attributes.category.data.id,

                "image": productData.attributes.image.data.map((img) => {
                    return img.id
                })
            })
            let ImageDate = productData.attributes.image.data.map((img) => {
                return ({
                    id: img.id,
                    url: img.attributes.url
                })
            })
            setImage([
                ...ImageDate
            ])
        }
        fetchData()

    }, [id])

    console.log(image)

    const addImage = (id, url) => {
        setData({
            ...data,
            'image': [
                ...data.image, id
            ]
        })
        setImage([
            ...image,
            {
                id: id,
                url: url
            }
        ])
    }

    const handleRemove = (e) => {
        let id = e.target.name;

        setData({
            ...data,
            'image': data.image.filter((img) => {
                return img != id
            })
        })
        setImage(image.filter((img) => {
            return img.id != id
        }))
    }




    let myViewImg = image.length === 0 ? 'no image' : image.map((img) => {
        return (
            <div>
                <img src={AppUrl.ImageUrl + img.url} alt='hinh' name={img.id} style={{ width: '100px', height: "100px" }} />
                <button className='btn' name={img.id} onClick={handleRemove} >Remove</button>
            </div>
        )
    })


    const handleSubmit = (e) => {

        e.preventDefault();
        var err = (validateProduct(data))
        if (err === '') {
            const uploadProduct = async (id, data) => {
                let sendata = {
                    "data": data
                }
                try {
                    const response = await ProductApi.update(id, sendata);
                    console.log(response)
                    if (response.status === 200) toast.success('thanh cong');

                    document.getElementById('editProduct').reset();
                    setData({})
                }
                catch (error) {
                    toast.error('bi loi' + error)

                }
            }
            uploadProduct(id, data);
        }
        else {
            toast.error(err);
            return false;
        }
    }
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        console.log(data)
    }
    return (
        <>
            <div className='row'>
                <h2>edit product</h2>
            </div>
            <div className='row'>
                <div className="col-7">
                    <form id='editProduct' onSubmit={handleSubmit}>

                        <div className="form-group row">
                            <label htmlFor="productName" className="col-4 col-form-label">productName</label>
                            <div className="col-8">
                                <input id="productName" name="productName" placeholder="productName" type="text" className="form-control" required="required" onChange={handleChange} value={data.productName} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="description" className="col-4 col-form-label">description</label>
                            <div className="col-8">
                                <textarea id="description" name="description" cols={40} rows={5} className="form-control" defaultValue={""} onChange={handleChange} value={data.description} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="price" className="col-4 col-form-label">price</label>
                            <div className="col-8">
                                <input id="price" name="price" type="text" className="form-control" required="required" onChange={handleChange} value={data.price} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="select" className="col-4 col-form-label">category</label>
                            <div className="col-8">
                                <CategorySelect handleChange={handleChange} defaultValue={data.category} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="offset-4 col-8">
                                <button name="submit" type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-5">
                    <UploadImage addImage={addImage} />
                    <div id='uploadImage'>
                        {myViewImg}
                    </div>
                </div>





                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                {/* Same as */}
                <ToastContainer />
            </div >
        </>
    )
}
