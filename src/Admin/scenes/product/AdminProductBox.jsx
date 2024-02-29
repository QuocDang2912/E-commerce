import React, { useEffect, useState } from 'react'
import AdminProductItem from './AdminProductItem'
import Loading from '../../../component/Loading'
import ProductApi from '../../../Api/ProductApi'
import { Link, useParams } from 'react-router-dom'
import Pagination from '../../../component/Pagination'

export default function AdminProductBox() {
    const [product, setProduct] = useState({})
    const [loading, setloading] = useState(true)

    const [totalPage, setTotalPage] = useState(1)

    const [msgSucsess, setmsgSucsess] = useState('')
    const [msgWaring, setmmsgWaring] = useState('')
    const [LoadData, setLoadData] = useState(1)
    const [ViewOption, setViewOption] = useState('preview')

    let { pageNum } = useParams()



    const handleClick = (e) => {
        const deleteProduct = async (id) => {

            let c = window.confirm('delete product ?')
            if (c === true)
                try {
                    e.target.classList.remove('icon-trash')
                    e.target.classList.add('fa-spinner')
                    await ProductApi.delete(id)
                    e.target.classList.add('icon-trash')
                    e.target.classList.remove('fa-spinner')
                    setmsgSucsess('delete Sucsess ' + id)
                    setLoadData(LoadData + 1)
                } catch (error) {
                    setmmsgWaring('delete erro' + id + error)
                }
                finally {
                    window.scroll(0, 0)
                }
        }
        deleteProduct(e.target.getAttribute('name')) // lấy id
    }
    let handleSelect = (e) => {
        setViewOption(e.target.value)

    }

    let params = {
        populate: '*',
        pagination: {
            page: pageNum ? pageNum : 1,
            pageSize: 12
        },
        publicationState: ViewOption
    }
    let myview1 = loading === true ? <Loading /> : product.map((product, i) => (
        <AdminProductItem product={product} handleClick={handleClick} />
    ))

    useEffect(() => {
        const fetchData = async () => {


            let responseProduct = await ProductApi.getAll(params)


            setProduct(responseProduct.data.data)


            setTotalPage(responseProduct.data.meta.pagination.pageCount)

            setloading(false)
        }
        fetchData()
    }, [pageNum, LoadData, ViewOption])


    return (
        <div className="card-body">
            <div className='col-12'>
                <p className='bg-success'>{msgSucsess}</p>
                <p className='bg-warning'>{msgWaring}</p>

            </div>
            <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="dt-buttons btn-group flex-wrap">
                            <Link to="/admin/product/add" className='btn btn-primary'>create Product</Link>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div id="example1_filter" className="dataTables_filter">
                            <select onChange={handleSelect}>
                                <option value="preview">
                                    preview
                                </option>
                                <option value="live">
                                    live
                                </option>
                            </select>
                            <label>Search:<input type="search" className="form-control form-control-sm" placeholder aria-controls="example1" /></label>
                        </div></div></div><div className="row">
                    <div className="col-sm-12"><table id="example1" className="table table-bordered table-striped dataTable dtr-inline" aria-describedby="example1_info">
                        <thead>
                            <tr>

                                <th className="sorting" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-label="Browser: activate to sort column ascending">Product id</th>
                                <th className="sorting sorting_asc" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-label="Rendering engine: activate to sort column descending">Product Name</th>
                                <th className="sorting" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-label="Platform(s): activate to sort column ascending">Price</th>
                                <th className="sorting" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-label="Browser: activate to sort column ascending">Image</th>
                                <th className="sorting" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-label="Engine version: activate to sort column ascending">public</th>
                                <th className="sorting" tabIndex={0} aria-controls="example1" rowSpan={1} colSpan={1} aria-label="CSS grade: activate to sort column ascending">action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* <AdminProductItem /> */}
                            {myview1}
                        </tbody>

                    </table></div>
                    <Pagination totalPage={totalPage} currentPage={pageNum} basePath="http://localhost:3000/admin/product/page/" />
                </div></div>
        </div>

    )
}
