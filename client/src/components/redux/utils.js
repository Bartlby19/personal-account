export const  sendRequest = async (data, url, method) => {
    let obj = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    if (data) {
        obj.body =JSON.stringify(data)
    }
    let response = await fetch(url, obj);
    return await response.json();
};