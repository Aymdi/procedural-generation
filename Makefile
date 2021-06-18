

test: test_polygons test_perlin


test_polygons:
	cd ./src/generators/polygons; npx jest --coverage
