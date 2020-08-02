CREATE TABLE btowers(
  LSA text,
  District text,
  Latitude double precision,
  Longitude double precision,
  Sitetype text
);

ALTER TABLE btowers ADD COLUMN geom geometry(Point, 4326);
UPDATE btowers SET geom = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326);

SELECT *,ST_Distance(geom,'SRID=4326;POINT(77.30667114257812 28.423448144417215)'::geometry) 
FROM btowers
ORDER BY
btowers.geom <->'SRID=4326;POINT(77.30667114257812 28.423448144417215)'::geometry
LIMIT 5;


SELECT json_build_object('type', 'FeatureCollection','crs',  json_build_object('type','name','properties', json_build_object('name','EPSG:4326')),'features', json_agg(json_build_object('type','Feature','geometry',ST_AsGeoJSON(geom)::json,'properties', json_build_object('LSA',lsa,'District',district,'latitude',latitude,'longitude',longitude,'Sitetype', sitetype)))) FROM ( select * from btowers ORDER BY geom <->'SRID=4326;POINT(77.30667114257812 28.423448144417215)'::geometry LIMIT 5) as InnerQuery

