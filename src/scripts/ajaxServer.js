import axios from 'axios';

const get = ({ url, params }) => (
    axios.get(url, { params })
)

const add = ({ url, data }) => (
    axios.post(url, { data })
)

export { get, add, }
