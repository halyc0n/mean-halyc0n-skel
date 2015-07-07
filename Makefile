Mocha = /home/pavel/.nvm/versions/node/v0.12.5/bin/mocha
Reporter = dot

test:
	@NODE_ENV=test $(Mocha) \
		--reporter $(Reporter)

test-w:
	@NODE_ENV=test $(Mocha) \
	--reporter $(Reporter) \
	--growl \
	--watch

.PHONY: test test-w
