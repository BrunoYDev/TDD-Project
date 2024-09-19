let app = require("../src/app");
let supertest = require("supertest");
let request = supertest(app);

it("The app must respond on port 3000", () => {

    return request.get("/").then(res => {
        let status = res.statusCode;
        expect(status).toEqual(200);
    }).catch(err => {
        fail(err);
    });

});