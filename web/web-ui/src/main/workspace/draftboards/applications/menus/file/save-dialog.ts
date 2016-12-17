export class SaveDialog {
    person = { firstName: '' };
    constructor(controller){

    }
    activate(person){
        this.person = person;
    }

    testDelegate () {
        alert("Delegation worked");
    }

}
