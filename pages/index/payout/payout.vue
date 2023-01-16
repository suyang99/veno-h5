<template>
	<view class="content">
		<!-- <view class="content-records" @click="goRecordsPage">
			Records
		</view> -->
		<view class="content-balance">
			<view class="content-balance-key">
				Available Balance:
			</view>
			<view class="content-balance-value">
				₹ {{accountBalance}}
			</view>
		</view>
		<view class="recharge-input">
			<uni-easyinput type="number" v-model="amount" :inputBorder='false' :clearable="false" />
		</view>
		<view class="content-balance content-balance2">
			<view class="content-balance-key">
				Taxs:
			</view>
			<view class="content-balance-value">
				₹ {{(amount /100 * withdrawCharge).toFixed(2)}}
			</view>
		</view>
		<view class="content-balance content-balance2">
			<view class="content-balance-key">
				Total Amount:
			</view>
			<view class="content-balance-value">
				₹ {{Number((amount /100 * withdrawCharge).toFixed(2))+Number(amount)}}
			</view>
		</view>
		<view class="content-bankitem">
			SELECT BANK
		</view>
		<view class="content-note">
			<image class="content-note-icon" src="../../../static/index/note-icon.png" mode="aspectFit" />
			<view class="content-note-text">
				Withdrawal charges {{withdrawCharge}}% Taxs, withdraw time Monday-Friday 7am-9am
			</view>
		</view>
		<view class="content-pay" @click="accountWithdraw">
			Submit
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				amount: 0,
				accountBalance: 0.00,
				withdrawCharge: 0,
				withdrawLimit: {
					max: 0,
					min: 0
				},
				account: {
					bank: []
				}
			}
		},
		onLoad(options) {
			console.log(options.withdrawLimit.split(',')[0])
			this.withdrawCharge = Number(options.withdrawCharge)
			this.withdrawLimit.min = Number(options.withdrawLimit.split(',')[0])
			this.withdrawLimit.max = Number(options.withdrawLimit.split(',')[1])
			this.getAccount()
			this.getAccountBalance()
		},
		methods: {
			accountWithdraw() {
				const _this = this
				if (this.amount < this.withdrawLimit.max && this.amount > this.withdrawLimit.min) {
					this.uniRequest('user/account/withdraw', {
						amount: this.amount
					}).then((res) => {
						this.getAccountBalance()
						uni.showModal({
							content: res.message,
							showCancel: false,
							confirmText: 'Enter',
							success: function(_res) {
								if (_res.confirm) {
									_this.goRecordsPage()

								}
							}
						});
					})
				} else {
					let contentText = "Maximum withdrawal：" + this.withdrawLimit.max + ",Minimum withdrawal：" + this
						.withdrawLimit.min;
					uni.showModal({
						content: contentText,
						showCancel: false,
						confirmText: 'Enter',
						success: function(res) {
							if (res.confirm) {

							}
						}
					});
				}

			},
			getAccountBalance() {
				this.uniRequest('user/account/balance', {}, 'GET').then((res) => {
					this.accountBalance = res.data.balance
				})
			},
			getAccount() {
				this.uniRequest('user/account/info', {}, 'GET').then((res) => {
					this.account = res.data
					if (this.account.bank.length === 0) {
						uni.showModal({
							content: "Please bind the withdrawal bank card first",
							showCancel: false,
							confirmText: 'Enter',
							success: function(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: '/pages/index/payout/bind_card/bind_card'
									})
								}
							}
						});
					}
				})
			},
			goRecordsPage() {
				uni.navigateTo({
					url: '/pages/profile/recods/capital/capital?type=withdraw'
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 20rpx;

		.content-records {
			text-align: right;
			color: #1989fa;
			padding: 20rpx;
			padding-bottom: 0;

		}

		.content-balance {
			padding: 20rpx;
			margin: 20rpx;
			display: flex;
			align-items: flex-end;
			border-bottom: 1px solid #f2f2f2;

			.content-balance-key {
				color: #949292;
			}

			.content-balance-value {
				margin-left: 20rpx;
				font-size: 40rpx;
				color: #555;
				font-weight: 400;
			}
		}

		.content-balance2 {
			border: none;
			margin: 0;
			padding-top: 0;

			.content-balance-value {}
		}

		.recharge-input {
			margin: 40rpx;
			padding: 20rpx;
			margin-bottom: 20rpx;
			background: #f7f7f7;
			border: 1px solid #f2f2f2;
			border-radius: 20rpx;


			::v-deep .uni-easyinput__content {
				background-color: rgba(0, 0, 0, 0) !important;
			}

			::v-deep .uni-input-input {
				font-size: 20px;
			}
		}

		.content-bankitem {
			border: 1px dashed #555;
			border-radius: 20rpx;
			padding: 40rpx;
		}

		.content-note {
			margin: 20rpx 0;
			padding: 20rpx;
			display: flex;
			align-items: center;
			color: rgb(25, 137, 250);
			background: rgb(236, 249, 255);

			.content-note-icon {
				width: 50rpx;
				height: 50rpx;
				margin-right: 20rpx
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
