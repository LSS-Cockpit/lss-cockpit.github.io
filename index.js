console.log("Welcome to LSS-Cockpit!");

function loadScript(source, callback){
    var script = document.createElement('script');
    var prior = document.getElementsByTagName('script')[0];
    script.async = 1;

    script.onload = script.onreadystatechange = (_, isAbort) => {
        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = script.onreadystatechange = null;
            script = undefined;
            if (!isAbort) if (callback) callback();
        }
    };

    script.src = source+"?v="+Date.now();
    prior.parentNode.insertBefore(script, prior);
};

loadScript("https://quizzical-curran-b45735.netlify.app/lib/common.js");
loadScript("https://quizzical-curran-b45735.netlify.app/apps/appstore.js");
