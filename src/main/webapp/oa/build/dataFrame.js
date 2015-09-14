define(
		'bee-demo/dataFrame',
		[ 'event-dom', 'util', 'mypkg/jsonx', 'io', 'node' ],
		function(require, exports, module) {
			var DomEvent = require('event-dom'), Util = require('util'), IO = require('io'), Node = require('node'), JSONX = require('mypkg/jsonx');
			exports.tapelize = function(nodes, pressF, releaseF) {
				nodes.each(function(node) {
					DomEvent.on(node, 'click', function(ev) {
						nodes.each(function(_node) {
							if (!node.equals(_node)) {
								releaseF(_node);
							}
						})
						pressF(node);
					})
				})
			};
			exports.init = function(path) {
				var demoTable = new Node('<table>').addClass('demoTable');
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
				}, 'text')
				return demoTable;
			};
		});