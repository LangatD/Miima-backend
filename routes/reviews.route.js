import { Router } from "express";
import { ReviewCreateSchema } from "../utils/zodSchemas.js";
import Review from "../models/Review.js";

const r = Router();


r.post("/", async (req, res) => {
  const parsed = ReviewCreateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok:false, errors: parsed.error.flatten() });
  }

  try {
    const review = await Review.create({
      name: parsed.data.name,
      company: parsed.data.company ?? "",
      email: parsed.data.email ?? "",
      rating: parsed.data.rating,
      message: parsed.data.message,
      status: "pending"
    });

    return res.json({
      ok:true,
      message: "Thank you! Your review was received."
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok:false, message:"Could not save review" });
  }
});

// approved reviews
r.get("/public", async (_req, res) => {
  const reviews = await Review.find({ status: "approved" })
    .sort({ createdAt: -1 })
    .limit(20)
    .select("name company rating message createdAt");
  return res.json({ ok:true, reviews });
});

// ADMIN- Approve/reject review
r.patch("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!["approved","rejected"].includes(status)) {
    return res.status(400).json({ ok:false, message:"Invalid status" });
  }
  await Review.updateOne({ _id: id }, { $set: { status } });
  return res.json({ ok:true });
});

export default r;
