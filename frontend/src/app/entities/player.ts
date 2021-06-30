export class Player {
    protagonistHealthPoint: number;
    playerAmmo: number;
    currentWeaponName: string;

    constructor(json?: any) {
        if (json !== undefined && json != null) {
            this.protagonistHealthPoint = json.protagonistHealthPoint;
            this.playerAmmo = json.playerAmmo;
            this.currentWeaponName = json.currentWeaponName;
        }
    }
}
