format: node_modules
	npm exec -- prettier --write .

node_modules: package-lock.json
	npm ci
