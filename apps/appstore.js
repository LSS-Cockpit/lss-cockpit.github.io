loadCss("https://quizzical-curran-b45735.netlify.app/css/appstore.css");
loadCss("https://quizzical-curran-b45735.netlify.app/css/cards.css");

var apps = [{
    "name":"missionOverview",
    "version":"1.0.0",
    "description":"Im MissionOverview werden dir die Fahrzeug-Anforderungen des Einsatzes angezeigt.",
    "hashtags":["einsatz","fahrzeug"]
},{
    "name":"JustInTime",
    "version":"1.0.0",
    "description":"Schaffe ich es noch den Einsatz vor Ablauf der ablaufenden Zeit zu erreichen? Das sagt dir JustInTime.",
    "hashtags":["einsatz","fahrzeug"]
}];

document.getElementById("main_navbar").style.cssText = "margin-bottom: 0px; border-bottom: 0px";
document.getElementById("map_outer").style.marginTop = "20px";
document.getElementById("missions_outer").style.marginTop = "5px";

var mainNavbar = document.getElementById("main_navbar");

var lsscAppStore = document.createElement("div");
lsscAppStore.setAttribute("id","lsscAppStore");
lsscAppStore.style.cssText = "visibility: hidden; height: 0px; width: "+mainNavbar.clientWidth+"px margin-top: 0px";
mainNavbar.insertAfter(lsscAppStore);

var lsscAppStoreLabel = document.createElement("div");
lsscAppStoreLabel.setAttribute("id","lsscAppStoreLabel");
lsscAppStoreLabel.style.margin = "-5px 2em 0 0";
lsscAppStoreLabel.classList.add("pull-right");
lsscAppStoreLabel.innerHTML = `<div class="label label-default">LSS-Cockpit</div>`;
document.getElementById("lsscAppStore").insertAfter(lsscAppStoreLabel);

for(var app of apps){
    var hashtags = "";
    for(var hashtag of app.hashtags){
        hashtags += `<div class="label label-default">#${hashtag}</div> `;
    }

    var cardTemplate = document.createElement("div");
    cardTemplate.classList = "col-sm-3";
    cardTemplate.innerHTML = `<div class="card card-default">
                                  <div class="card-img">
                                      <img class="img-responsive" src="https://i.picsum.photos/id/626/640/320.jpg?grayscale&amp;hmac=y7eoe9cjCmcMERH3d6E2skUjRn4ibwbJCYljE-bJCSg">
                                  </div>
                                  <div class="card-body">
                                      <h4>%APPNAME% v%VERSION%</h4>
                                      <p>%DESCRIPTION%</p>
                                      <p>%HASHTAGS%</p>
                                  </div>
                              </div>`.replace("%APPNAME%",app.name).replace("%DESCRIPTION%",app.description).replace("%VERSION%",app.version).replace("%HASHTAGS%",hashtags);;
    lsscAppStore.appendChild(cardTemplate);
}

document.getElementById("lsscAppStoreLabel").addEventListener("click", function(){
    var appStore = document.getElementById("lsscAppStore");

    if(appStore.style.visibility == "hidden"){
        console.log((document.getElementById("row-main-template").clientHeight-20));
        appStore.style.cssText = "visibility: visible; height: "+(window.innerHeight - document.getElementById("main_navbar").clientHeight - 20)+"px; width: "+mainNavbar.clientWidth+"px margin-top: -21px; padding: 2em;";
    }
    else{
        appStore.style.cssText = "visibility: hidden; height: 0px; margin: 0px; padding: 0px";
    }
});
