console.log("Welcome to LSS-Cockpit!");

var lsscAppStore = document.createElement("div");
lsscAppStore.setAttribute("id","lsscAppStore");
lsscAppStore.innerText = "Tescht";
document.getElementById("main_navbar").insertAfter(lsscAppStore);

var lsscAppStoreLabel = document.createElement("div");
lsscAppStoreLabel.setAttribute("id","lsscAppStoreLabel");
lsscAppStoreLabel.innerHTML = `<div class="label label-default pull-right" style="margin: -2em 3em 0 0">LSS-Cockpit</div>`;
document.getElementById("lsscAppStore").insertAfter(lsscAppStoreLabel);

document.getElementById("lsscAppStoreLabel").addEventListener("click", function(){
    var appStore = document.getElementById("lsscAppStore");
    if(appStore.innerHeight > 0) appStore.slideUp();
    else appStore.slideDown();
});
