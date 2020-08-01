CREATE TABLE towers (
radio text,
mcc smallint,
net integer,
area integer,
cell integer,
unit smallint,
long double precision,
lat double precision,
range integer,
samples smallint,
changeable smallint,
created interval,
updated interval,
averagesignal smallint,
geom geometry
);
ALTER TABLE towers ADD COLUMN geom geometry(Point, 4326);
UPDATE towers SET geom = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326);
SELECT json_build_object('type', 'FeatureCollection','crs',  json_build_object('type','name','properties', json_build_object('name','EPSG:4326')),'features', json_agg(json_build_object('type','Feature','geometry',ST_AsGeoJSON(geom)::json,'properties', json_build_object('radio', radio,'mcc',mcc,'net',net,'area',area,'cell', cell,'long', long,'lat',lat,'range',range)))) FROM towers WHERE geom && ST_SetSRID('BOX3D("+req.body.west+" "+req.body.south+","+req.body.east+" "+req.body.north+")'::box3d,4326)
