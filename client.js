function connect(endpoint, token) {

    return function(query) {
        return fetch(endpoint, {
        method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + token,
           },
           body: JSON.stringify(query),
       }).then(res => res.json()).then(res => res.data)

    }
}

module.exports = {
  Connect: connect
}
