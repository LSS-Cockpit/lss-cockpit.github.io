Object.defineProperty(Object.prototype, 'slideUp',{
    value : function(){
        var el = this;
        el.style.transition = "all 2s ease-in-out";
        el.style.height = "0px";
    },
    enumerable : false
});

Object.defineProperty(Object.prototype, 'slideDown',{
    value : function(){
        var el = this;
        el.style.transition = "all 2s ease-in-out";
        el.style.height = "4px";
    },
    enumerable : false
});
