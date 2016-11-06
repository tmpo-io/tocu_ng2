

clean:
	rm -r tmp
	rm dist/build.js

build:
	cp -r src tmp
	rm tmp/main.ts
	cp tmp/main.aot.ts tmp/main.ts
	node_modules/.bin/node-sass tmp/styles.scss > tmp/styles.css
	rm tmp/styles.scss
	rm -r tmp/scss
	node_modules/.bin/node-sass tmp/ --output tmp
	find tmp -name "*.scss" -type f -delete
	find tmp -name "*.css" -exec rename 's/css/scss/' '{}' \;
	node_modules/.bin/ngc -p tsconfig.aot.json

rollup:
	node rollup2.js

