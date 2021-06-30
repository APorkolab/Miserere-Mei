package hu.porkolab.miserere.service.impl;

import hu.porkolab.miserere.data.model.items.Weapon_Beretta9mm;
import hu.porkolab.miserere.service.PlayerService;
import mainModel.Player;
import mainModel.Weapon;
import org.springframework.stereotype.Service;

@Service
public class PlayerSetupImpl implements PlayerService {
    private Weapon currentWeapon;
    private int protagonistHealthPoint;
    private int playerAmmo;
    private int playerDamage;
    private String currentWeaponName;
    private Player player = new Player();

    public PlayerSetupImpl() {
        currentWeapon = new Weapon_Beretta9mm();
        player.setProtagonistHealthPoint(100);
        player.setPlayerAmmo(currentWeapon.sizeOfClip);
        player.setCurrentWeaponName(currentWeapon.name);
        player.setPlayerDamage(currentWeapon.damage);
    }

    public Weapon getCurrentWeapon() {
        return currentWeapon;
    }

    public void setCurrentWeapon(Weapon currentWeapon) {
        this.currentWeapon = currentWeapon;
    }

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

    public String getCurrentWeaponName() {
        return currentWeaponName;
    }

    public void setCurrentWeaponName(String currentWeaponName) {
        this.currentWeaponName = currentWeaponName;
    }

    @Override
    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }
}
