class Schedule {
    constructor(userID, from, to, date){
        this.userID = userID;
        this.from = from;
        this.to = to;
        this.date = date;
    }

    async list(date){
        const response = await fetch('http://localhost:8000/api/schedules', {
            method: 'POST',
            body: JSON.stringify({
                date: date
            }),
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        const data = await response.json();
        
        return data;
    }

    async create(){
        const response = await fetch('http://localhost:8000/api/schedules/create', {
            method: 'POST',
            body: JSON.stringify({
               userID: this.userID,
               from: this.from,
               to: this.to,
               date: this.date
            }),
            headers : {
                'Content-Type' : 'application/json'
            }
        }); 

        const { success } = await response.json();
        console.log(success);

        return {success};
    }
}

export default Schedule;