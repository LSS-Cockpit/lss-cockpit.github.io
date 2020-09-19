(async function() {

    if(!document.getElementById("mission_vehicle_driving")) return false;

    var aVehicleTypes = await loadApi("vehicleTypes");
    var missingText = document.getElementById("missing_text").textContent;
    var vehiclesDriving = document.getElementById("mission_vehicle_driving").innerHTML.matchAll(/(?:vehicle\_type\_id)="(?<i>\d+)/gm);

    function createMissedAlert(missedVehicles) {
        var $missedVehicles = missedVehicles;
        var alertVehicles = [];
        var insertAlert = document.createElement("div");
        var alertText = "<button class='close' data-dismiss='alert' type='button'>×</button>Fehlende Fahrzeuge:<br>";
        insertAlert.classList = "alert alert-info";

        for(var key in $missedVehicles) {
            var e = $missedVehicles[key];
            var item = aVehicleTypes.filter((obj) => obj.class[0] == key)[0].class_alias[0];
            alertVehicles.push({"key":e,"item":item});
        }

        for(var i in alertVehicles) {
            var vKey = alertVehicles[i].key.toLocaleString();
            var vItem = alertVehicles[i].item;
            if(i+1 == alertVehicles.length) {
                alertText += vKey + " " + vItem;
            } else {
                alertText += vKey + " " + vItem + ", ";
            }
        }

        insertAlert.innerHTML = alertText;
        //document.getElementById("mission_general_info").insertAfter(insertAlert);
        $("#mission_general_info").parent().after(insertAlert);
    }

    function searchMissedVehicles(missedRequirements) {
        var $missedReq = missedRequirements;
        var vehicleTypeIdsDriving = [];

        for(const vId of vehiclesDriving) {
            vehicleTypeIdsDriving.push(vId.groups.i);
        }

        for(var key in $missedReq) {
            for(var i in vehicleTypeIdsDriving) {
                var e = aVehicleTypes[vehicleTypeIdsDriving[i]];

                if(e.class.includes(key)) {
                    $missedReq[key]--;
                }
            }
        }
        for(key in $missedReq) {
            if($missedReq[key] <= 0) delete $missedReq[key];
        }
        createMissedAlert($missedReq);
    }

    function searchMissingVehicles() {
        var missingVehicles = missingText.trim().matchAll(/(?<i>\d+)\s(?<v>[\w\d\p{L}\s\/-]+(?:\(.*?\))?)/gu);
        var missingRequirements = [];

        for(const vehicle of missingVehicles) {
            missingRequirements.push({"missing":+vehicle.groups.i,"vehicle":vehicle.groups.v});
        }

        var replaceMissingLabel = (renameMissing) => {
            var $renameIt = renameMissing;
            var $replaceIt = {"SEK-Fahrzeuge":"sek", "SEK-Fahrzeug":"sek", "MEK-Fahrzeuge":"mek", "MEK-Fahrzeug":"mek", "FuStW":"police_cars", "Polizeihubschrauber":"police_helicopters",
                              "Löschfahrzeuge (LF)":"firetrucks", "Löschfahrzeug (LF)":"firetrucks", "FwK":"fwk", "Rüstwagen oder HLF":"heavy_rescue_vehicles", "GW-A oder AB-Atemschutz":"mobile_air_vehicles",
                              "Gerätekraftwagen (GKW)":"thw_gkw", "THW-Einsatzleitung (MTW TZ)":"thw_mtwtz", "Radlader (BRmG R)":"thw_brmg_r", "Anhänger Drucklufterzeugung":"thw_dle", "LKW Kipper (LKW K 9)":"thw_lkw",
                              "GW-Öl":"gwoil", "Schlauchwagen (GW-L2 Wasser, SW 1000, SW 2000 oder Ähnliches)":"water_tankers", "GW-Taucher":"diver_units", "Boote":"boats", "Boot":"boats",
                              "ELW 1":"battalion_chief_vehicles", "Flugfeldlöschfahrzeuge":"arff", "Flugfeldlöschfahrzeug":"arff", "Rettungstreppen":"rettungstreppe", "Rettungstreppe":"rettungstreppe",
                              "GW-Werkfeuerwehr":"gw_werkfeuerwehr", "Turbolöscher":"turboloescher", "ULF mit Löscharm":"ulf", "Teleskopmasten":"teleskopmast", "Teleskopmast":"teleskopmast",
                              "Wasserwerfer":"wasserwerfer", "Dekon-P":"hazmat_dekon", "GruKw":"grukw", "FüKw":"fukw", "leBefKw":"lebefkw", "ELW 2":"mobile_command_vehicles", "GW-Messtechnik":"gwmess",
                              "GW-Gefahrgut":"hazmat_vehicles", "GW-Höhenrettung":"height_rescue_units", "Drehleitern (DLK 23)":"platform_trucks", "Drehleiter (DLK 23)":"platform_trucks",
                              "Rettungshundestaffel/n":"rescue_dog_units","THW-Mehrzweckkraftwagen (MzKW)":"thw_mzkw","DHuFüKw":"k9"}
            var $vehicleRenames = {};

            for(var vehicle in $renameIt){
                var vehicleOldName = $renameIt[vehicle].vehicle;
                var vehicleNewName = $replaceIt[vehicleOldName];
                var vehicleCount = $renameIt[vehicle].missing;

                if(vehicleNewName === undefined) continue;

                $vehicleRenames[vehicleNewName] = vehicleCount;
            }

            return $vehicleRenames;
        }
        searchMissedVehicles(replaceMissingLabel(missingRequirements));
    }

    if(missingText.includes("Fahrzeuge")) {
        var triggerBtn = document.createElement("a");
        triggerBtn.classList = "btn btn-info";
        triggerBtn.id = "btnMissedVehicles";
        triggerBtn.innerText = "fehlende Fahrzeuge";
        triggerBtn.style.height = "32px";
        document.getElementsByClassName("navbar-header")[0].appendChild(triggerBtn);
    }

    document.getElementById("btnMissedVehicles").onclick = function(e) {
        searchMissingVehicles();
    }

})();
