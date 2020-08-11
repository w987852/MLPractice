const schedule = require('node-schedule');

class Job {
    constructor() {
        this.job = schedule.scheduleJob('*/5 * * * *', () => {
            console.log(new Date());
        });
    }
}

module.exports = Job;
