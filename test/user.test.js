let app = require("../src/app");
let supertest = require("supertest");
let request = supertest(app);

describe("User Register", () => {
    it("Should register an user successfuly", () => {

        let time = Date.now();
        let email = `${time}@mail.com`;
        let user = {name: "Bruno", email, password: "1233456"}

        return request.post("/user").send(user).then(res => {

            expect(res.statusCode).toEqual(200);
            expect(res.body.email).toEqual(email);

        }).catch(err => console.log(err));
    });

    it("Shouldn't allow to register user with empty fields", () => {

        let user = {name: "", email: "", password: ""};

        return request.post("/user").send(user).then(res => {

            expect(res.statusCode).toEqual(400);
            expect(res.body.err).toEqual("Please fill all fields");

        }).catch(err => console.log(err));
    });

    it("Shouldn't allow to register user with existing email", () => {

        let time = Date.now();
        let email = `${time}@mail.com`;
        let user = {name: "Bruno", email, password: "1233456"}

        return request.post("/user").send(user).then(res => {

            expect(res.statusCode).toEqual(200);
            expect(res.body.email).toEqual(email);

            return request.post("/user",).send(user).then(res => {

                expect(res.statusCode).toEqual(400);
                expect(res.body.err).toEqual("Email already registered");

            }).catch(err => console.log(err))

        }).catch(err => console.log(err));
    });
})