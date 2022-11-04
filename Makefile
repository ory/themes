format: .bin/ory node_modules  # formats the source code
	.bin/ory dev headers copyright --type=open-source --exclude=rollup.config.js --exclude=css/express.d.ts
	npm exec -- prettier --write .

help:  # prints all make targets
	cat Makefile | grep '^[^ ]*:' | grep -v '^\.bin/' | grep -v '.SILENT:' | grep -v '^node_modules:' | grep -v help | sed 's/:.*#/#/' | column -s "#" -t

.bin/ory: Makefile
	curl https://raw.githubusercontent.com/ory/meta/master/install.sh | bash -s -- -b .bin ory v0.1.48
	touch .bin/ory

node_modules: package-lock.json
	npm ci
	touch node_modules


.SILENT:
.DEFAULT_GOAL := help
