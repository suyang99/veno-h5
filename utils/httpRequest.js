const baseURL = 'https://api.aiitf.com/' //测试环境

/**
 * 接口请求封装
 */
function uniRequest(url, data, method = 'POST') {
	let token = uni.getStorageSync('token')
	return new Promise(function(resolve, reject) {
		uni.request({
			url: baseURL + url,
			data: data,
			method: method,
			header: {
				"Content-Type": "application/json",
				"ba-user-token": token ? token : ''
			},
			success(res) {
				if (res.statusCode == 200) {
					if (res.data.code === 0) {
						//	请求成功！
					} else if (res.data.code === 302) {
						uni.showModal({
							title: '提示',
							content: res.data.msg,
							showCancel: false,
							success: function(_res) {
								if (_res.confirm) {
									if (res.data.data.routePath === "/user") {
										uni.switchTab({
											url: "/pages/index/index"
										})
									} else {
										uni.removeStorageSync("userInfo")
										uni.removeStorageSync("token")
										uni.reLaunch({
											url: "/pages/login/login"
										})
									}
								}
							}
						});
					} else if (res.data.code === 409) {
						uni.showModal({
							title: '提示',
							content: '登录失效！',
							showCancel: false,
							confirmText: '重新登录',
							success: function(res) {
								if (res.confirm) {
									setTimeout(() => {
										uni.reLaunch({
											url: "/pages/login/login"
										})
									}, 1000)
								}
							}
						});
					}
				} else if (res.statusCode == 500) {
					uni.showModal({
						title: '提示',
						content: '系统异常，请稍后再试！',
						showCancel: false,
						success: function(res) {
							if (res.confirm) {

							}
						}
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: "网络连接失败！",
						duration: 2000
					})
				}
				resolve(res.data)
			},
			fail(err) {
				uni.showToast({
					icon: 'none',
					title: "网络连接失败！",
					duration: 2000
				})
				reject(err)
			}
		})
	})
}

/**
 * 登录获取Token
 */
function requestLogin(url, data, ) {
	return new Promise(function(resolve, reject) {
		uni.request({
			url: baseURL + url,
			data: data,
			method: "POST",
			header: {
				"Content-Type": "application/json"
			},
			success(res) {
				const resData = {
					code: null,
					data: res.data
				}
				if (res.statusCode === 200) {

					if (res.data.code === 0) {
						resData.code = 0
						//请求成功
						uni.setStorageSync('token', res.data.data.userinfo.token) //存储token
						uni.setStorageSync('userInfo', JSON.stringify(res.data.data.userinfo))
						uni.showModal({
							title: '提示',
							content: '登录成功！',
							showCancel: false,
							confirmText: '进入首页',
							success: function(res) {
								if (res.confirm) {
									setTimeout(() => {
										uni.switchTab({
											url: "/pages/index/index"
										})
									}, 1000)
								}
							}
						});
					} else {
						uni.showModal({
							title: '提示',
							content: res.data.msg + "!",
							showCancel: false
						})
					}
				} else {
					uni.showModal({
						title: '提示',
						content: "登录遇到了一点问题，请检查网络后重新进入小程序！",
						showCancel: false
					})
					resData.code = 10001
				}
				resolve(resData)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

module.exports = {
	uniRequest: uniRequest,
	requestLogin: requestLogin,
	baseURL: baseURL,
}
