import { useEffect, useState } from "react";
import DeckGL from "deck.gl";
import { StaticMap } from "react-map-gl";
import { PolygonLayer } from "@deck.gl/layers";
import { useSelector } from "react-redux";
import { State, Polygon } from "../interfaces";

export default function DeckGLMap() {
    const [layers, setLayer] = useState<any>([]);
    const polygons = useSelector((state: State) => state.polygon.polygons);

    useEffect(() => {
        const tempLayers: any[] = [];
        polygons.forEach((polygon: Polygon, index: number, arr: Polygon[]) => {
            if (polygon.geometry.type === "Polygon") {
                const current = new PolygonLayer({
                    id: `${polygon.id}-${index}`,
                    data: arr,
                    pickable: true,
                    stroked: true,
                    filled: true,
                    wireframe: true,
                    lineWidthMinPixels: 1,
                    getLineWidth: 1,
                    getPolygon: (p: Polygon) => p.geometry.coordinates,
                    getFillColor: () => [118, 89, 94, 255],
                });
                tempLayers.push(current);
            } else if (polygon.geometry.type === "MultiPolygon") {
                polygon.geometry.coordinates.forEach(
                    (item: number[][][], index: number) => {
                        const current = new PolygonLayer({
                            id: `${polygon.id}-${index}`,
                            data: arr,
                            pickable: true,
                            stroked: true,
                            filled: true,
                            wireframe: true,
                            lineWidthMinPixels: 1,
                            getLineWidth: 1,
                            getPolygon: (p: Polygon) =>
                                p.geometry.coordinates[index],
                            getFillColor: () => [118, 89, 94, 255],
                        });
                        tempLayers.push(current);
                    }
                );
            }
        });
        setLayer([...tempLayers]);
    }, [polygons]);

    return (
        <DeckGL
            style={{ position: "relative" }}
            initialViewState={{
                longitude: 12.5674,
                latitude: 41.8719,
                zoom: 4.5,
            }}
            height="100%"
            width="100%"
            layers={layers}
            controller={true}
            getTooltip={({ object }: { object: Polygon }) =>
                object &&
                `Region: ${object.properties.reg_name}\nzone: ${object.properties.zone}`
            }
        >
            <StaticMap
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            />
        </DeckGL>
    );
}
