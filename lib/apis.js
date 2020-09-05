async function loadMissions(){
  if (!window.sessionStorage.hasOwnProperty('aMissions') ||
      JSON.parse(window.sessionStorage.aMissions).lastUpdate < (new Date().getTime() - 5 * 1000 * 60)){

    try {
      var response = await fetch('/einsaetze.json');
      var result = await response.json();
      window.sessionStorage.setItem('aMissions',JSON.stringify({lastUpdate: new Date().getTime(), value: result}));
    } catch(err) {
      result = err;
    } finally {
      return result;
    }
  }
}


async function loadVehicleTypes(){
  if (!window.sessionStorage.hasOwnProperty('aVehicleTypes') ||
      JSON.parse(window.sessionStorage.aVehicleTypes).lastUpdate < (new Date().getTime() - 5 * 1000 * 60)){

    try {
      var response = await fetch('https://lss-cockpit.github.io/api/vehicletypes.json');
      var result = await response.json();
      window.sessionStorage.setItem('aVehicleTypes',JSON.stringify({lastUpdate: new Date().getTime(), value: result}));
    } catch(err) {
      result = err;
    } finally {
      return result;
    }
  }
}
