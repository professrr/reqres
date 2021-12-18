
class Crawler {
    constructor() {
        this.status = false
        this.delay_time = 
    }

    setStatus({status}) {
        if('boolean' === typeof status)
            this.status =  status
        return this.status
    }

    activateCrawling() {
        try {
            while (true) {
                while(this.status === true) {
                    // await this.parse()
                    // await this.save()
                    // await this.delay(this.delay_time)
                }
            }           
        } catch(err) {
            console.log(err)
        }
    }
}