const app = require("../server");
const Post = require("../models/Post");
const supertest = require("supertest");

test("POST /api/posts", async () => {
    const data = { userID: "Nicholas", content: "Lorem ipsum" };

    await supertest(app).post("/api/posts")
        .send(data)
        .expect(200)
        .then(async (response) => {
            // Check the response
            expect(response.body.userID).toBe(data.userID);

            // Check data in the database
            const post = await Post.findOne({ _id: response.body._id });
            expect(post.userID).toBe(data.userID);
        });
});