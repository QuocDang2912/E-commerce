import axiosInstance from "./axiosInstan"

export const UserApi = {
    register(data) {
        var url = '/auth/local/register'
        return axiosInstance.post(url, data)
    },
    login(data) {
        var url = '/auth/local'
        return axiosInstance.post(url, data)
    },
    me(params) {
        var url = '/users/me'
        return axiosInstance.get(url, { params })
    }
}