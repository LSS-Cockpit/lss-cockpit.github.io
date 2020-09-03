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
    el.style.height = (window.innerHeight - document.getElementById("main_navbar").clientHeight) + "px";
  },
  enumerable : false
});

Object.defineProperty(Object.prototype, 'insertAfter',{
  value : function(elementToInsert){
    this.parentNode.insertBefore(elementToInsert, this.nextSibling);
  },
  enumerable : false
});
