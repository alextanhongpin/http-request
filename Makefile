include .env
-include .env.auth
export

httpyac := ./node_modules/.bin/httpyac

.PHONY: rest
rest:
	@$(httpyac) rest/**/*.{http,md} --all


help:
	@$(httpyac) send --help


server:
	@npm start
