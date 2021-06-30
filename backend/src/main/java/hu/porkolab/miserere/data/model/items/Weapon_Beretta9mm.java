package hu.porkolab.miserere.data.model.items;

import mainModel.Weapon;

public class Weapon_Beretta9mm extends Weapon {

		public Weapon_Beretta9mm() {
			
			type = "weapon";
			name = "Beretta 92FS";
			reuseable = true;
			buyPrice = 350;
			sellPrice = buyPrice/2;
			//healValue;
			isweapon = true;
			useinfight = true;
			weaponType = "semi-automatic pistol"; //öntöltő pisztoly
			sizeOfClip = 15;
			condition = 60; //fegyverek meghibásodásának, elakadásának esélye
			damage = 5; //5 volt
			//damagemax = 12;
		}
	}

