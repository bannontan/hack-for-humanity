import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
	const token = req.session.token;

	if (!token) {
		return res
			.status(401)
			.json({ message: "Unauthorized: No token provided." });
	}

	try {
		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded; // Attach decoded token data to `req.user`
		next(); // Continue to the next middleware/route
	} catch (error) {
		return res.status(403).json({ message: "Forbidden: Invalid token." });
	}
}
