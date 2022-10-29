format: node_modules
	npm exec -- prettier --write \"src/{**/,}*.{js,ts,tsx}\"

node_modules: package-lock.json
	npm ci
