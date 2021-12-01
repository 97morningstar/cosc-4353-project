
const app = require('../index');
const request = require("supertest");


describe("POST /api/create_point", () => {
    test("It should respond with a marker", async () => {

    const data = { 
        user_id:"dfsfdsdf",
        latitude:'12345',
        longitude:'56456',
        description:"This marker",
        severity:"2" };
      
      await request(app).post("/api/create_point")
      .send(data)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.user_id).toBe(data.user_id);
        expect(response.body.latitude).toBe(data.latitude);
        expect(response.body.longitude).toBe(data.longitude);
        expect(response.body.description).toBe(data.description);
        expect(response.body.severity).toBe(data.severity);
      });

    });
  });



  describe("GET /api/view_all_markers", () => {
    test("It should respond with a marker", async () => {

      await request(app).get("/api/view_all_markers")
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(Array.isArray(response.body)).toBeTruthy();
      });

    });
  });





  describe("GET /api/view_user_markers/:userID", () => {
    test("It should respond with a marker", async () => {

      await request(app).get("/api/view_user_markers/" + '2')
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(Array.isArray(response.body)).toBeTruthy();
      });

    });
  });


  describe("GET /api/view_severity_markers/:severity", () => {
    test("It should respond with a marker", async () => {

      await request(app).get("/api/view_severity_markers/" + '1')
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(Array.isArray(response.body)).toBeTruthy();
      });

    });
  });