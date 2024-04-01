import request from "@/request/index";

// 获取Geojson
export const getGeojson = async (code: number) => {
  return await request.get(`/areas_v3/bound/geojson?code=${code}_full`);
};
