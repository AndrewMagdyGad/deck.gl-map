export interface Properties {
    reg_name: string;
    zone: string;
}

export interface PolygonGeometry {
    type: "Polygon";
    coordinates: Array<Array<Array<number>>>;
}

export interface MultiPolygonGeometry {
    type: "MultiPolygon";
    coordinates: Array<Array<Array<Array<number>>>>;
}

export interface Polygon {
    id: string;
    type: string;
    properties: Properties;
    geometry: PolygonGeometry | MultiPolygonGeometry;
}

export interface PolygonState {
    polygons: Polygon[];
    status: string;
    error: string | null;
}

export interface State {
    polygon: PolygonState;
}
