import React, { useEffect, useState } from 'react'
import CategoryMenu from './CategoryMenu'
import ProductBox from '../../component/ProductBox'
import Loading from '../../component/Loading'
import categoryApi from '../../Api/CategoryApi'
import ProductApi from '../../Api/ProductApi'
import { useParams } from 'react-router-dom'
import Pagination from '../../component/Pagination'
import Filter from './Filter'

export default function ProductList() {
    const { pageNum } = useParams()

    const [category, setCategory] = useState({})
    const [product, setProduct] = useState({})
    const [loading, setloading] = useState(true)
    // tổng số page
    const [totalPage, setTotalPage] = useState(1)

    //  Filter 
    const [FilterKey, setFilterKey] = useState(null)
    const [FilterMaxPrice, setFilterMaxPrice] = useState(null)
    const [FilterCategory, setFilterCategory] = useState(null)

    const handleFilterName = (e) => {

        setFilterKey(e.target.value)
    }
    const handleFilterByMaxPrice = (e) => {

        setFilterMaxPrice(e.target.value)
    }
    const handleFilterByCategory = (e) => {

        if (e.target.innerText === 'All Category') setFilterCategory(null)
        else {
            setFilterCategory(e.target.innerText)
        }

    }

    var params = {
        //  định dàng này của beckend
        // populate: '*',
        // 'pagination[page]': pageNum ? pageNum : 1,
        // 'pagination[pageSize]': 12,
        // 'filters[productName][$contains]': FilterKey ? FilterKey : null,
        // 'filters[price][$lt]': FilterMaxPrice ? FilterMaxPrice : 100000,

        // hoặc có thể viết theo kiểu đối tượng obj
        populate: '*',
        pagination: {
            page: pageNum ? pageNum : 1,
            pageSize: 12
        },
        filters: {
            productName: {
                $contains: FilterKey ? FilterKey : null
            },
            price: {
                $lt: FilterMaxPrice ? FilterMaxPrice : null,
            },
            category: {
                categoryName: {
                    $eq: FilterCategory ? FilterCategory : null
                }
            }
        }

    }
    let myview1 = loading === true ? <Loading /> : <CategoryMenu category={category} handleFilterByCategory={handleFilterByCategory} />
    let myview2 = loading === true ? <Loading /> : <ProductBox product={product} />




    useEffect(() => {
        const fetchData = async () => {
            let responseCategory = await categoryApi.getAll()
            console.log("🚀 ~ file: ProductList.jsx:24 ~ fetchData ~ responseCategory:", responseCategory)
            setCategory(responseCategory.data.data)

            let responseProduct = await ProductApi.getAll(params)
            console.log("🚀 ~ file: ProductList.jsx:28 ~ fetchData ~ responseProduct:", responseProduct)

            setProduct(responseProduct.data.data)


            setTotalPage(responseProduct.data.meta.pagination.pageCount)

            setloading(false)
        }
        fetchData()
    }, [pageNum, FilterKey, FilterMaxPrice, FilterCategory])



    return (
        <div className="row">

            <div id="sidebar" className="span3">
                {myview1}
            </div>
            <div className="span9">
                <Filter handleFilterName={handleFilterName} handleFilterByMaxPrice={handleFilterByMaxPrice} />
                {myview2}
                <Pagination totalPage={totalPage} currentPage={pageNum} basePath="http://localhost:3000/product/page/" />
            </div>

        </div>

    )
}
