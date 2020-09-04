Object.defineProperty(Object.prototype, 'insertAfter',{
  value : function(elementToInsert){
    this.parentNode.insertBefore(elementToInsert, this.nextSibling);
  },
  enumerable : false
});
