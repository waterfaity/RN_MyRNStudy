class CookStepBean {
  id: number;
  title: String;
  introduce: String;
  potType: String;
  potName: String;
  duration: number;
  cookTimes: number;
  // 'COOK','WEIGH','SHOW'
  stepType: String;
  temperature: number;
  rotateDirection: number;
  rotationalSpeed: number;
  gear: number;
  createTime: String;
  imgUrl: String;
}

const STEP_TYPE = {
  COOK: 'COOK',
  WEIGHT: 'WEIGHT',
  SHOW: 'SHOW'
};
