package hu.porkolab.miserere.data.model.items;

import mainModel.Weapon;

public class Weapon_BowieKnife extends Weapon {

    public Weapon_BowieKnife() {

        type = "weapon";
        name = "Bowie kés";
        reuseable = true;
        buyPrice = 350;
        sellPrice = buyPrice / 2;
        //healValue;
        isweapon = true;
        useinfight = true;
        weaponType = "semi-automatic pistol"; //öntöltő pisztoly
        sizeOfClip = 999999;
        condition = 60; //fegyverek meghibásodásának, elakadásának esélye
        damage = 3;
    }
}
