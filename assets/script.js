let keyword = prompt("Enter your desired agency")

keyword.toLowerCase()

// const require(request)

fetch(`https://developer.usajobs.gov/tutorials/search-jobs?q=${keyword}`)

.then((Response) => {
    if (!ok) {
        throw new Error(`HTTP error! Status: ${Response.status}`);
    }
    return Response.json()
})

// .then((data) => {


// })