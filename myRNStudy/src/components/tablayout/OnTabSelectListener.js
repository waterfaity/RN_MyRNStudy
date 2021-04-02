import Tab from './Tab';

interface OnTabSelectedListener {
  onTabSelected(tab: Tab, pos: number);

  onTabUnselected(tab: Tab);

  onTabReselected(tab: Tab)
}

export default OnTabSelectedListener;