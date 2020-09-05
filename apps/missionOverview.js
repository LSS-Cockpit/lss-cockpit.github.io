var aMissions = await loadApi("missions");
var aVehicleTypes = await loadApi("vehicleTypes");
var missionId = window.location.pathname.replace(/\D+/g,"");
var missionTypeId = document.getElementById("mission_help").pathname ? document.getElementById("mission_help").pathname.replace(/\D+/g,"") : "VGE";
var missionPatients = document.getElementsByClassName("mission_patient").length;
var insertAlert = document.createElement("div");
insertAlert.classList = "alert alert-danger";

if(isNaN(missionTypeId)) {
    insertAlert.innerHMTL = "<button class='close' data-dismiss='alert' type='button'>×</button>Bei diesem Einsatz handelt es sich um einen selbst erstellten Verbandgroßeinsatz.";
} else {
    var mission = aMissions.filter((obj) => obj.id == missionTypeId)[0];
    if(mission.average_credits === null) mission.average_credits = 0;
    var alertText = "Einsatznummer: " + missionId + ", Einsatztyp: " + missionTypeId + "<br>";
    if(mission.place !== null) {
        alertText += "<span class='badge badge-light'>" + mission.place + "</span> <span class='badge badge-light'>Ø "+ mission.average_credits.toLocaleString() + " Credits</span>";
    } else {
        alertText += " <span class='badge badge-light'>Ø " + mission.average_credits.toLocaleString() + " Credits</span>";
    }
    if(mission.additional.max_possible_prisoners) {
        alertText += " <span class='badge badge-light'> max. " + mission.additional.max_possible_prisoners + " Gefangene</span>";
    }
    if(mission.additional.average_min_fire_personnel) {
        alertText += " <span class='badge badge-light'>min. " + mission.additional.average_min_fire_personnel + " Feuerwehrleute</span>";
    }
    if(mission.additional.average_min_police_personnel) {
        alertText += " <span class='badge badge-light'>min. " + mission.additional.average_min_police_personnel + " Polizisten</span>";
    }
    if(mission.additional.possible_patient_min || mission.additional.possible_patient) {
        if(mission.additional.possible_patient_min === undefined) mission.additional.possible_patient_min = 0;
        var textPatients = missionPatients > 0 ? (missionPatients + " Patienten") : (mission.additional.possible_patient_min + " bis " + mission.additional.possible_patient + " Patienten");
        if(missionPatients == 0 && mission.additional.possible_patient_min == mission.additional.possible_patient) {
            textPatients = mission.additional.possible_patient_min + " Patienten";
        }
        alertText += " <span class='badge badge-light'>" + textPatients + "</span> <span class='badge badge-light'>" + mission.additional.patient_specializations + "</span><br><br>";
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
    for(var key in mission.requirements) {
        if(key !== "water_needed") {
            var classAlias = aVehicleTypes.filter((obj) => obj.class[0] == key)[0].class_alias[0];
            alertText += mission.requirements[key] + "x " + classAlias + (mission.chances[key] ? " (" + mission.chances[key] + "%)<br>" : "<br>");
        } else {
            alertText += mission.requirements[key].toLocaleString() + " Liter Wasser<br>";
        }
    }
    var idx;
    if(mission.additional.expansion_missions_ids) {
        alertText += "<br>mögliche Ausbreitungen:<br>";
        for(idx in mission.additional.expansion_missions_ids) {
            var e = mission.additional.expansion_missions_ids[idx];
            alertText += "<span class='badge badge-light'>" + aMissions.filter((obj) => obj.id == e)[0].name + "</span> ";
        }
    }
    if(mission.additional.followup_missions_ids) {
        alertText += "<br>mögliche Folgeeinsätze:<br>";
        for(idx in mission.additional.followup_missions_ids) {
            var f = mission.additional.followup_missions_ids[idx];
            alertText += "<span class='badge badge-light'>" + aMissions.filter((obj) => obj.id == f)[0].name + "</span> ";
        }
    }
    insertAlert.innerHTML = "<button class='close' data-dismiss='alert' type='button'>×</button>" + alertText;
}

//document.getElementById("mission_general_info").insertAfter(insertAlert);
$("#mission_general_info").parent().after(insertAlert);
