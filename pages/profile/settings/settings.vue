<template>
	<view class="content">
		<view class="content-item" @click="goChangeloginpassPage">
			Modify login password
			<image class="content-item-icon" src="../../../static/into-icon.png" mode="aspectFit"></image>
		</view>
		<view class="content-item-line" />
		<view class="content-item" @click="logOut">
			Log out
			<image class="content-item-icon" src="../../../static/into-icon.png" mode="aspectFit"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			this.routeGuard()
		},
		methods: {
			logOut() {
				uni.removeStorageSync('token')
				uni.redirectTo({
					url: '/pages/login/login'
				})
			},
			goChangeloginpassPage() {
				uni.navigateTo({
					url: "/pages/profile/safe/changeloginpass/changeloginpass"
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		min-height: 94vh;
		background: #f6f7f9;

		.content-item {
			padding: 30rpx 20rpx;
			padding-left: 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #323233;
			font-weight: 500;
			font-size: 30rpx;
			background: #fff;

			.content-item-icon {
				width: 50rpx;
				height: 50rpx;
			}
		}

		.content-item-line {
			height: 4rpx;
			background-color: #dcdcdcdc;
			margin: 0 40rpx;
		}
	}
</style>
