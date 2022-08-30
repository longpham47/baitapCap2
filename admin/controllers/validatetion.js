function Validation() {
    this.checkEmpty = function (inputVal, spanID, message) {

        if (inputVal.trim() != "") {
            // hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }

        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;
    }
   
    
    this.checkscore = function (inputVal, spanID, message) {
        var pattern = /^[0-9]+$/;
        if (inputVal.match(pattern) && inputVal <= 2e7) {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;
    }
   
    
   
}