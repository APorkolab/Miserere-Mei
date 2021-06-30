package hu.porkolab.miserere.data.model.items;

import mainModel.Weapon;

public class Weapon_AK47 extends Weapon {

	public Weapon_AK47() {
		
		type = "weapon";
		name = "AK-47";
		reuseable = true;
		buyPrice = 600;
		sellPrice = buyPrice/2;
		//healValue;
		isweapon = true;
		useinfight = true;
		weaponType = "assault rifle"; //gépkarabély
		sizeOfClip = 60;
		condition = 90; //fegyverek meghibásodásának, elakadásának esélye
		damage = 11;
		//damagemax = 25;
	}
}
