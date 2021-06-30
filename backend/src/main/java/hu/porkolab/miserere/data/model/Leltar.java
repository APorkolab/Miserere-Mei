package hu.porkolab.miserere.data.model;

import hu.porkolab.miserere.data.model.items.*;
import mainModel.Itemsum;


public class Leltar<playerItem> {
    Weapon_Beretta9mm beretta = new Weapon_Beretta9mm();
    Weapon_AK47 ak_47 = new Weapon_AK47();
    Item_HealingPotion potion = new Item_HealingPotion();
    Item_Empty empty = new Item_Empty();
    Item_MiningEquipment MiningEquipment = new Item_MiningEquipment();
    private Itemsum[] playerItem = new Itemsum[5];

    public void stringToClass(String name, int slotNumber) {

        switch (name) {
            case "Gyógyító főzet":
                playerItem[slotNumber] = potion;
                break;
            case "Beretta 92FS":
                playerItem[slotNumber] = beretta;
                break;
            case "":
                playerItem[slotNumber] = empty;
                break;
            case "Bányászfelszerelés":
                playerItem[slotNumber] = MiningEquipment;
                break;
            case "AK-47":
                playerItem[slotNumber] = ak_47;
                break;
        }
        playerItem[0] = beretta;
        playerItem[1] = potion;
        playerItem[2] = empty;
        playerItem[3] = empty;
        playerItem[4] = empty;
    }

    public Weapon_Beretta9mm getBeretta() {
        return beretta;
    }

    public void setBeretta(Weapon_Beretta9mm beretta) {
        this.beretta = beretta;
    }

    public Weapon_AK47 getAk_47() {
        return ak_47;
    }

    public void setAk_47(Weapon_AK47 ak_47) {
        this.ak_47 = ak_47;
    }

    public Item_HealingPotion getPotion() {
        return potion;
    }

    public void setPotion(Item_HealingPotion potion) {
        this.potion = potion;
    }

    public Item_Empty getEmpty() {
        return empty;
    }

    public void setEmpty(Item_Empty empty) {
        this.empty = empty;
    }

    public Item_MiningEquipment getMiningEquipment() {
        return MiningEquipment;
    }

    public void setMiningEquipment(Item_MiningEquipment miningEquipment) {
        MiningEquipment = miningEquipment;
    }

    public Itemsum[] getPlayerItem() {
        return playerItem;
    }

    public void setPlayerItem(Itemsum[] playerItem) {
        this.playerItem = playerItem;
    }
}