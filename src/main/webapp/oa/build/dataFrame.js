define(
		'bee-demo/dataFrame',
		[ 'event-dom', 'util', 'mypkg/jsonx', 'io', 'node' ],
		function(require, exports, module) {
			var EventDom = require('event-dom'), Util = require('util'), IO = require('io'), Node = require('node'), JSONX = require('mypkg/jsonx');
			exports.init = function(path, cssName, frame) {
				var detail = frame.detail;
				var demoTable = new Node('<table>').addClass(cssName);
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
				IO.get(path, {}, function(data) {
					data = JSONX.decode(data);

					for (var i = 0; i < frame.capacity; i++) {
						for (var j = 0; j < detail.length; j++) {
							data.pageItems[i] == null ? dataTd[i][j].append('')
									: dataTd[i][j].append(detail[j]
											.handler(data.pageItems[i]))
						}
					}

					demoPageNum.html(data.pageNo);
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
					IO.get('index/testDemo?_content=json', {
						pageNo : parseInt(demoPageNum.text()) - 1
					}, function(data) {
						// console.log(data);
						data = JSONX.decode(data);
						data.pageItems[0] == null ? dataTd[0][0].html('')
								: dataTd[0][0].html(data.pageItems[0].title);
						data.pageItems[1] == null ? dataTd[1][0].html('')
								: dataTd[1][0].html(data.pageItems[1].title);
						data.pageItems[2] == null ? dataTd[2][0].html('')
								: dataTd[2][0].html(data.pageItems[2].title);
						data.pageItems[3] == null ? dataTd[3][0].html('')
								: dataTd[3][0].html(data.pageItems[3].title);
						data.pageItems[4] == null ? dataTd[4][0].html('')
								: dataTd[4][0].html(data.pageItems[4].title);
						demoPageNum.html(data.pageNo);
					}, 'text')
				})

				EventDom.on(demoPageForward, 'click', function(ev) {
					IO.get('index/testDemo?_content=json', {
						pageNo : parseInt(demoPageNum.text()) + 1
					}, function(data) {
						// console.log(data);
						data = JSONX.decode(data);
						data.pageItems[0] == null ? dataTd[0][0].html('')
								: dataTd[0][0].html(data.pageItems[0].title);
						data.pageItems[1] == null ? dataTd[1][0].html('')
								: dataTd[1][0].html(data.pageItems[1].title);
						data.pageItems[2] == null ? dataTd[2][0].html('')
								: dataTd[2][0].html(data.pageItems[2].title);
						data.pageItems[3] == null ? dataTd[3][0].html('')
								: dataTd[3][0].html(data.pageItems[3].title);
						data.pageItems[4] == null ? dataTd[4][0].html('')
								: dataTd[4][0].html(data.pageItems[4].title);
						demoPageNum.html(data.pageNo);
					}, 'text')
				})

				var ret = {
					dataTable : function() {
						return demoTable;
					},
					pageSpan : function() {
						return demoTableDescribe;
					}
				};
				return ret;
			}
		});