(async function() {

    loadCss("https://quizzical-curran-b45735.netlify.app/css/common.css");
    var aMissions = await loadApi("missions");
    var aVehicleTypes = await loadApi("vehicleTypes");
    var missionId = getMissionId();
    var missionTypeId = getMissionTypeId();
    var missionPatients = document.getElementsByClassName("mission_patient").length;
    var missionInfos = {};

    function createAlert(missionData) {
        var $mData = missionData;
        var spanBadge = "<span class='badge badge-light'>%placeholder%</span> ";
        var insertAlert = document.createElement("div");
        insertAlert.classList = "alert alert-danger";
        insertAlert.id = "alrtMissionOverview";
        if(missionTypeId === -1) missionTypeId = "VGE";
        var alertText = "";

        if($mData.vge) {
            alertText += $mData.text;
        } else {
            if($mData.guardMission) alertText += spanBadge.replace("%placeholder%", "Sicherheitswache");
            if($mData.poi) alertText += spanBadge.replace("%placeholder%", $mData.poi);
            alertText += spanBadge.replace("%placeholder%", ((!$mData.guardMission && $mData.requirements.length > 0) ? "Ø " : "") + $mData.credits.toLocaleString() + " Credits");
            if(missionPatients > 0) alertText += spanBadge.replace("%placeholder%", missionPatients + (missionPatients == 1 ? " Patient" : " Patienten"));
            if($mData.minPat || $mData.maxPat) {
                if($mData.minPat == $mData.maxPat) alertText += spanBadge.replace("%placeholder%", $mData.minPat + ($mData.minPat == 1 ? " Patient" : " Patienten"));
                else alertText += spanBadge.replace("%placeholder%", $mData.minPat + " bis " + $mData.maxPat + " Patienten");
            }
            if($mData.hospital) alertText += spanBadge.replace("%placeholder%", $mData.hospital);
            if($mData.prisoners) alertText += spanBadge.replace("%placeholder%", "max. " + $mData.prisoners + ($mData.prisoners == 1 ? " Gefangener" : " Gefangene"));
            if($mData.firemen) alertText += spanBadge.replace("%placeholder%", "min. " + $mData.firemen + " Feuerwehrleute");
            if($mData.policemen) alertText += spanBadge.replace("%placeholder%", "min. " + $mData.policemen + " Polizisten");
            alertText += "<span class='lsscHide'><br><br>";
            if(missionPatients > 0 || $mData.minPat || $mData.maxPat) {
                if($mData.chanceTrsp) alertText += "Transport: " + $mData.chanceTrsp + "%";
                if($mData.chanceCarry) alertText += ", Tragehilfe: " + $mData.chanceCarry + "%";
                if($mData.chanceNef) alertText += ", NEF: " + $mData.chanceNef + "%";
                if($mData.chanceRth) alertText += ", RTH: " + $mData.chanceRth + "%";
                alertText += "<br><br>";
            }
            var i;
            if($mData.requirements.length > 0) {
                for(i in $mData.requirements) {
                    var e = $mData.requirements[i];
                    alertText += e.key.toLocaleString() + " " + e.item + ($mData.chances[e.item] ? (" (" + $mData.chances[e.item] + "%)<br>") : "<br>");
                }
            } else {
                alertText += "<small>Dies ist ein reiner Rettungsdienst-Einsatz. Hier bekommt man nur für die Behandlung oder den Transport Credits.</small><br>";
            }
            if($mData.expansions.length > 0) {
                alertText += "<br>mögliche Ausbreitungen:<br>";
                for(i in $mData.expansions) {
                    alertText += spanBadge.replace("%placeholder%", $mData.expansions[i]);
                }
            }
            if($mData.followup.length > 0) {
                alertText += "<br>Mögliche Folgeeinsätze:<br>";
                for(i in $mData.followup) {
                    alertText += spanBadge.replace("%placeholder%", $mData.followup[i]);
                }
            }
            alertText += "<br><small>Einsatznummer: " + missionTypeId + "-" + missionId + "</small></span>";
        }

        insertAlert.innerHTML = "<button class='close' data-dismiss='alert' type='button'>×</button>" + alertText;
        //document.getElementById("mission_general_info").insertAfter(insertAlert);
        $("#mission_general_info").parent().after(insertAlert);
    }

    if(missionTypeId >= 0) {
        var mission = aMissions.filter((obj) => obj.id == missionTypeId)[0];
        if(mission.average_credits === null) mission.average_credits = 0;
        missionInfos.name = mission.name;
        missionInfos.credits = mission.average_credits;
        missionInfos.chances = {};
        missionInfos.requirements = [];
        missionInfos.expansions = [];
        missionInfos.followup = [];
        if(mission.additional.guard_mission === true) {
            missionInfos.guardMission = true;
            missionInfos.credits = +document.getElementById("col_left").innerText.match(/(?:Verdienst:)\s([\d.]+)/g)[0].replace(/\D+/g,"");
        }
        if(mission.place !== null) missionInfos.poi = mission.place;
        if(mission.additional.max_possible_prisoners) missionInfos.prisoners = mission.additional.max_possible_prisoners;
        if(mission.additional.average_min_fire_personnel) missionInfos.firemen = mission.additional.average_min_fire_personnel;
        if(mission.additional.average_min_police_personnel) missionInfos.policemen = mission.additional.average_min_police_personnel;
        if(mission.additional.possible_patient_min || mission.additional.possible_patient) {
            if(missionPatients == 0) {
                missionInfos.minPat = mission.additional.possible_patient_min ? mission.additional.possible_patient_min : 0;
                missionInfos.maxPat = mission.additional.possible_patient;
            }
            missionInfos.hospital = mission.additional.patient_specializations;
            if(mission.chances.patient_transport === undefined) missionInfos.chanceTrsp = 30;
            else missionInfos.chanceTrsp = mission.chances.patient_transport;
            if(mission.chances.patient_other_treatment !== undefined) missionInfos.chanceCarry = mission.chances.patient_other_treatment;
            if(mission.chances.nef !== undefined) missionInfos.chanceNef = mission.chances.nef;
            if(mission.chances.helicopter !== undefined) missionInfos.chanceRth = mission.chances.helicopter;
        }
        var key;
        for(key in mission.requirements) {
            if(key !== "water_needed") {
                var classAlias = aVehicleTypes.filter((obj) => obj.class[0] == key)[0].class_alias[0];
                missionInfos.requirements.push({"key":mission.requirements[key],"item":classAlias});
                if(mission.chances[key]) {
                    missionInfos.chances[classAlias] = mission.chances[key];
                }
            } else {
                missionInfos.requirements.push({"key":mission.requirements[key],"item":"Liter Wasser"});
            }
        }
        if(mission.additional.expansion_missions_ids) {
            for(key in mission.additional.expansion_missions_ids) {
                var e = mission.additional.expansion_missions_ids[key];
                missionInfos.expansions.push(aMissions.filter((obj) => obj.id == e)[0].name);
            }
        }
        if(mission.additional.followup_missions_ids) {
            for(key in mission.additional.followup_missions_ids) {
                var f = mission.additional.followup_missions_ids[key];
                missionInfos.followup.push(aMissions.filter((obj) => obj.id == f)[0].name);
            }
        }
    } else {
        missionInfos.vge = true;
        missionInfos.text = "Bei diesem Einsatz handelt es sich um einen selbst erstellten Verbandgroßeinsatz.";
    }
    createAlert(missionInfos);

    document.getElementById("alrtMissionOverview").onclick = function(e) {
        document.getElementsByClassName("lsscHide")[0].classList.toggle("lsscShow");
    }

})();
