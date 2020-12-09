(()=>{
    document.getElementById("home").addEventListener("click", ()=>window.location = "index.html");
    document.getElementById("graph").addEventListener("click", ()=>window.location = "graphical-data.html");
})();

var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
  function doCORSRequest(options, apiResults) {
    var x = new XMLHttpRequest();
      x.responseType = "json";
    x.open(options.method, cors_api_url + options.url);
    x.onload = x.onerror = function() {
        var info = options.method + ' ' + options.url + '\n' + x.status + ' ' + x.statusText;
      
        //sending api result object
        apiResults(info, x);
    };
    
      //makes call
    x.send(options.data);
  }

  // Bind event
(function() {
    var summaryApiUrl = "https://api.covid19api.com/summary";
    
    
    //displays current summary
    var DisplayCurrentStatus = (summary)=>{
          summary.forEach((country)=>{
              var html = `<tr><td>${country["Country"]}</td><td>${country["TotalConfirmed"]}</td><td>${country["TotalRecovered"]}</td><td>${country["TotalDeaths"]}</td><td>${country["NewConfirmed"]}</td><td>${country["NewDeaths"]}</td><td>${country["NewRecovered"]}</td></tr>`;
              
              document.getElementById("tb-data-sect").insertAdjacentHTML("beforeend", html);
          });
    }
      
      
       
    doCORSRequest({
        method: 'GET',
        url: summaryApiUrl,
      }, function apiResults(info, xhttp) {
        var data = xhttp.response;
        
        //printing api status info
        console.log(info);
        
        //prints data to console
        //console.log(data);
        
        //displays country wise summary on webpage
        if(data["Countries"] == undefined){
            alert("Please, reload page.");
        }else{
            DisplayCurrentStatus(data["Countries"]);
            document.getElementById('loader').style.display = 'none';
        }
        
        
      });
        
  })();