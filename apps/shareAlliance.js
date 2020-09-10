(async function() {

    if(sessionStorage.lsscShareAlliance) {
        $('#mission_general_info').parent().after(sessionStorage.lsscShareAlliance);
        sessionStorage.removeItem("lsscShareAlliance");
    }

    if(!document.getElementById("mission_alliance_share_btn")) return false;

    var userCredits = 0; //vom User festgelegtes Creditlimit zum freigeben;
    var pushAlliance = 1; //RM in Verbandchat (1: RM im Chat, 0: RM nicht im Chat)
    var pushOptional = true; //optionale RM
    var optionalText = ["Frei zum mitverdienen.","Bitte fehlende Fahrzeuge schicken.","Ein Fahrzeug zum Verdienen reicht."]; //array Rueckmeldungen
    var pushAddress = true; //Adresse in RM
    var pushPatients = true; //Patienten in RM
    var pushCredits = true; //Credits in RM
    var jumpNext = false; //zum naechsten Einsatz springen

    var aMissions = await loadApi("missions");
    var missionId = getMissionId();
    var missionIdNextMission = +document.getElementById("mission_next_mission_btn").href.replace(/\D+/g,"");
    var missionPatients = document.getElementsByClassName("mission_patient").length;
    var mission = aMissions.filter((obj) => obj.id == getMissionTypeId())[0];
    var missionAddress = document.getElementById("mission_general_info").innerText.split("|")[0].replace(mission.name.toUpperCase(), '').trim();
    var credits = mission.additional.guard_mission ? +document.getElementById("col_left").innerText.match(/(?:Verdienst:)\s([\d.]+)/g)[0].replace(/\D+/g,"") : mission.average_credits;
    if(credits === null) credits = 0;

    if(credits < (userCredits - 1)) return false;

    var shareBtn = document.createElement("a");
    shareBtn.classList = "btn btn-success btn-sm";
    shareBtn.id = "btnShareAlliance";
    shareBtn.title = "Alarmieren, im Verband freigeben und eine Rückmeldung in den Einsatz senden.";
    shareBtn.style.height = "32px";
    shareBtn.innerHTML = `<img class="icon icons8-Phone-Filled" src="/images/icons8-phone_filled.svg" width="16" height="16">
                          <img class="icon icons8-Share" src="/images/icons8-share.svg" width="16" height="16">
                          <span class="glyphicon glyphicon-bell"></span>
                          <span class="glyphicon glyphicon-arrow-right" id="jumpArrow" style="display:${jumpNext ? "inline" : "none"}"></span>`;
    document.getElementById("mission_finish_now_btn").insertAfter(shareBtn);

    if(pushOptional) {
        var saInput = document.createElement("input");
        saInput.id = "userFeedback";
        saInput.style.height = "32px";
        saInput.style.width = "20em";
        saInput.placeholder = "zusätzliche Rückmeldung";
        document.getElementById("btnShareAlliance").insertAfter(saInput);
    }

    function alarmAndShare(message) {
        var checkedVehicles = [];
        var feedbackAlert = "";
        var vCbx = document.getElementsByClassName("vehicle_checkbox");
        for(var i in vCbx) {
            if(vCbx[i].checked) checkedVehicles.push(vCbx[i].id.replace(/\D+/g,""));
        }
        $.post('/missions/' + missionId + '/alarm', {'vehicle_ids' : checkedVehicles}, function(data){
            if(checkedVehicles.length > 0) feedbackAlert = $(".alert-success ", data)[0].outerHTML.replace('</div>','');
            $.post('/missions/' + missionId + '/alliance',function(data){
                if(checkedVehicles.length > 0) feedbackAlert += '<br>' + $(".alert-success ", data).text().replace(/^\W/g,'');
                else feedbackAlert = $(".alert-success ", data)[0].outerHTML.replace('</div>','');
                $.post("/mission_replies", {"mission_reply": {"alliance_chat" : pushAlliance, "content" : message, "mission_id" : missionId}, "authenticity_token" : document.getElementsByName("csrf-token")[0].content}, function(data){
                        feedbackAlert += ' ' + $(".alert-success ", data).text().replace(/^\W/g,'') + '</div>';
                        sessionStorage.lsscShareAlliance = feedbackAlert;
                        jumpNext && missionIdNextMission ? window.location.replace('/missions/' + missionIdNextMission) : window.location.reload();
                });
            });
        });
    }

    function createMessage() {
        var missionMessage = "";
        var textBlock = [];
        if(pushAddress) textBlock.push(missionAddress);
        if(pushCredits) (mission.additional.guard_mission || Object.keys(mission.requirements).length === 0) ? textBlock.push(credits.toLocaleString() + " Credits") : textBlock.push("ca. " + credits.toLocaleString() + " Credits");
        if(pushPatients && missionPatients > 0) textBlock.push(missionPatients + " Patienten");
        if(pushOptional) textBlock.push(document.getElementById("userFeedback").value);
        for(var i in textBlock) {
            if(i == textBlock.length - 1) missionMessage += textBlock[i];
            else missionMessage += textBlock[i] + " | ";
        }
        alarmAndShare(missionMessage);
    }

    document.getElementById("btnShareAlliance").onclick = function(e) {
        createMessage();
    }


})();
