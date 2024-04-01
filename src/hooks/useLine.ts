import { ref } from "vue";
import * as echarts from "echarts";

export const useLine = (setOption: (options: echarts.EChartsOption, opts?: echarts.SetOptionOpts) => void) => {
  // 点位数据
  const points = ref<Array<{ name: string; value: [number, number] }>>([]);
  // 连线数据
  const lines = ref<Array<{ coords: [[number, number], [number, number]] }>>([]);
  // 添加飞线回调
  const handleAddLine = (mapName: string) => {
    const { geoJSON } = echarts.getMap(mapName);
    // 取出当前地图所有的非空子级
    const cities = geoJSON.features
      .filter((f: Record<string, any>) => f.properties.name)
      .map((m: Record<string, any>) => {
        return {
          name: m.properties.name,
          value: m.properties.center,
        };
      });
    // 防止两个点重复
    let startIndex = 0;
    let endIndex = 0;
    while (startIndex === endIndex) {
      startIndex = Math.floor(Math.random() * cities.length);
      endIndex = Math.floor(Math.random() * cities.length);
    }
    const startAddress = cities[startIndex];
    const endAddress = cities[endIndex];
    // 起始点
    if (!points.value.find((f) => f.name === startAddress.name)) {
      points.value.push({ name: startAddress.name, value: startAddress.value });
    }
    // 结束点
    if (!points.value.find((f) => f.name === endAddress.name)) {
      points.value.push({ name: endAddress.name, value: endAddress.value });
    }
    // 连接线
    lines.value.push({ coords: [cities[startIndex].value, cities[endIndex].value] });
    setOption({ series: [{ data: points.value }, { data: lines.value }] });
  };
  // 清空飞线数据
  const resetLineData = () => {
    points.value = [];
    lines.value = [];
  };

  return {
    points,
    lines,
    handleAddLine,
    resetLineData,
  };
};
