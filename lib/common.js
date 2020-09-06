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

loadCss(getFilePath){
    var cssImporter = document.createElement('link');
    cssImporter.setAttributes({"rel":"stylesheet","type":"text/css","href":getFilePath});
    document.querySelector("head").appendChild(cssImporter);
}
