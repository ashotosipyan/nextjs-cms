import executeQuery from "../../lib/db";

export default async function handler(req, res) {
  try {
    const result = await executeQuery({
      query: "SELECT * FROM users WHERE email = ?",
      values: [req.body.username],
    });
    if (result.length > 0) {
      res.status(200).json({ name: result[0].email, email: result[0].email });
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (e) {
    res.status(500).json({ msg: "Server error" });
  }
}
