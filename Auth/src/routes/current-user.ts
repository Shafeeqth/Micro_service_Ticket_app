import express from "express";

const router = express.Router();

router.post('/api/users/currentuser', (req, res) => {
    res.send("Hello");
});


export {router as currentUserRouter}