let tesseract = require('node-tesseract')
var request = require('request');
var fs = require('fs');
const { getHeapCodeStatistics } = require('v8');
let getNumFromUrl = async (url, list) =>{
    let result = ''
    var img_src = 'http://static8.ziroom.com/phoenix/pc/images/2020/list/img_pricenumber_list_red.png'; 
    console.log( url === img_src,'url')
    resultPromise = getDataFrom(url,list)
    resultPromise.then((res) =>{
        result = res
    })

    console.log(resultPromise,'resultPromise')
    console.log(result,'result')
    return result
}

function  getDataFrom(url,list){
    let resultEnd = ''
    var img_filename = '1.png';
    let resList = []
    let options={
        l:'eng',
       'psm':3,
       'config':null,
       'binary':'tesseract',
       'hocr':null
    }
    // request(url).pipe(fs.createWriteStream('./'+ img_filename));
    // sleep(3000)
    // tesseract.process( __dirname + '/1.png', options, function(err, text) {
    //     if(err) {
    //         console.error(err,'err');
    //     } else {
    //         console.log(text,'text');
    //         let result = ''
    //         resList = (text + '').split('')
    //         Array.isArray(list) && list.map( (v,i) =>{
    //             let n = parseInt(v/20)
    //             result += resList[n]
        
    //         })
    //         resultEnd =  result
    //         console.log(result,'resultEnd')
    //     }
    // });
    

    return new Promise((res,rej) =>{
        tesseract.process( __dirname + '/1.png', options, function(err, text) {
            if(err) {
                console.error(err,'err');
            } else {
                console.log(text,'text');
                let result = ''
                resList = (text + '').split('')
                Array.isArray(list) && list.map( (v,i) =>{
                    let n = parseInt(v/20)
                    result += resList[n]
                })
                res(result) 
            }
        });
    })
    // .then((res) =>{
    //     resultEnd = res
    // })
    // sleep(10000)
    // return resultEnd

    
    // await fs.unlink('./'+ img_filename,(err) => {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       console.log('delete ok');
    //     }
    //   });

}
function sleep(milliSeconds){ 
    var StartTime =new Date().getTime(); 
    let i = 0;
    while (new Date().getTime() <StartTime+milliSeconds);

}
module.exports = getNumFromUrl

