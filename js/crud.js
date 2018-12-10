var mysql = require("mysql");



var CRUD = function () {

    var that = this;
    that.insertData = function (tableName, cols, data) {
        var statement = "INSERT INTO " + tableName + "(";

        for (var i = 0; i < cols.length; i++) {
            statement += cols[i];
            var length = cols.length;
            console.log(i < cols.length);
            if (i == length - 1) {
                statement += " ";
            } else {
                statement += ", ";
            }
        }
        statement += ") VALUES (\'";
        for (var i = 0; i < data.length; i++) {
            statement += data[i];
            var length = data.length;
            if (i == length - 1) {
            } else {
                statement += "\',\'";
            }
        }
        console.log(statement);
        return statement += "\')";
    }
    that.readData = function (tableName, cols, constraints,distinct) {
        var where = true;
        var statement = "SELECT ";
        if(distinct){
            statement += "DISTINCT ";
        }

        for (var i = 0; i < cols.length; i++) {
            statement += cols[i];
            var length = cols.length;
            if (i == length - 1) {
                statement += " ";
            } else {
                statement += ", ";
            }
        }
        statement += "FROM " + tableName;
        if (constraints != null) {
            if (constraints.length > 0) {
                
                for(var i = 0; i < constraints.length; i++){
                    if(where && constraints[i] != ""){
                        statement += " WHERE ";
                        where = false;
                    }
                    statement +=  constraints[i];
                    if(constraints[i] != ""){
                        
                    }
                }
                
            }
        }
        return statement;
    }
    that.updateData = function (tableName, changeParams, whereParams) {
        return "UPDATE " + tableName + " SET " + changeParams + " WHERE " + whereParams;
    }
    that.deleteData = function (tableName, constraints) {
        var statement = "DELETE FROM " + tableName;

        if (constraints != null) {
            if (constraints.length > 0) {
                statement += " WHERE " + constraints;
            }
        }
        return statement;
    }
};
module.exports = CRUD;