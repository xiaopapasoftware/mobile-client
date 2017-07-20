function localStorageFactory() {
	var storage = window.localStorage;
	return {
		getItem: function(key) {
			return storage.getItem(key);
		},

		getJsonValue: function(key) {
			var value = this.getItem(key);
			if(!angular.isUndefined(value)) {
				return JSON.parse(value);
			}
		},
		setItem: function(key, value) {
			try {
				storage.setItem(key, value);
			} catch(e) {
				if(e.name == 'QuotaExceededError') {
					storage.clear();
					storage.setItem(key, value);
				}
			}

		},

		setJsonItem: function(key, value) {
			this.setItem(key, JSON.stringify(value));
		},

		removeItem: function(key) {
			storage.removeItem(key);
		},

		clear: function() {
			storage.clear();
		},

		getLength: function() {
			return storage.length;
		}

	}
}