interface Geometry {
  type: string;
  coordinates: Array<any>;
}

interface Properties {
  reg_name: string;
  zone: string;
}

export interface Polygon {
  id: string;
  type: string;
  geometry: Geometry;
  properties: Properties;
}
