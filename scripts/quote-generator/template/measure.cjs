const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:794,height:1123}});
await p.emulateMedia({media:'print'});
await p.goto('file://'+process.cwd()+'/'+process.argv[2],{waitUntil:'networkidle'});
console.table(await p.evaluate(()=>[...document.querySelectorAll('.sheet')].map((s,i)=>{
  const h=s.getBoundingClientRect().height;return{sheet:i+1,px:Math.round(h),over:Math.round(h-1123)};})));
await b.close();})();
