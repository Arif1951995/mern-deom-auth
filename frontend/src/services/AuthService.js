async function login(body) {
    console.log(body);
    try{
    const response = await fetch('http://localhost:4000/login', {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json' },
          body: JSON.stringify(body)
    });
    const  data =  await response.json();
    console.log({data})
    return data;
    }catch(error) {
        throw new Error(error)
    }


}



export default {login}