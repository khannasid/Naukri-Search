// Disclaimer: The program can take about 20-30 sec, be patient.
const puppeteer = require('puppeteer');

async function scrapeChannel(url) {
    const browser = await puppeteer.launch({headless: false});// launching chromium browser
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'load', timeout: 60000}); // increased timeout time from 30sec to 60sec.
    
    const jobm = await page.evaluate(() =>{
        let job = document.querySelectorAll(".jd-header-title");
        const job1 = [...job];
        return job1.map(h => h.innerText);
    });
    const jobmain = Array.from(new Set(jobm))
    
    const companym = await page.evaluate(()=>{
        let company = document.querySelectorAll(".jd-header-comp-name > a");
        const company1 = [...company];
        return company1.map(h=> h.innerText);
    });
    const companymain = Array.from(new Set(companym))
    
    // Location
    const locationm = await page.evaluate(()=>{
        let company = document.querySelectorAll(".location > a");
        const company1 = [...company];
        return company1.map(h=> h.innerText);
    });
    const locationmain = Array.from(new Set(locationm))
    
    //Experience
    const experiencem = await page.evaluate(()=>{
        let company = document.querySelectorAll(".exp > span");
        const company1 = [...company];
        return company1.map(h=> h.innerText);
    });
    const experiencemain = Array.from(new Set(experiencem))
    
    // Skills
    const skillm = await page.evaluate(()=>{
        let company = document.querySelectorAll(".key-skill > div > a");
        const company1 = [...company];
        return company1.map(h=> h.innerText);
    });
    const skillmain = Array.from(new Set(skillm))

    //JD
    const jdm = await page.evaluate(()=>{
        let company = document.querySelectorAll(".dang-inner-html");
        const company1 = [...company];
        return company1.map(h=> h.innerText.split('\n'));
    });
    const jdmain =[];
    for(let i =0; i < jdm[0].length; i++){
        if(jdm[0][i] !== '' && jdm[0][i] !== 'Required Candidate profile')jdmain.push(jdm[0][i]);
    }

    // Salary
    const salarym = await page.evaluate(()=>{
        let company = document.querySelectorAll(".salary > span");
        const company1 = [...company];
        return company1.map(h=> h.innerText);
    });
    const salarymain = Array.from(new Set(salarym));

    // DOP
    const dopm = await page.evaluate(()=>{
        let company = document.querySelectorAll(".bottom > .jd-stats > .stat > span");
        const company1 = [...company];
        return company1.map(h=> h.innerText);
    });
    const dopmain =[];
    for(let i =0; i < dopm.length; i++){
        if(dopm[i].includes('ago'))dopmain.push(dopm[i]);
    }

    // Job Type
    const typem = await page.evaluate(()=>{
        let company = document.querySelectorAll(".details > span");
        const company1 = [...company];
        return company1.map(h=> h.innerText);
    });
    const typemain =[];
    for(let i =0; i < typem.length; i++){
        if(typem[i].includes('Time'))typemain.push(typem[i]);
    }

    browser.close();

    console.log({jobmain, companymain,locationmain, experiencemain, skillmain, jdmain, salarymain, dopmain, typemain});    
}

// invoking function!!!
scrapeChannel('https://www.naukri.com/job-listings-data-scientist-business-analyst-science-data-analyst-megara-infotech-bhubaneswar-mumbai-hyderabad-secunderabad-gurgaon-gurugram-bangalore-bengaluru-delhi-ncr-0-to-1-years-310323003909?src=discovery_trendingWdgt_homepage_srch&sid=16802765936445865&xp=1&px=1');