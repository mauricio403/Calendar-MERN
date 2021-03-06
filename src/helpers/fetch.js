// const baseURl = process.env.REACT_APP_API_URL;


const fetchSinToken = (endpoint, data, method = 'GET') => {

    const url = `https://mern-calendar-backend-mau.herokuapp.com/api/${endpoint}`;

    if (method === 'GET') {
        return fetch(url)
    } else {
        return fetch(url, {
            method: method,
            headers:{
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify(data)
        });
    }
}


const fetchConToken = (endpoint, data, method = 'GET') => {

    const url = `https://mern-calendar-backend-mau.herokuapp.com/api/${endpoint}`;
    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {
        return fetch(url, {
            method: method,
            headers: {
                'x-token': token
            }
        })
    } else {
        return fetch(url, {
            method: method,
            headers:{
                'Content-Type': 'application/json',
                'x-token': token
                
            },
            body: JSON.stringify(data)
        });
    }
}

export {
    fetchSinToken,
    fetchConToken
}