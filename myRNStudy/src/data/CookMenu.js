export default class CookMenu {
  id: number;
  readTimes: number;
  cookTimes: number;
  userId: String;
  userNickName: String;
  mark: String;
  createTime: String;
  coverUrl: String;
  name: String;
  introduce: String;
  materialList: CookMaterialBean[];
  seasoningList: CookMaterialBean[];
  nutritionList: CookMaterialBean[];
  stepList: CookStepBean[];
}