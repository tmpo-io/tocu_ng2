
ramfs:
	rm -r tmp
	mkdir tmp
	sudo mount -t tmpfs -o size=512m tmpfs ./tmp


clean:
	rm -r tmp/*
	rm dist/build.js

build:
	cp -r src/* tmp/
	rm tmp/main.ts
	cp tmp/main.aot.ts tmp/main.ts
	node_modules/.bin/node-sass --include-path node_modules tmp/styles.scss > tmp/styles.css
	rm tmp/styles.scss
	rm -r tmp/scss
	node_modules/.bin/node-sass tmp/ --output tmp --include-path node_modules
	find tmp -name "*.scss" -type f -delete
	find tmp -name "*.css" -exec rename 's/css/scss/' '{}' \;
	node_modules/.bin/concurrently "node_modules/.bin/ngc -p tsconfig.aot.json"

rollup:
	node_modules/.bin/rollup -c rollup.js
	cp node_modules/howler/dist/howler.min.js dist/howler.min.js

closure:
	java -jar node_modules/google-closure-compiler/compiler.jar \
		--compilation_level SIMPLE --js dist/build.js --js_output_file dist/bundle.comp.js
