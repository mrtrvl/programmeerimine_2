import * as express from 'express';
const router = express.Router();
const os = require('os');

// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript#answer-18650828
function formatBytes(a : any, b?: any){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}

router.get('/', (req: any, res: any) => {
    let info: any = {};

    // Serveri protsessori(te) / tuumade info
    let cpus: any = os.cpus();
    let cpusToClient: any[] = [];
    cpus.forEach((cpu: any, idx: any) => {
        let newCpu: any = {
        };
        newCpu.model = cpu.model;
        newCpu.speed = cpu.speed;
        cpusToClient.push(newCpu);
    });
    info.cpus = cpusToClient;

    // OS
    let uptime: number = os.uptime();
    let days: number = Math.floor(uptime / 86400);
    uptime -= days * 86400;

    let hours: number = Math.floor(uptime / 3600) % 24;
    uptime -= hours * 3600;

    let minutes: number = Math.floor(uptime / 60) % 60;
    uptime -= minutes * 60;

    let seconds: number = Math.floor(uptime % 60);
    
    info.uptime = {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }

    let serverOs: any = {
        platform: os.platform(),
        arch: os.arch()
    }
    info.os = serverOs;

    // Memory
    info.memory = {
        free: formatBytes(os.freemem()),
        used: formatBytes(os.totalmem() - os.freemem()),
        total: formatBytes(os.totalmem()),
        percentage: ((os.totalmem() - os.freemem()) / os.totalmem()) * 100
    }

    res.locals.info = info; // edasta muutuja "info" ejs vaatesse
    res.render('pages/info');
});

module.exports = router;