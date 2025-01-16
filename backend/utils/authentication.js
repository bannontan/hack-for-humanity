import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Create JWT Token
export function generateToken(req, res) {
	const { id, email, password, role } = req.body;
	const payload = {
		id: id,
		email: email,
		password: password,
		role: role,
	};

	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: "12h",
	});

	req.session.token = token;
	console.log("Token generated and stored in session");
}

// Verify and Authorize Token
export function verifyToken(token, requiredRole = null) {
	try {
		// Verify the token using the secret
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		console.log(`Token Verified. Decoded payload:`, decoded);

		if (requiredRole && decoded.role !== requiredRole) {
			throw new Error("Unauthorized: Insufficient role");
		}

		console.log("Authorization successful");
		return decoded;
	} catch (err) {
		console.error(`Token verification failed: ${err.message}`);
		return null;
	}
}
