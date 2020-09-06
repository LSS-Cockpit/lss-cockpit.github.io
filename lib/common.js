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
