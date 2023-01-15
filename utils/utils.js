//时间戳转换
function formatDateTime(inputTime) {
	var date = new Date(inputTime * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	var h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	var minute = date.getMinutes();
	var second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;
	return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};

//简易路由守卫
function routeGuard() {
	if (uni.getStorageSync('token')) {
		return true
	} else {
		uni.redirectTo({
			url: '/pages/login/login'
		})
		return false
	}
}


module.exports = {
	formatDateTime,
	routeGuard
}
