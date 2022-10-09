export class Player {
  [k: string]: any;
  _id: number | string = '';
  protagonistHealthPoint: number = 100;
  playerAmmo: number = 15;
  currentWeaponName: string = 'Beretta 92FS';
  currentWeaponMinDamage: number = 2;
  currentWeaponMaxDamage: number = 6;
}
