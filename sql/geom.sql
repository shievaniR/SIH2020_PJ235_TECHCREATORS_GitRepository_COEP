CREATE TABLE btowers(
  LSA text,
  District text,
  Latitude double precision,
  Longitude double precision,
  Sitetype text
);

ALTER TABLE btowers ADD COLUMN geom geometry(Point, 4326);
UPDATE btowers SET geom = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326);

SELECT json_build_object('type', 'FeatureCollection','crs',  json_build_object('type','name','properties', json_build_object('name','EPSG:4326')),'features', json_agg(json_build_object('type','Feature','geometry',ST_AsGeoJSON(geom)::json,'properties', json_build_object('LSA',lsa,'District',district,'latitude',latitude,'longitude',longitude,'Sitetype', sitetype)))) FROM btowers;
