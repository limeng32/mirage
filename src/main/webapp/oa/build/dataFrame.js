define(
		'bee-demo/dataFrame',
		[ 'event-dom', 'util', 'mypkg/jsonx', 'io', 'node' ],
		function(require, exports, module) {
			var EventDom = require('event-dom'), Util = require('util'), IO = require('io'), Node = require('node'), JSONX = require('mypkg/jsonx');
			exports.init = function(path, filter, frame, cssName) {
				var detail = frame.detail;
				var demoTable = new Node('<table>').addClass(cssName);
				var queryButton = new Node('<div>').unselectable().addClass(
						cssName + '-QB');
				var dataTr = new Array(frame.capacity);
				var dataTd = new Array(frame.capacity);
				var titleTr = new Node('<tr>');
				var titleTd = new Array(detail.length);

				demoTable.append(titleTr);
				for (var i = 0; i < detail.length; i++) {
					titleTd[i] = new Node('<td>');
					titleTr.append(titleTd[i].html(detail[i].title));
				}
				for (var i = 0; i < frame.capacity; i++) {
					dataTr[i] = new Node('<tr>');
					demoTable.append(dataTr[i]);
					dataTd[i] = new Array(frame.detail.length);
					for (var j = 0; j < frame.detail.length; j++) {
						dataTd[i][j] = new Node('<td>');
						dataTr[i].append(dataTd[i][j]);
					}
				}
				var _query = function() {
					var _filter = {};
					if (Node.one('#title').val() != '') {
						_filter.titleLike = Node.one('#title').val();
					}
					_filter.pageSize = frame.capacity;
					IO.post(path, _filter, function(data) {
						data = JSONX.decode(data);
						_render(data);
					}, 'text')
				}
				var _render = function(data) {
					for (var i = 0; i < frame.capacity; i++) {
						for (var j = 0; j < detail.length; j++) {
							data.pageItems[i] == null ? dataTd[i][j].html('')
									: dataTd[i][j].html(detail[j]
											.handler(data.pageItems[i]))
						}
					}
					demoPageNum.html(data.pageNo);
				}
				var _forward = function() {
					var _filter = {};
					_filter.pageNo = (parseInt(demoPageNum.text()) + 1);
					if (Node.one('#title').val() != '') {
						_filter.titleLike = Node.one('#title').val();
					}
					_filter.pageSize = frame.capacity;
					IO.post(path, _filter, function(data) {
						data = JSONX.decode(data);
						_render(data);
					}, 'text')
				}
				var _backward = function() {
					var _filter = {};
					_filter.pageNo = (parseInt(demoPageNum.text()) - 1);
					if (Node.one('#title').val() != '') {
						_filter.titleLike = Node.one('#title').val();
					}
					_filter.pageSize = frame.capacity;
					IO.post(path, _filter, function(data) {
						data = JSONX.decode(data);
						_render(data);
					}, 'text')
				}

				filter.pageSize = frame.capacity;
				IO.post(path, filter, function(data) {
					data = JSONX.decode(data);
					_render(data);
				}, 'text')

				var demoPageNum = new Node('<span>').addClass(cssName + '-PN');
				var demoPageBackward = new Node('<span>').addClass(
						cssName + '-PB').append("上一页");
				var demoPageForward = new Node('<span>').addClass(
						cssName + '-PF').append("下一页");
				var demoTableDescribe = new Node('<div>').addClass(
						cssName + '-PSpan').append(demoPageBackward)
						.append("第").append(demoPageNum).append("页").append(
								demoPageForward);

				EventDom.on(demoPageBackward, 'click', function(ev) {
					_backward();
				})

				EventDom.on(demoPageForward, 'click', function(ev) {
					_forward();
				})

				EventDom.on(queryButton, 'click', function(ev) {
					_query();
				})

				var ret = {
					dataTable : function() {
						return demoTable;
					},
					pageSpan : function() {
						return demoTableDescribe;
					},
					queryButton : function() {
						return queryButton;
					},
					query : function() {
						_query();
					},
					forward : function() {
						_forward();
					},
					backward : function() {
						_backward();
					}
				};
				return ret;
			}
		});