define(
		'bee-demo/article/article',
		[ "node", "./article-view", 'button', 'io', 'json', 'menu',
				'separator', 'util', 'bee-demo/buttonPlus', 'event-dom',
				'mypkg/jsonx', "kg/xtemplate/4.2.0/runtime" ],
		function(require, exports, module) {
			var $ = require('node').all, Node = require('node'), Util = require('util'), Menu = require('menu'), Separator = require('separator'), IO = require('io'), JSON = require('json'), BP = require('bee-demo/buttonPlus'), JSONX = require('mypkg/jsonx'), EventDom = require('event-dom'), XTemplate = require("kg/xtemplate/4.2.0/runtime");
			module.exports = {
				init : function() {
					var BG = new Node('<div>').addClass('middleBanner');
					var sorterOfTime = new Node('<div>').unselectable().append(
							'到达时间').addClass('oa-sorter').addClass('ks-button')
							.addClass('ks-button-mini').append(
									new Node('<img>').prop({
										src : 'image/arrowDownUnuse.png'
									}).addClass('oa-sorter-arrow'));
					var sorterOfUrgency = new Node('<div>').unselectable()
							.append('缓急').addClass('oa-sorter').addClass(
									'ks-button').addClass('ks-button-mini')
							.append(new Node('<img>').prop({
								src : 'image/arrowDownUnuse.png'
							}).addClass('oa-sorter-arrow'));
					var sorterOfCustom = new Node('<div>').unselectable()
							.append('自定义').addClass('oa-sorter').addClass(
									'ks-button').addClass('ks-button-mini')
							.append(new Node('<img>').prop({
								src : 'image/arrowDownUnuse.png'
							}).addClass('oa-sorter-arrow'));
					$('article').append(BG);
					var sorterPanel = new Node('<div>').addClass('sorterPanel')
							.addClass('ks-button-group');
					BG.append(new Node('<div>').addClass('navigatorSpan').prop(
							{
								id : 'navigatorContainer'
							}));
					BG.append(
							new Node('<div>').addClass('bannerSeparatorSpan')
									.append(new Node('<img>').prop({
										src : 'image/bannerSeparator.png'
									}).addClass('bannerSeparator'))).append(
							new Node('<div>').addClass('sorterPanelLeft')
									.append('按')).append(sorterPanel).append(
							new Node('<div>').addClass('sorterPanelRight')
									.append('排序'));
					sorterPanel.append(sorterOfTime).append(sorterOfUrgency)
							.append(sorterOfCustom);
					BP.tapelize(sorterPanel.children(), function(n) {
						n.addClass('ks-button-pressed');
						var src = n.one('.oa-sorter-arrow').prop('src');
						if (Util.endsWith(src, 'Unuse.png')) {
							n.one('.oa-sorter-arrow').prop('src',
									src.substring(0, src.length - 9) + '.png');
						} else {
							if (Util.endsWith(src, 'Down.png')) {
								n.one('.oa-sorter-arrow').prop(
										'src',
										src.substring(0, src.length - 8)
												+ 'Up.png');
							} else if (Util.endsWith(src, 'Up.png')) {
								n.one('.oa-sorter-arrow').prop(
										'src',
										src.substring(0, src.length - 6)
												+ 'Down.png');
							}
						}
					}, function(n) {
						n.removeClass('ks-button-pressed');
						var src = n.one('.oa-sorter-arrow').prop('src');
						if (!Util.endsWith(src, 'Unuse.png')) {
							n.one('.oa-sorter-arrow').prop(
									'src',
									src.substring(0, src.length - 4)
											+ 'Unuse.png');
						}
					});
					BP.nOrders(sorterOfTime, [ function(n) {
					}, function(n) {
					} ]);

					BP.nOrders(sorterOfUrgency, [ function(n) {
					}, function(n) {
					} ]);

					BP.nOrders(sorterOfCustom, [ function(n) {
					}, function(n) {
					} ]);

					IO.get('menuData.json', {}, function(data) {
						var sb = buildMenu(data, {
							offset : [ 5, 36 ],
							points : [ 'tl', 'tl' ]
						});
						var b = new Menu.SubMenu({
							prefixCls : "nav-",
							content : "<span class='title'>首页</span>",
							menu : sb
						});
						var menu = new Menu({
							prefixCls : "nav-",
							width : 90,
							elCls : "horizonal",
							render : '#navigatorContainer',
							children : [ b ]
						});

						menu.render();

						menu.on("click", function(e) {
							console.log(e.target.get("content"));
							var content = e.target.get("content");
							if (Util.startsWith(content, '<a>')
									&& Util.endsWith(content, '</a>')) {
								content = content.substring(3, content.length);
								content = content.substring(0,
										content.length - 4);
								b.set('content', "<span class='title'>"
										+ content + "</span>");
							}
						});

					}, 'json');
					var buildMenu = function(data, align) {
						var sb = new Menu.PopupMenu({
							prefixCls : "nav-",
							autoHideOnMouseLeave : true,
							width : 150
						});
						if (align != null) {
							sb.set('align', align);
						}
						for ( var o in data) {
							var item;
							if (data[o].sub != null) {
								var sb2 = buildMenu(data[o].sub);
								item = new Menu.SubMenu({
									prefixCls : "nav-",
									content : "<a>" + data[o].content + "</a>",
									menu : sb2
								});
							} else {
								item = new Menu.RadioItem({
									prefixCls : "nav-",
									content : "<a>" + data[o].content + "</a>"
								});
							}
							sb.addChild(item);
						}
						return sb;
					}
					IO.get('index/testDemo?_content=json', {}, function(data) {
						//console.log(data);
						data = JSONX.decode(data);
						data.pageItems[0] == null ? demoTd.append("") : demoTd
								.append(data.pageItems[0].title);
						data.pageItems[1] == null ? demoTd2.append("")
								: demoTd2.append(data.pageItems[1].title);
						data.pageItems[2] == null ? demoTd3.append("")
								: demoTd3.append(data.pageItems[2].title);
						data.pageItems[3] == null ? demoTd4.append("")
								: demoTd4.append(data.pageItems[3].title);
						data.pageItems[4] == null ? demoTd5.append("")
								: demoTd5.append(data.pageItems[4].title);
						demoPageNum.append(data.pageNo);
					}, 'text')
					var demoTable = new Node('<table>').addClass('demoTable');
					var demoTr = new Node('<tr>'), demoTr2 = new Node('<tr>'), demoTr3 = new Node(
							'<tr>'), demoTr4 = new Node('<tr>'), demoTr5 = new Node(
							'<tr>');
					var demoTd = new Node('<td>'), demoTd2 = new Node('<td>'), demoTd3 = new Node(
							'<td>'), demoTd4 = new Node('<td>'), demoTd5 = new Node(
							'<td>');
					demoTable.append(demoTr.append(demoTd)).append(
							demoTr2.append(demoTd2)).append(
							demoTr3.append(demoTd3)).append(
							demoTr4.append(demoTd4)).append(
							demoTr5.append(demoTd5));
					$('article').append(demoTable);
					var demoPageNum = new Node('<span>').addClass('demoPage');
					var demoPageBackward = new Node('<span>').addClass(
							'demoPage').append("上一页");
					var demoPageForward = new Node('<span>').addClass(
							'demoPage').append("下一页");
					var demoTableDescribe = new Node('<div>').addClass(
							'demoTableDescribe').append(demoPageBackward)
							.append("第").append(demoPageNum).append("页")
							.append(demoPageForward);
					$('article').append(demoTableDescribe);
					EventDom.on(demoPageBackward, 'click', function(ev) {
						IO.get('index/testDemo?_content=json', {
							pageNo : parseInt(demoPageNum.text()) - 1
						}, function(data) {
							//console.log(data);
							data = JSONX.decode(data);
							data.pageItems[0] == null ? demoTd.html("")
									: demoTd.html(data.pageItems[0].title);
							data.pageItems[1] == null ? demoTd2.html("")
									: demoTd2.html(data.pageItems[1].title);
							data.pageItems[2] == null ? demoTd3.html("")
									: demoTd3.html(data.pageItems[2].title);
							data.pageItems[3] == null ? demoTd4.html("")
									: demoTd4.html(data.pageItems[3].title);
							data.pageItems[4] == null ? demoTd5.html("")
									: demoTd5.html(data.pageItems[4].title);
							demoPageNum.html(data.pageNo);
						}, 'text')
					})
					EventDom.on(demoPageForward, 'click', function(ev) {
						IO.get('index/testDemo?_content=json', {
							pageNo : parseInt(demoPageNum.text()) + 1
						}, function(data) {
							//console.log(data);
							data = JSONX.decode(data);
							data.pageItems[0] == null ? demoTd.html("")
									: demoTd.html(data.pageItems[0].title);
							data.pageItems[1] == null ? demoTd2.html("")
									: demoTd2.html(data.pageItems[1].title);
							data.pageItems[2] == null ? demoTd3.html("")
									: demoTd3.html(data.pageItems[2].title);
							data.pageItems[3] == null ? demoTd4.html("")
									: demoTd4.html(data.pageItems[3].title);
							data.pageItems[4] == null ? demoTd5.html("")
									: demoTd5.html(data.pageItems[4].title);
							demoPageNum.html(data.pageNo);
						}, 'text')
					})
				}
			}
		});