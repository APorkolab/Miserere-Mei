module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('Place', {
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
    opponenthealth: {
      type: DataTypes.INTEGER,
    },
    opponentMinDamage: {
      type: DataTypes.INTEGER,
    },
    opponentMaxDamage: {
      type: DataTypes.INTEGER,
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
    objectFound: {
      type: DataTypes.STRING,
    },
  });

  return Place;
};
