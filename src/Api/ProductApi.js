import axiosInstance from "./axiosInstan"


const ProductApi = {
    getAll(params) {
        var url = '/products'
        return axiosInstance.get(url, { params })
    },
    get(id, params) {
        var url = `/products/${id}`
        return axiosInstance.get(url, { params })
    },
    add(data) {
        var url = `/products`
        return axiosInstance.post(url, data)
    },
    update(id, data) {
        var url = `/products/${id}`
        return axiosInstance.put(url, data)
    },
    delete(id) {
        var url = `/products/${id}`
        return axiosInstance.delete(url)
    }
}
export default ProductApi