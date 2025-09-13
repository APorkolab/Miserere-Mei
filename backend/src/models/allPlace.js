module.exports = (sequelize, DataTypes) => {
  const AllPlace = sequelize.define('AllPlace', {
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    narrationZoneText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    opponentName: {
      type: DataTypes.STRING,
    },
    decision1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    decision2: {
      type: DataTypes.STRING,
    },
    decision3: {
      type: DataTypes.STRING,
    },
    decision4: {
      type: DataTypes.STRING,
    },
    furtherLocation1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    furtherLocation2: {
      type: DataTypes.STRING,
    },
    furtherLocation3: {
      type: DataTypes.STRING,
    },
    furtherLocation4: {
      type: DataTypes.STRING,
    },
  });

  return AllPlace;
};
