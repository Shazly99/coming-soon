import axios from "axios";

 const ContantServices = async (values, body) => {
    const url = `${process.env.REACT_APP_API_URL}/home/send-contact-us`;
    let data = await axios.post(url, body, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-Requested-With': 'application/json',
            'Accept-Language': values,
        }
    }).catch((err) => {
    })
    return data
};

const JopsServices = async (values, body) => {
    const url = `${process.env.REACT_APP_API_URL}/home/send-job-request`;
    let data = await axios.post(url, body, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-Requested-With': 'application/json',
            'Accept-Language': values,
        }
    }).catch((err) => {
    })
    return data
};


export { JopsServices, ContantServices }