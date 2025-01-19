import User from "./User.js";
import UserHelp from "./UserHelp.js";
import AdminPost from "./AdminPost.js";

const defineAssociations = () => {
	User.hasMany(UserHelp, {
		foreignKey: "userId", // The foreign key in Locations
		sourceKey: "id",
		as: "locations", // Alias for user’s help request
	});

	UserHelp.belongsTo(User, {
		foreignKey: "userId", // The foreign key in UserHelp
		targetKey: "id",
		as: "user", // Alias for UserHelp request's user
	});

	User.hasMany(AdminPost, {
		foreignKey: "adminId", // The foreign key in Locations
		sourceKey: "id",
		as: "adminPosts", // Alias for user’s help request
	});

	AdminPost.belongsTo(User, {
		foreignKey: "adminId", // The foreign key in UserHelp
		targetKey: "id",
		as: "admin", // Alias for UserHelp request's user
	});
};

export default defineAssociations;
