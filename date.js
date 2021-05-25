
function getFullDate(){
    
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    }

    let date = new Date().toLocaleDateString("en-US", options);
    return date;
}

module.exports.getFullDate = getFullDate;

function getDay(){
    
    let options = {
        weekday: "long",
    }

    let date = new Date().toLocaleDateString("en-US", options);
    return date;
}

module.exports.getDay = getDay;
