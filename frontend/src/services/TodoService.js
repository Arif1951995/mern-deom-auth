async function addTodo(body) {
    const token = localStorage.getItem("token");
    try{
    const response = await fetch('http://localhost:4000/todos', {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(body)
    });
    const  data =  response.json()
    return data;
    }catch(error) {
        throw new Error(error)
    }


}



export {addTodo}