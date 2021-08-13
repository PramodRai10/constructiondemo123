var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://maps.googleapis.com/maps/api/staticmap?size=400x400&path=25.865488427076095,85.77660944807127|25.861086107870612,85.76656725751951|25.84532909573141,85.77111628400877|25.84648777108281,85.80905344831541|25.867805371317537,85.79574969160154|25.86293973594337,85.78098681318357&sensor=false&key=AIzaSyAr-egHDNLaGQvkcv8GeEhxHOLT0w6YcYE',
  headers: { }
};

axios(config)
.then(function (response) {
       console.log(JSON.stringify(response.data));

})
.catch(function (error) {
  console.log(error);
});
