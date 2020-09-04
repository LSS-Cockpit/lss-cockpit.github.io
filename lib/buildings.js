Object.defineProperty(Object.prototype, 'vehicles',{
    value : function(){
        try {
            var rows = this.querySelector("tbody").querySelectorAll("tr");
        } catch(e) {
            return e;
        }

        var vehicles = [];
        for(var vehicle of rows){
            var attr = vehicle.children[1].attributes.sortvalue.value;
            var pattern = new RegExp(/(?<vehicleName>.*)\s(?<vehicleId>\d+)/g);
            var filtered = pattern.exec(attr);
            vehicles.push({"name":filtered[1],"id":filtered[2]});
        }

        return vehicles;
    },
    enumerable : false
});
