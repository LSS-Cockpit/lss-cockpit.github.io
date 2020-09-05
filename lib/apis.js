async function loadApi(getApiType){
  var apiType = (function(){
    switch(getApiType){
      case "missions":
      case "mission":
        return {"name":"aMissions","url":"/einsaetze.json"};
        break;
      case "vehicleTypes":
      case "vehicleType":
      case "vehicletypes":
      case "vehicletype":
        return {"name":"aVehicleTypes","url":"https://lss-cockpit.github.io/api/vehicletypes.json"};
        break;
      case "vehicles":
      case "vehicle":
        return {"name":"aVehicles","url":"/api/vehicles"};
        break;
      case "vehicleStates":
      case "vehicleState":
      case "vehiclestates":
      case "vehiclestate":
        return {"name":"aVehicleStates","url":"/api/vehicle_states"};
        break;
      case "credits":
      case "credit":
        return {"name":"aCredits","url":"/api/credits"};
        break;
      case "buildings":
      case "building":
        return {"name":"aBuildings","url":"/api/buildings"};
        break;
    }
  });

  try {
    if (!window.sessionStorage.hasOwnProperty(apiType().name) ||
        JSON.parse(window.sessionStorage[apiType().name]).lastUpdate < (new Date().getTime() - 5 * 1000 * 60)){
      var response = await fetch(apiType().url);
      var result = await response.json();
      await window.sessionStorage.setItem(apiType().name,JSON.stringify({lastUpdate: new Date().getTime(), value: result}));
    }

    var exportJSON = await JSON.parse(sessionStorage[apiType().name]).value;
  } catch(err) {
    exportJSON = err;
  } finally {
    return exportJSON;
  }
}
