<template>
	<view class="content">
		<view style="text-align: center;">
			<image class="login-logo" src="../../static/logo.png" mode="aspectFit" />
		</view>
		<view class="login-card">
			<view class="login-card-header">
				<view :class="activeTab == 0? 'card-header-tab header-tab-active': 'card-header-tab'"
					@click="activeTab = 0">
					Login
				</view>
				<view :class="activeTab == 1? 'card-header-tab header-tab-active': 'card-header-tab'"
					@click="activeTab = 1">
					SignUp
				</view>
			</view>
			<view class="login-card-input" v-show="activeTab == 0">
				<view class="recharge-input">
					<uni-easyinput type="text" v-model="login.inputValue1" placeholder="Mobile phone number"
						:inputBorder='false' :clearable="false" />
				</view>
				<view class="recharge-input">
					<uni-easyinput type="text" v-model="login.inputValue2" placeholder="Password" :inputBorder='false'
						:clearable="false" />
				</view>
				<view class="content-pay" @click="loginFn">
					Login
				</view>
			</view>
			<view class="login-card-input" v-show="activeTab == 1">
				<view class="recharge-input">
					<uni-easyinput type="text" v-model="login.inputValue1" placeholder="Mobile phone number"
						:inputBorder='false' :clearable="false" />
				</view>
				<view class="recharge-input">
					<uni-easyinput type="text" v-model="login.inputValue2" placeholder="Full Name" :inputBorder='false'
						:clearable="false" />
				</view>
				<view class="recharge-input">
					<uni-easyinput type="text" v-model="login.inputValue3" placeholder="Password" :inputBorder='false'
						:clearable="false" />
				</view>
				<view class="recharge-input">
					<uni-easyinput type="text" v-model="login.inputValue4" placeholder="Invitation code"
						:inputBorder='false' :clearable="false" />
				</view>
				<view class="recharge-input">
					<uni-easyinput type="text" v-model="login.inputValue5" placeholder="Email" :inputBorder='false'
						:clearable="false" />
				</view>
				<view class="content-pay" @click="loginFn">
					Sign Up
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeTab: 0,
				login: {
					inputValue1: null,
					inputValue2: null
				},
				signUp: {
					inputValue1: null,
					inputValue2: null,
					inputValue3: null,
					inputValue4: null,
					inputValue5: null
				}
			}
		},
		methods: {
			loginFn() {
				uni.setStorageSync('ifLogin', true);
				uni.switchTab({
					url: "/pages/index/index"
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		height: 100vh;
		padding: 40rpx;
		background-image: linear-gradient(1turn, #4396f4, #a4cdfc);
		background-size: contain;

		.login-logo {
			width: 150rpx;
			height: 150rpx;
			margin: 20rpx 0;
		}

		.login-card {
			padding: 50rpx;
			border-radius: 20rpx;
			background: #ffffff;

			.login-card-header {
				.card-header-tab {
					display: inline-block;
					width: 50%;
					text-align: center;
					padding: 20rpx 0;
					font-size: 30rpx;
					transition: all .3s ease-in-out;
					-webkit-transition: all .3s ease-in-out;
				}

				.header-tab-active {
					color: #538bf6;
					border-bottom: 3px solid #538bf6;
					font-weight: 700;
					box-shadow: 0 8rpx 16rpx #f2f2f2;
					transition: all .3s ease-in-out;
					-webkit-transition: all .3s ease-in-out;
					font-size: 55rpx;
				}
			}

			.login-card-input {
				margin-top: 40rpx;

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
		}
	}
</style>
