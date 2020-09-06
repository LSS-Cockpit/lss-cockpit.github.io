Object.defineProperty(Object.prototype, 'insertAfter',{
    value : function(elementToInsert){
        this.parentNode.insertBefore(elementToInsert, this.nextSibling);
    },
    enumerable : false
});

Object.defineProperty(Object.prototype, 'setAttributes',{
    value : function(options){
        for(var option in options) {
            this.setAttribute(option, options[option]);
        }
    },
    enumerable : false
});

function loadCss(getFilePath){
    var cssImporter = document.createElement('link');
    cssImporter.setAttributes({"rel":"stylesheet","type":"text/css","href":getFilePath});
    document.querySelector("head").appendChild(cssImporter);
}

function getScript(source, callback){
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

    script.src = source;
    prior.parentNode.insertBefore(script, prior);
};
