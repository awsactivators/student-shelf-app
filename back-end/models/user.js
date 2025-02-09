module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    campus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    policy: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      defaultValue: 0.0,
    },
    activeListings: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  return User;
};
