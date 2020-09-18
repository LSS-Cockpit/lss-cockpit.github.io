function getMissionId(){
  var returnMissionId = 0;
  // page /missions/>mission_id<
  if(~window.location.pathname.indexOf("missions")) returnMissionId = +window.location.pathname.replace(/\D+/g,"");

  return returnMissionId;
}

function getMissionTypeId(){
    var missionHelpContainer = document.getElementById("mission_help");
    var returnMissionTypeId = -1;
    
    if(missionHelpContainer && missionHelpContainer.pathname) returnMissionTypeId = +missionHelpContainer.pathname.replace(/\D+/g,"");

    return returnMissionTypeId;
}
