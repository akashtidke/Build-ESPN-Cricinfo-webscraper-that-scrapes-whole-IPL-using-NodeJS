const request=require("request");
const cheerio=require("cheerio");
const fs=require("fs");
const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";
const allmatchObj=("./allMatch");
request(url,cb);
function cb(error,response,html){
    if(error){
        console.log(error);
    }else{
        //console.log(html);
        extractHtml(html);
    }
}
function extractHtml(html){
    let $=cheerio.load(html);
    let anchorEle=$("a[data-hover='View All Results']");
    let link=anchorEle.attr("href");
    //console.log(link);
    let fullLink="https://www.espncricinfo.com"+link;
   // console.log(fullLink);
   getallMatcheLink(fullLink);

}
function getallMatcheLink(url){
request(url,function(error,response,html){
    if(error){
        console.log(error);
    }else{
      //  console.log()
      extractLink(html);
    }
})
}
function extractLink(html){
    let $=cheerio.load(html);
    let allmatch=$("a[data-hover='Scorecard']");
    for(let i=0;i<allmatch.length;i++){

        let allmatchLink=$(allmatch[i]).attr("href");
        let allscoreBoardLink="https://www.espncricinfo.com"+allmatchLink;
        
        //console.log(allscoreBoardLink);
      
    }
}
