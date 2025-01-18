import User from "./User.js";
import UserHelp from "./UserHelp.js";

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
};

export default defineAssociations;
