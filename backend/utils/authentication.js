import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Create JWT Token
export function generateToken() {
	// Temporary payload for testing purposes.
	// TODO: need to replace with calls to user data
	const payload = {
		id: 1,
		email: "admin@testing.com",
		password: "admin",
		role: "admin",
	};

	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: "12h",
	});
	console.log(token);

	// For testing only to verify the token information. To be removed.
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	console.log(
		`DECODED: ${decoded.id} ${decoded.email} ${decoded.role} ${decoded.password}`
	);

	return token;
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

const token = generateToken();
verifyToken(token, "admin");
verifyToken(token, "user");
