package mainModel;

public class Player {
    private int protagonistHealthPoint;
    private int playerAmmo;
    private int playerDamage;
    private Weapon currentWeapon;
    private String currentWeaponName;

    public int getProtagonistHealthPoint() {
        return protagonistHealthPoint;
    }

    public void setProtagonistHealthPoint(int protagonistHealthPoint) {
        this.protagonistHealthPoint = protagonistHealthPoint;
    }

    public int getPlayerAmmo() {
        return playerAmmo;
    }

    public void setPlayerAmmo(int playerAmmo) {
        this.playerAmmo = playerAmmo;
    }

    public int getPlayerDamage() {
        return playerDamage;
    }

    public void setPlayerDamage(int playerDamage) {
        this.playerDamage = playerDamage;
    }

    public void setCurrentWeapon(Weapon currentWeapon) {
        this.currentWeapon = currentWeapon;
    }

    public Weapon getCurrentWeapon() {
        return currentWeapon;
    }


    public void setCurrentWeaponName(String currentWeaponName) {
        this.currentWeaponName = currentWeaponName;
    }

    public String getCurrentWeaponName() {
        return currentWeaponName;
    }
}