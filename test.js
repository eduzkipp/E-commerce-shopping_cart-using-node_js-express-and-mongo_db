

console.log("entering the loop...");
outerloop:
for( var x=0;x<5;x++){
console.log("outerloop: "+x+"<br />");

innerloop:
for(var j=0;j<5;j++){
    if(j>3) break;
    if(x==2) break innerloop;
    if(x==4) break outerloop;
    console.log("innerloop:"+j+"<br />");
}
}
console.log("Existing the outer loop..");