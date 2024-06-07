let keyword = prompt("Enter your desired agency")
const formSearch = document.querySelector('label')

const APIKey = "f+m7/YyogybRKvTgVDkyYCL5ScgVxx8KL49/DEOPiJE="

keyword.toLowerCase

function getApi() {
    const requestUrl = `https://developer.usajobs.gov/codelist/agencysubelements/Search?Keyword=${keyword}`;
  
    fetch(requestUrl, {
        method: "GET",
        headers: {                  
            "Authorization-Key": APIKey      
        }}
    )
      .then(function (response) {
        if (!response.ok) {
            console.log("Error")
            throw new Error(`HTTP error! Status: ${Response.status}`);
        }
        console.log("Response Okay")
        return response.json();

      })

      .then((data) => {
        console.log(data);
        return data
    
      });
  }

  formSearch.addEventListener('click', getApi)



//   blocker, no error messages are being logged even though dev tools icon show errors