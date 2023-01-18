const baseURL = 'http://47.88.25.56:9000/' //测试环境
// const baseURL = "https://api.venobroker.in/" //生产环境 
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
				"token": token ? token : ''
			},
			success(res) {
				if (res.statusCode == 200) {
					if (res.data.code === 0) {
						//	请求成功！
					} else if (res.data.code === 204) {
						uni.showModal({
							title: 'Hint',
							content: res.data.message,
							showCancel: false,
							confirmText: 'Again Login',
							success: function(res) {
								if (res.confirm) {
									setTimeout(() => {
										uni.removeStorageSync("token")
										uni.reLaunch({
											url: "/pages/login/login"
										})
									}, 1000)
								}
							}
						});
					} else {
						uni.showModal({
							title: 'Hint',
							content: res.data.message,
							showCancel: false,
							confirmText: 'Confirm',
							success: function(res) {
								if (res.confirm) {

								}
							}
						});
					}
				} else if (res.statusCode == 500) {
					uni.showModal({
						title: 'Hint',
						content: 'The system is abnormal. Please try again later！',
						showCancel: false,
						confirmText: 'Confirm',
						success: function(res) {
							if (res.confirm) {

							}
						}
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: "Network connection failure！",
						duration: 2000
					})
				}
				resolve(res.data)
			},
			fail(err) {
				uni.showToast({
					icon: 'none',
					title: "Network connection failure！",
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
				"Content-Type": "application/json",
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
						uni.setStorageSync('token', res.data.data.token) //存储token
						uni.showModal({
							title: 'Hint',
							content: res.data.message,
							showCancel: false,
							confirmText: 'Enter',
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
							title: 'Hint',
							content: res.data.message,
							showCancel: false,
							confirmText: 'Confirm',
						})
					}
				} else {
					uni.showModal({
						title: 'Hint',
						content: "Network exception！",
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
