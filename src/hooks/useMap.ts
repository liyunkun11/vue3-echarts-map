import { reactive } from "vue";
import * as echarts from "echarts";
import { getGeojson } from "@/apis/index";

export const useMap = (
  setOption: (options: echarts.EChartsOption, opts?: echarts.SetOptionOpts) => void,
  resetLineData: () => void,
) => {
  // 当前地图信息
  const currentMap = reactive({
    name: "中国",
    adcode: 100000,
    navList: [{ name: "中国", adcode: 100000, level: "province" }],
  });
  // 地区code映射
  const adcodeMap: Record<string, { adcode: number; level: string }> = {};
  // 生成地图code映射
  const genAdcodeMap = (features: any[]) => {
    features.forEach((feature) => {
      const { name, adcode, level } = feature.properties;
      adcodeMap[name] = { adcode, level };
    });
  };
  // 注册地图
  const registerMap = async (mapInfo?: { name: string; adcode: number }) => {
    const _mapInfo = mapInfo ?? currentMap;
    if (echarts.getMap(_mapInfo.name)) return;
    await getGeojson(_mapInfo.adcode).then((geoJSON: any) => {
      genAdcodeMap(geoJSON.features);
      echarts.registerMap(_mapInfo.name, geoJSON);
    });
  };
  // 获取地图信息
  const getMapInfo = (name?: string) => {
    const _name = name ?? currentMap.name;
    return echarts.getMap(_name);
  };
  // 地图点击回调
  const handleMapClick = (params: any) => {
    const { adcode, level } = adcodeMap[params.name];
    if (level === "district") return;
    resetLineData();
    registerMap({ name: params.name, adcode }).then(() => {
      currentMap.name = params.name;
      currentMap.adcode = adcode;
      currentMap.navList.push({ name: params.name, adcode, level });
      setOption({ geo: { map: params.name, zoom: 1, center: undefined }, series: [{ data: [] }, { data: [] }] });
    });
  };
  // 地图层级切换回调
  const handleLevelChange = (params: (typeof currentMap.navList)[number], index: number) => {
    currentMap.navList.splice(index + 1, 9);
    currentMap.name = params.name;
    currentMap.adcode = params.adcode;
    resetLineData();
    setOption({ geo: { map: params.name, zoom: 1, center: undefined }, series: [{ data: [] }, { data: [] }] });
  };

  return {
    currentMap,
    adcodeMap,
    registerMap,
    getMapInfo,
    handleMapClick,
    handleLevelChange,
  };
};
