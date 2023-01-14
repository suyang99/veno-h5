<template>
	<view class="content">
		<view class="recharge-input">
			<uni-easyinput type="number" v-model="inputValue.old_password" placeholder="Old Password"
				:inputBorder='false' :clearable="false" />
		</view>
		<view class="recharge-input">
			<uni-easyinput type="number" v-model="inputValue.new_password" placeholder="New Password"
				:inputBorder='false' :clearable="false" />
		</view>
		<view class="recharge-input">
			<uni-easyinput type="number" v-model="inputValue.new_password2" placeholder="Confirm Password"
				:inputBorder='false' :clearable="false" />
		</view>
		<view class="content-pay" @click="resetPassword">
			Submit
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputValue: {
					old_password: null,
					new_password: null,
					new_password2: null
				}

			}
		},
		onLoad() {
			this.routeGuard()
		},
		methods: {
			resetPassword() {
				if (this.inputValue !== null && this.inputValue.new_password === this.inputValue.new_password2) {
					this.uniRequest('user/reset_password', this.inputValue).then((res) => {
						uni.showModal({
							title: 'Hint',
							content: res.message,
							showCancel: false,
							confirmText: 'Confirm',
							success: function(_res) {
								if (_res.confirm) {
									uni.switchTab({
										url: "/pages/profile/profile"
									})
								}
							}
						});
					})
				} else {
					uni.showModal({
						title: 'Hint',
						content: "Two passwords do not match！",
						showCancel: false,
						confirmText: 'Confirm',
						success: function(res) {

						}
					});
				}

			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 40rpx;
		padding-top: 180rpx;

		.recharge-input {
			padding: 20rpx;
			margin-bottom: 20rpx;
			background: #f7f7f7;
			border: 1px solid #f2f2f2;
			border-radius: 30rpx;


			::v-deep .uni-easyinput__content {
				background-color: rgba(0, 0, 0, 0) !important;
			}

			::v-deep .uni-input-input {
				font-size: 20px;
			}
		}

		.content-pay {
			width: 95%;
			border: none;
			background-image: linear-gradient(90deg, #5ad2fe, #1c9ced);
			color: #fff;
			text-align: center;
			margin: 40rpx auto;
			padding: 20rpx 0;
			border-radius: 40rpx;
			font-size: 36rpx;
			font-weight: 500;
		}
	}
</style>
