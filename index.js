console.log("Welcome to LSS-Cockpit!");

document.getElementById("main_navbar").style.cssText = "margin-bottom: 0px; border-bottom: 0px";
    document.getElementById("map_outer").style.marginTop = "20px";
    document.getElementById("missions_outer").style.marginTop = "20px";

    var mainNavbar = document.getElementById("main_navbar");

    var cssAppstore = document.createElement('link');
    cssAppstore.setAttribute('rel', 'stylesheet');
    cssAppstore.setAttribute('type', 'text/css');
    cssAppstore.setAttribute('href', 'https://quizzical-curran-b45735.netlify.app/css/appstore.css');
    document.querySelector("head").appendChild(cssAppstore);

    var cssCards = document.createElement('link');
    cssCards.setAttribute('rel', 'stylesheet');
    cssCards.setAttribute('type', 'text/css');
    cssCards.setAttribute('href', 'https://quizzical-curran-b45735.netlify.app/css/cards.css');
    document.querySelector("head").appendChild(cssCards);

    var lsscAppStore = document.createElement("div");
    lsscAppStore.setAttribute("id","lsscAppStore");
    lsscAppStore.innerText = "Tescht";
    lsscAppStore.style.cssText = "visibility: hidden; height: 0px; margin-top: 0px";
    lsscAppStore.style.width = mainNavbar.clientWidth+"px";
    mainNavbar.insertAfter(lsscAppStore);

    var lsscAppStoreLabel = document.createElement("div");
    lsscAppStoreLabel.setAttribute("id","lsscAppStoreLabel");
    lsscAppStoreLabel.style.margin = "-5px 2em 0 0";
    lsscAppStoreLabel.classList.add("pull-right");
    lsscAppStoreLabel.innerHTML = `<div class="label label-default">LSS-Cockpit</div>`;
    document.getElementById("lsscAppStore").insertAfter(lsscAppStoreLabel);

    document.getElementById("lsscAppStoreLabel").addEventListener("click", function(){
        var appStore = document.getElementById("lsscAppStore");

        if(appStore.style.visibility == "hidden"){
            console.log((document.getElementById("row-main-template").clientHeight-20));
            appStore.style.cssText = "visibility: visible; height: "+(window.innerHeight - document.getElementById("main_navbar").clientHeight - 20)+"px; margin-top: -21px";
            appStore.style.width = mainNavbar.clientWidth+"px";
        }
        else{
            appStore.style.cssText = "visibility: hidden; height: 0px; margin-top: 0px";
        }
    });
