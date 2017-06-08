/**
 * 聊天室逻辑
 */
import util from '../../../components/util.js';
var page = {
	init: function() {
		var config = window.config;
		if (!config || !config.appkey || (!config.roomid && !config.roomPullUrl) || !config.login) {
			alert('链接不合法');
			return;
		}
		var options = this.options = {
			appKey: config.appkey,
			id: config.roomid,
			pullUrl: config.roomPullUrl,
			url: config.login
		}
		this.initNode();
		this.initLoginAndRegistNode();
		//this.initEmoji();
		this.initEvt();
		//this.initPlayer();
		if (util.readCookie('vAccount')) {
			this.options.account = util.readCookie('vAccount');
			this.options.token = util.readCookie('vToken');
			this.options.sid = util.readCookie('sid');
			this.linkChartRoom();
		} else {
			this.linkChartRoom(true);
		}
	},
	/**
	 * 连接聊天室和直播间
	 * @param  {Bool} init 是否是游客模式登录  ture: 游客模式
	 */
	linkChartRoom: function(init) {
		this.link = window.link = new LinkRoom(this, this.options, init);
	},
	/**
	 * sdk连接后初始化页面
	 * @param  {JSON} data   聊天室的信息
	 * @param  {Obj} obj     聊天室对象
	 */
	initReady: function(data, obj) {
		this.initNode();
		this.link = obj;
		var chatroom = data.chatroom,
			member = data.member,
			total;
		//聊天室信息
		obj.setState({
			title: chatroom.name
		});
		obj.getChatroomMembersInfo([chatroom.creator], function(err, item) {
			console.info('房间信息', err, item, chatroom.creator)
			//设置昵称
			obj.setState({
				roomCreator: item.members[0].nick
			});
			//设置头像
			if (item.members[0].avatar) {
				obj.setState({
					avatar: item.members[0].avatar
				});
			}
		})
		if (chatroom.onlineMemberNum > 10000) {
			var value = new Number(chatroom.onlineMemberNum / 10000);
			total = value.toFixed(1) + "万";
		} else {
			total = chatroom.onlineMemberNum;
		}
		//人数
		obj.setState({
			num: total
		});
	},
	initNode: function() {
		///this.$customBtn =$("#customBtn");
		this.$chat = $(".j-chat");
		this.$showEmoji = $("#emoji");
		this.$sendText = $("#sentText");
		this.$editText = $("#editText");
	},
	initEvt: function() {
		var that = this;
		this.$sendText.on("click", this.sendText.bind(this));
		this.$editText.keydown(function(e) {
			if (e.ctrlKey && e.keyCode == 13) {
				that.sendText();
			}
		});
		///this.$customBtn.on("click",this.showLaowang.bind(this));
		///this.$showEmoji.on('click', this.showEmoji.bind(this)); 
	},
	//目前图片写死代替
	initPlayer: function() {
		console.info(987111)
		new VideoPlayer();
	},
	initEmoji: function() {
		var that = this,
			emojiConfig = {
				'emojiList': emojiList, //普通表情
				'width': 350,
				'height': 300,
				'imgpath': './images/',
				'callback': function(result) {
					that.cbShowEmoji(result);
				}
			}
		this.$emNode = new CEmojiEngine($('#emojiTag')[0], emojiConfig);
	},

	/***************登录注册相关,demo逻辑跟能力无关 不要就删********************/

	initLoginAndRegistNode: function() {
		this.$showLogin = $("#showLogin");
		this.$loginView = $("#loginView");
		this.$loginBtn = $("#loginBtn");
		this.$registBtn = $("#registBtn");
		this.$loginAccount = $("#loginView .j-account");
		this.$loginPassword = $("#loginView .j-password");
		//一个登录 一个注册错误提示
		this.$errorMsg = $("#loginView .j-errmsg");
		this.$errorMsg2 = $("#loginView .j-errmsg2");
		this.$registAccount = $("#loginView .j-account2");
		this.$registPassword = $("#loginView .j-password2");
		this.$registNick = $("#loginView .j-nick");
		//event
		this.$showLogin.on('click', this.showLoginView.bind(this));
		$("#loginView .j-closeView").on('click', this.hideLoginView.bind(this));
		this.$loginBtn.on('click', this.doLogin.bind(this));
		this.$registBtn.on('click', this.validateRegist.bind(this));

		$("#loginView .j-showRegist").on("click", function() {
			$("#loginView .j-login").addClass("f-dn");
			$("#loginView .j-regist").removeClass("f-dn");
		});
		$("#loginView .j-showLogin").on("click", function() {
			$("#loginView .j-login").removeClass("f-dn");
			$("#loginView .j-regist").addClass("f-dn");
		});
		$("#logout").on("click", this.doLogout.bind(this));
	},

	doLogin: function() {
		if (this.validateLogin()) {
			this.linkChartRoom();
		}
	},
	doLogout: function() {
		this.link.room.disconnect();
		util.delCookie('vAccount');
		util.delCookie('vToken');
		util.delCookie('sid');
		$("#loginStatus").removeClass("f-dn");

	},
	validateLogin: function() {
		this.$errorMsg.addClass('f-dn');
		var account = this.$loginAccount.val().trim(),
			pwd = this.$loginPassword.val(),
			errorMsg = '';
		if (account.length === 0) {
			errorMsg = '帐号不能为空';
		} else if (!pwd || pwd.length < 6) {
			errorMsg = '密码长度至少6位';
		} else {
			this.options.account = account;
			//this.options.token = MD5(pwd);
			this.options.token = pwd;
			return true;
		}
		this.showError(errorMsg);
		return false;
	},
	validateLogin: function() {
		this.$errorMsg.addClass('f-dn');
		this.$loginBtn.html('登录中...').attr('disabled', 'disabled');
		var account = this.$loginAccount.val().trim(),
			pwd = this.$loginPassword.val(),
			errorMsg = '';
		if (account.length === 0) {
			errorMsg = '帐号不能为空';
		} else if (!pwd || pwd.length < 6) {
			errorMsg = '密码长度至少6位';
		} else {
			this.options.account = account;
			//this.options.token = MD5(pwd);
			this.options.token = pwd;
			return true;
		}
		this.showError(errorMsg);
		this.$loginBtn.html('登录').removeAttr('disabled');
		return false;
	},
	validateRegist: function() {
		this.$errorMsg2.addClass('f-dn');
		var account = this.$registAccount.val().trim(),
			pwd = this.$registPassword.val(),
			nickname = this.$registNick.val().trim(),
			errorMsg = '';
		if (account.length === 0) {
			errorMsg = '帐号不能为空';
		} else if (nickname.length === 0) {
			errorMsg = '昵称不能为空';
		} else if (!pwd || pwd.length < 6) {
			errorMsg = '密码为6~20位字母或者数字';
		} else {
			this.doRegister(account, pwd, nickname);
		}
		this.showError(errorMsg, 2);
		return false;
	},
	doRegister: function(username, pwd, nickname) {
		var that = this;
		var params = {
			'username': username,
			'password': pwd,
			'nickname': nickname
		};
		$.ajax({
			url: config.reg,
			type: 'POST',
			data: params,
			contentType: 'application/x-www-form-urlencoded',
			beforeSend: function(req) {
				req.setRequestHeader('appkey', that.options.appKey);
			},
			success: function(data) {
				if (data.code === 200) {
					alert("注册成功");
					that.resetLogin();
				} else {
					that.$errorMsg2.html(data.msg).removeClass('f-dn');
				}
			},
			error: function() {
				that.$errorMsg2.html('请求失败，请重试').removeClass('f-dn');
			}
		});
	},
	resetLogin: function() {
		this.$loginAccount.val("");
		this.$loginPassword.val("");
		this.$registAccount.val("");
		this.$registPassword.val("");
		this.$registNick.val("");
		this.$errorMsg.addClass("f-dn");
		this.$errorMsg2.addClass("f-dn");
		$("#loginView .j-login").removeClass("f-dn");
		$("#loginView .j-regist").addClass("f-dn");
	},
	showError: function(text, type) {
		if (type) {
			this.$errorMsg2.html(text).removeClass('f-dn');
		} else {
			this.$errorMsg.html(text).removeClass('f-dn');
		}
	},
	showLoginView: function() {
		this.$loginView.removeClass('f-dn');
	},
	hideLoginView: function() {
		this.$loginView.addClass('f-dn');
		this.resetLogin();
	},



	/******************************************************************/


	//发送自定义消息（定义好data格式与解析方式，实现自定义的消息比如猜拳，送花等）
	showLaowang: function() {
		var content = {
			type: 1,
			data: {
				value: Math.ceil(Math.random() * 3)
			}
		};
		this.link.sendCustomMessage(content, function(err, data) {
			if (err) {
				alert(err.message);
			} else {
				this.buildChat([data], "msgs");
			}
		}.bind(this))
	},
	/**
	 * 发送礼物
	 */
	showGift: function(num) {
		console.info('坑里', num)
		var content = {
			type: 0,
			data: {
				value: num,
				text: '玫瑰'
			}
		};
		//this指向homeView
		this.sendCustomMessage(content, function(err, data) {
			if (err) {
				alert(err.message);
			} else {
				page.buildChat([data], "msgs");
			}
		})
	},
	showEmoji: function() {
		this.$emNode._$show();
	},
	cbShowEmoji: function(data) {
		this.$editText.val(this.$editText.val() + data.emoji);
	},
	sendText: function(text) {
		if (text.length > 500) {
			alert('消息长度最大为500字符');
		} else if (!util.trim(text)) {
			alert('不能发送空消息');
			return;
		} else {
			//重置输入框状态
			this.setState({
					sendValue: '',
					loginStatus: false
				})
				//this指向homeView
			this.sendText(text, function(err, data) {
				if (err) {
					alert(err.message);
				} else {
					console.info('数据', data)
						//this.$editText.val("");
					page.buildChat([data], "msgs");
				}
			})
		}
	},
	// 聊天页面绘制
	buildChat: function(data, type) {
		var html = "",
			item,
			prepend = false;
		data.sort(function(a, b) {
			return a.time - b.time;
		});
		if (type === "msgs") {
			for (var i = 0; i < data.length; i++) {
				item = data[i];
				if (this.$chat.find('.item[data-id="' + item.idClient + '"]').length) {
					continue;
				}
				if (item.type !== "notification") {
					html = this.buildMsgUI(item);
				} else {
					//对于系统通知，更新下用户信息的状态
					if (item.attach.type === "blackMember" || item.attach.type === "unblackMember" || item.attach.type === "gagMember" || item.attach.type === "ungagMember" || item.attach.type === "addManager" || item.attach.type === "removeManager") {
						this.updatePersonInfo(item.attach.to[0]);
					}
					html += this.buildSysMsgUI(item);
				}
			}
			this.$chat.append(html);
		} else {
			// 历史消息
			for (var i = 0; i < data.length; i++) {
				item = data[i];
				if (this.$chat.find('.item[data-id="' + item.idClient + '"]').length) {
					continue;
				}
				if (item.type !== "notification") {
					html += this.buildMsgUI(item);
				} else {
					html += this.buildSysMsgUI(item);
				}
			}
			this.$chat.prepend(html);
		}
		//这里可以做是否自动滚动的效果 
		this.scrollToBottom();
	},
	//消息UI绘制
	buildMsgUI: function(item) {
		return ['<div class="item" data-id="' + item.idClient + '">',
			'<p class="nick" data-account="' + item.from + '">' + item.fromNick + '：</p>',
			'<p class="text">' + util.buildMsg(item) + '</p>',
			'</div>'
		].join("");
	},
	//系统消息UI绘制
	buildSysMsgUI: function(item) {
		return ['<div class="item" data-id="' + item.idClient + '">',
			'<p class="text sys">' + util.buildSysMsg(item) + '</p>',
			'</div>'
		].join("");
	},
	// 来消息是否滚动 可以设置一个开关在这个函数实现逻辑
	scrollToBottom: function() {
		console.info('scrollToBottom')
		if (true) {
			$('.j-chat').scrollTop(99999);
		}
	}
};
//page.init();
export default page;