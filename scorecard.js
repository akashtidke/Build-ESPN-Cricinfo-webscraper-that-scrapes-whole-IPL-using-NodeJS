const request=require("request");
const cheerio=require("cheerio");
const { isGeneratorFunction } = require("util/types");
const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard";

request(url,cb);
function cb(error,response,html){
    if(error){
        console.log(error);
    }else{
        extractallMatchDetails(html);
    }
}
function extractallMatchDetails(html){
    let $=cheerio.load(html);
    let venu=$(".header-info .description");
    let result=$(".event .status-text");
    let strArr=venu.text().split(",");
    let venu1=strArr[1].trim();
    let date=strArr[2].trim();
     result=result.text();
    let innings=$(".card.content-block.match-scorecard-table>.Collapsible");
    //let htmlString= "";
    for(let i=0;i<innings.length;i++){
//htmlString+=$(innings[i]).html();
let teamName=$(innings[i]).find("h5").text();
teamName=teamName.split("INNINGS")[0].trim();
let opponentIndex=i==0?1:0;
let opponentNmae=$(innings[opponentIndex]).find("h5").text();
opponentNmae=opponentNmae.split("INNINGS")[0].trim();
//console.log(`${venu1} ${date} ${teamName} ${opponentNmae} ${result}`);
let cinning=$(innings[i]);
let allRows=cinning.find(".table.batsman tbody tr")
for (let j = 0; j < allRows.length; j++) {
    let allCols = $(allRows[j]).find("td");
    let isWorthy = $(allCols[0]).hasClass("batsman-cell");
    if (isWorthy == true) {
        // console.log(allCols.text());
        //       Player  runs balls fours sixes sr 
        let playerName = $(allCols[0]).text().trim();
        let runs = $(allCols[2]).text().trim();
        let balls = $(allCols[3]).text().trim();
        let fours = $(allCols[5]).text().trim();
        let sixes = $(allCols[6]).text().trim();
        let sr = $(allCols[7]).text().trim();
         console.log(`${playerName} ${runs} ${balls} ${fours} ${sixes} ${sr}`);
    }
}
}
// console.log(htmlString);
}
