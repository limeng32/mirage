define(
		'bee-demo/dataFrame',
		[ 'event-dom', 'util', 'mypkg/jsonx', 'io', 'node' ],
		function(require, exports, module) {
			var EventDom = require('event-dom'), Util = require('util'), IO = require('io'), Node = require('node'), JSONX = require('mypkg/jsonx');
			exports.init = function(path, cssName) {
				var demoTable = new Node('<table>').addClass(cssName);
				var demoTr = new Node('<tr>'), demoTr2 = new Node('<tr>'), demoTr3 = new Node(
						'<tr>'), demoTr4 = new Node('<tr>'), demoTr5 = new Node(
						'<tr>');
				var demoTd = new Node('<td>'), demoTd2 = new Node('<td>'), demoTd3 = new Node(
						'<td>'), demoTd4 = new Node('<td>'), demoTd5 = new Node(
						'<td>');
				demoTable.append(demoTr.append(demoTd)).append(
						demoTr2.append(demoTd2))
						.append(demoTr3.append(demoTd3)).append(
								demoTr4.append(demoTd4)).append(
								demoTr5.append(demoTd5));
				IO.get(path, {}, function(data) {
					data = JSONX.decode(data);
					data.pageItems[0] == null ? demoTd.append("") : demoTd
							.append(data.pageItems[0].title);
					data.pageItems[1] == null ? demoTd2.append("") : demoTd2
							.append(data.pageItems[1].title);
					data.pageItems[2] == null ? demoTd3.append("") : demoTd3
							.append(data.pageItems[2].title);
					data.pageItems[3] == null ? demoTd4.append("") : demoTd4
							.append(data.pageItems[3].title);
					data.pageItems[4] == null ? demoTd5.append("") : demoTd5
							.append(data.pageItems[4].title);
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
						data.pageItems[0] == null ? demoTd.html("") : demoTd
								.html(data.pageItems[0].title);
						data.pageItems[1] == null ? demoTd2.html("") : demoTd2
								.html(data.pageItems[1].title);
						data.pageItems[2] == null ? demoTd3.html("") : demoTd3
								.html(data.pageItems[2].title);
						data.pageItems[3] == null ? demoTd4.html("") : demoTd4
								.html(data.pageItems[3].title);
						data.pageItems[4] == null ? demoTd5.html("") : demoTd5
								.html(data.pageItems[4].title);
						demoPageNum.html(data.pageNo);
					}, 'text')
				})

				EventDom.on(demoPageForward, 'click', function(ev) {
					IO.get('index/testDemo?_content=json', {
						pageNo : parseInt(demoPageNum.text()) + 1
					}, function(data) {
						// console.log(data);
						data = JSONX.decode(data);
						data.pageItems[0] == null ? demoTd.html("") : demoTd
								.html(data.pageItems[0].title);
						data.pageItems[1] == null ? demoTd2.html("") : demoTd2
								.html(data.pageItems[1].title);
						data.pageItems[2] == null ? demoTd3.html("") : demoTd3
								.html(data.pageItems[2].title);
						data.pageItems[3] == null ? demoTd4.html("") : demoTd4
								.html(data.pageItems[3].title);
						data.pageItems[4] == null ? demoTd5.html("") : demoTd5
								.html(data.pageItems[4].title);
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