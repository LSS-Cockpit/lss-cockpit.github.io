console.log("Hier kommt die MissionOverview hin!");
if(!localStorage.aMissions || JSON.parse(localStorage.aMissions).lastUpdate < (new Date().getTime() - 5 * 1000 * 60)) {
        await $.getJSON('/einsaetze.json').done(data => localStorage.setItem('aMissions', JSON.stringify({lastUpdate: new Date().getTime(), value: data})) );
    }

    var aMissions = JSON.parse(localStorage.aMissions).value;
    var missionId = window.location.pathname.replace(/\D+/g,"");
    var missionTypeId = document.getElementById("mission_help").pathname ? document.getElementById("mission_help").pathname.replace(/\D+/g,"") : "VGE";
    var insertAlert = document.createElement("div");
    insertAlert.classList = "alert fade in alert-info";

    if(isNaN(missionTypeId)) {
        insertAlert.innerHMTL = `<button class="close" data-dismiss="alert" type="button">×</button>Bei diesem Einsatz handelt es sich um einen selbst erstellten Verbandgroßeinsatz.`;
    } else {
        var mission = aMissions.filter((obj) => obj.id == missionTypeId)[0];
        var alertText = mission.name + ", Ø " + mission.average_credits.toLocaleString() + " Credits";
        console.log("Mission: ", mission);
        console.log("Requirements: ", mission.requirements);
        for(var key in mission.requirements) {
        }
        console.log("Chances: ", mission.chances);
        console.log(alertText);
    }

    //document.getElementById("mission_general_info").insertAfter(insertAlert);
