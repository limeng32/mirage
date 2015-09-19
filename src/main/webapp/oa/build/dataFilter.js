define(
		'bee-demo/dataFilter',
		[ 'event-dom', 'util', 'mypkg/jsonx', 'io', 'node' ],
		function(require, exports, module) {
			var EventDom = require('event-dom'), Util = require('util'), IO = require('io'), Node = require('node'), JSONX = require('mypkg/jsonx');
			exports.init = function() {
				var ret = {};
				var _filter = function() {
					return ret;
				}
				var _add = function(condition) {
					var _temp = condition.handler(condition.node);
					if (_temp != null) {
						ret[condition.id] = condition.handler(condition.node);
					}
				}
				var _ret = {
					filter : function() {
						return _filter();
					},
					add : function(condition) {
						_add(condition);
					}
				};
				return _ret;
			}
		});