const {chromium}=require('/tmp/claude-0/qe/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const p=await b.newPage({viewport:{width:794,height:1123}});
await p.goto('file://'+process.cwd()+'/'+process.argv[2],{waitUntil:'networkidle'});
await p.pdf({path:process.argv[3],format:'A4',printBackground:true,margin:{top:0,right:0,bottom:0,left:0}});
await b.close();})();
