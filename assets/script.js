const APIKey = "f+m7/YyogybRKvTgVDkyYCL5ScgVxx8KL49/DEOPiJE="
const selects = document.getElementById("selects");
const searchInput = document.getElementById('search-input');
// const fetchButton = document.getElementB('button')

const agencyUrl = 'https://data.usajobs.gov/api/codelist/agencysubelements';
const agencyList = [];
let agencyAttributes = {code: [], agency: []}

const fetchAgency = agencyUrl => {
fetch(agencyUrl, {
        method: "GET",
        headers: {                  
            "Authorization-Key": APIKey      
        }}
    )
    
      .then(function (response) {
        return response.json();
      })

      .then(function (data) {
        console.log(data);
        agencyList.push(data)
        return(agencyList)
      }

      .then(function (agencies) {
        agencies.array.forEach(agency => {agencyList.push(agency)
          renderAgencyList(agencyList)
        });
      })
      
   );
     }
