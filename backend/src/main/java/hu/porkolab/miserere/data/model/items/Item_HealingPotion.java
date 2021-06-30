package hu.porkolab.miserere.data.model.items;

import mainModel.Itemsum;

public class Item_HealingPotion extends Itemsum {
	
	public Item_HealingPotion(){
		type = "healing_item";
		reuseable = false;
		name = "Gyógyító főzet";
		buyPrice = 25;
		healValue = 25; 
		sellPrice = buyPrice/2;
		useMessage = "Használtál egy gyógyítő főzetet.\n A 25 százaléknyi életerő visszaállítva.";
	}

}
