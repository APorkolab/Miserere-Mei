module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    protagonistHealthPoint: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100,
    },
    playerAmmo: {
      type: DataTypes.INTEGER,
      defaultValue: 15,
    },
    currentWeaponName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Beretta 92FS',
    },
    currentWeaponMinDamage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
    },
    currentWeaponMaxDamage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 6,
    },
  });

  return Player;
};
