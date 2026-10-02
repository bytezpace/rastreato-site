PORT ?= 8080

.PHONY: start

start:
	@echo "Serving on http://localhost:$(PORT)"
	@python3 -m http.server $(PORT) --bind 127.0.0.1
