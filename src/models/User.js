
class User {
    constructor(name = null, email = null, faceDescriptor = null){
        this.name = name;
        this.email = email;
        this.faceDescriptor = faceDescriptor;
    }

    async list(){
        const response = await fetch('http://localhost:8000/api/users');
        const data = await response.json();
        
        return data;
    }

    async get(id){
        const response = await fetch(`http://localhost:8000/api/users/${id}`);
        const data = await response.json();
        
        return data;
    }

    async create(){
        const response = await fetch('http://localhost:8000/api/users/create', {
            method: 'POST',
            body: JSON.stringify({
                name: this.name,
                email: this.email,
                faceDescriptor: this.faceDescriptor
            }),
            headers : {
                'Content-Type' : 'application/json'
            }
        });

        const { success } = await response.json();
        console.log(success);
    }

    async logVerification(id){
        const response = await fetch('http://localhost:8000/api/users/log', {
            method: 'POST',
            body: JSON.stringify({
                userID: id
            }),
            headers : {
                'Content-Type' : 'application/json'
            }
        });

        const { success } = await response.json();
        console.log(success);
    }
}

export default User;