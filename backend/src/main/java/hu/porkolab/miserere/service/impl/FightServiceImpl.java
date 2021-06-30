package hu.porkolab.miserere.service.impl;

import hu.porkolab.miserere.data.model.enemies.Monster_Madman;
import hu.porkolab.miserere.service.FightService;
import mainModel.Player;
import mainModel.SuperFoe;
import mainModel.Weapon;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FightServiceImpl implements FightService {
    SuperFoe enemy = null;

    private List<String> harcUzenet = new ArrayList<>();
    private Weapon Weapon_BowieKnife;
    private Weapon Weapon_Beretta9mm;
    private Player player = new PlayerSetupImpl().getPlayer();


    @Override
    public List<String> fight(Player player, SuperFoe enemy) {
        if (enemy == null) {
            enemy = new Monster_Madman();
        }
        while (player.getProtagonistHealthPoint() >= 1 || enemy.getHp() >= 1) {
            protagonistStrike(player, enemy);
            foeStrike(player, enemy);
            if (enemy.getHp() < 1) {
                harcUzenet.add("A játékos győzött!");
                break;
            }
            if (player.getProtagonistHealthPoint() < 1) {
                harcUzenet.add("A játékos vesztett! VÉGE A JÁTÉKNAK!");
                break;
            }
        }
        return harcUzenet;
    }

    public void protagonistStrike(Player player, SuperFoe enemy) {
        enemy.setHp(enemy.getHp() - player.getPlayerDamage());
        harcUzenet.add("Megtámadtad az ellenfeled és " + player.getPlayerDamage() + " sebzést okoztál neki a fegyvereddel (" + player.getCurrentWeaponName() + ").");
        if (player.getCurrentWeaponName().equals("Beretta 92FS")) {
            harcUzenet.add(player.getCurrentWeaponName() + "  (" + player.getPlayerAmmo() + " töltény)");
            harcUzenet.add("Az ellenfél életereje: " + enemy.getHp());
            player.setPlayerAmmo(player.getPlayerAmmo() - 1);
        } else {
            harcUzenet.add("Az ellenfél életereje: " + enemy.getHp());
        }

        if (player.getPlayerAmmo() == 0) {
            harcUzenet.add("Elfogyott a lőszer. Cantusnak a tőrével kell harcolnia.");
            player.setCurrentWeapon(Weapon_BowieKnife);
        }

    }


    public void foeStrike(Player player, SuperFoe enemy) {
        harcUzenet.add("Az ellenfeled " + enemy.getAttack() + " sebzést okozott neked");
        player.setProtagonistHealthPoint(player.getProtagonistHealthPoint() - enemy.getAttack());
        harcUzenet.add("A játékos életereje:" + player.getProtagonistHealthPoint() + "%");

    }

    public List<String> getHarcUzenet() {
        fight(player, enemy);
        return harcUzenet;
    }


}
