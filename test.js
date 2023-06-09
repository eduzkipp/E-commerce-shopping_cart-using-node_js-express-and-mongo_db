function shortTimeFunction(callback){
    setTimeout(function(){
        callback(null, 'resultOfShortTimeFunction');
    },200);
}

function mediumTimeFunction(callback){
    setTimeout(function(){
        callback(null, 'resultOfmediumTimeFunction')
    },500);
}

function longTimeFunction(callback){
    setTimeout(function(){
        callback(null, 'resultOflongTimeFunction')
    },1000);
}

async.parallel([
    shortTimeFunction,
    mediumTimeFunction,
    longTimeFunction
],
function(err, results){
    if(err){
        return console.error(err);
    }
    console.log(results);
});