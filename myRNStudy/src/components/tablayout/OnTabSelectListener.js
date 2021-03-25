import Tab from "./Tab";

interface OnTabSelectedListener {
    onTabSelected(tab: Tab);

    onTabUnselected(tab: Tab);

    onTabReselected(tab: Tab)
}

export default OnTabSelectedListener