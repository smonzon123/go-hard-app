function getData(){
    var endpoint = 'https://data.lacity.org/resource/x4zi-qhep.json'
    var inputEl = document.getElementById('search')
    var searchTerm = inputEl.value
    
    fetch(endpoint)
    .then(function(data){
        return data.json()
    }) // turn data into JSOn
    .then(function(json){
        var finalHTML = ''
        var searchJson
        
        if (searchTerm === ""){
           searchJson = json.filter(function(item) {
              return item.type_of_event !== "Neighborhood Council" && item.type_of_event !== "Meeting - Board" && item.type_of_event !== "Meeting - Council"
           })          
        } else {
          searchJson = json.filter(function(item){
            return item.location_address_zip === searchTerm
          })          
        }
        
        if (searchJson.length === 0){
          finalHTML = '<h2>No results found. Search again.</h2>'
        }
        
        searchJson.forEach(function(item){
            var cardItem = `

                    <div class="col s6 m4">
                      <div class="card">
                        <div class="card-image">
                          <img src="https://upload.wikimedia.org/wikipedia/en/4/48/Los_Angeles_City_Hall_BlackWhite.jpg">
                          <span class="card-title">${item.type_of_event}</span>
                        </div>
                        <div class="card-content">
                          <h5>${item.event_name}</h5>
                          <p class="card-description-thang">
                             ${item.event_description}
                          </p>
                        </div>
                        <div class="card-action">
                          <a targe="_blank" href="${item.information_website}"> More Info </a>
                        </div>
                      </div>
                    </div>
            `
            finalHTML += cardItem
        })
        console.log(searchJson)
        var resultDiv = document.getElementById('result')
        resultDiv.innerHTML = finalHTML
    }) // do something with data
    .catch(function(error){
        console.log(error)
    }) // catch any errors
}