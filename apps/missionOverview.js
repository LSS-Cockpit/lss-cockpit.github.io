console.log("Hier kommt die MissionOverview hin!");
var aMissions = await loadMissions();
var aVehicleTypes = await loadVehicleTypes();
var missionId = window.location.pathname.replace(/\D+/g,"");
var missionTypeId = document.getElementById("mission_help").pathname ? document.getElementById("mission_help").pathname.replace(/\D+/g,"") : "VGE";
var missionPatients = document.getElementsByClassName("mission_patient").length;
console.log(missionPatients);
var insertAlert = document.createElement("div");
insertAlert.classList = "alert alert-danger";

if(isNaN(missionTypeId)) {
  insertAlert.innerHMTL = `<button class="close" data-dismiss="alert" type="button">×</button>Bei diesem Einsatz handelt es sich um einen selbst erstellten Verbandgroßeinsatz.`;
} else {
  var mission = aMissions.filter((obj) => obj.id == missionTypeId)[0];
  if(mission.average_credits === null) mission.average_credits = 0;
  var alertText = "Einsatznummer: " + missionId + ", Einsatztyp: " + missionTypeId + "<br><span class='badge badge-light'>Ø " + mission.average_credits.toLocaleString() + " Credits</span>";
  if(mission.additional.possible_patient_min || mission.additional.possible_patient) {
    var textPatients = missionPatients > 0 ? (missionPatients + " Patienten") : (mission.additional.possible_patient_min + " bis " + mission.additional.possible_patient + " Patienten");
    alertText += " <span class='badge badge-light'>" + textPatients + "</span> <span class='badge badge-light'>" + mission.additional.patient_specializations + "</span><br>";
    if(mission.chances.patient_transport === undefined) mission.chances.patient_transport = 30;
    alertText += "Transport: " + mission.chances.patient_transport + "%";
    if(mission.chances.patient_other_treatment !== undefined) {
      alertText += ", Tragehilfe: " + mission.chances.patient_other_treatment + "%";
    }
    if(mission.chances.nef !== undefined) {
      alertText += ", NEF: " + mission.chances.nef + "%";
    }
    if(mission.chances.helicopter !== undefined) {
      alertText += ", RTH: " + mission.chances.helicopter + "%";
    }
  }
  alertText += "<br><br>";
  if(mission.average_credits === 0) {
    alertText += "<small>Dies ist ein reiner Rettungsdienst-Einsatz. Hier verdient man nur an Behandlung/ Transport des Patienten.</small>"
  }
  console.log("Mission: ", mission);
  console.log("Chances: ", mission.chances);
  for(var key in mission.requirements) {
    var classAlias = aVehicleTypes.filter((obj) => obj.class[0] == key)[0].class_alias[0];
    alertText += "<span class='badge badge-light'>" + mission.requirements[key] + "</span> " + classAlias + (mission.chances[key] ? " (" + mission.chances[key] + "%)<br>" : "<br>");
  }
  insertAlert.innerHTML = "<button class='close' data-dismiss='alert' type='button'>×</button>" + alertText;
}

//document.getElementById("mission_general_info").insertAfter(insertAlert);
$("#mission_general_info").parent().after(insertAlert);
