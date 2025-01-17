import User from "./User.js";
import Locations from "./Locations.js";

const defineAssociations = () => {
    User.hasMany(Locations, {
        foreignKey: "userId", // The foreign key in Locations
        sourceKey: "id",
        as: "locations", // Alias for user’s locations
    });

    Locations.belongsTo(User, {
        foreignKey: "userId", // The foreign key in Locations
        targetKey: "id",
        as: "user", // Alias for location’s user
    });
};

export default defineAssociations;