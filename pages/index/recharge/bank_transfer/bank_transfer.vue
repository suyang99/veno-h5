<template>
	<view class="content">
		<view class="content-hint">
			Your are paying
		</view>
		<view class="content-money">
			₹ {{money}}
		</view>
		<view class="content-hint2">
			Touch to Copy,If using bank transfer, please select IMPS
		</view>
		<view class="content-bank">
			<view class="content-bank-title">
				UPI Transfer
			</view>
			<view class="content-bank-info" @click="copyText('kushalshetty007@axl')">
				<view class="bank-info-key">
					UPI:
				</view>
				<view class="bank-info-value" style="color: #c70b0b;">
					{{dueBank.upi}}
				</view>
			</view>
		</view>
		<view class="content-bank">
			<view class="content-bank-title">
				Bank Transfer
			</view>
			<view class="content-bank-info" @click="copyText('kushal shetty N')">
				<view class="bank-info-key">
					Holder Name:
				</view>
				<view class="bank-info-value">
					{{dueBank.account_name}}
				</view>
			</view>
			<view class="content-bank-info" @click="copyText('50100346825411')">
				<view class="bank-info-key">
					Account no:
				</view>
				<view class="bank-info-value">
					{{dueBank.account_num}}
				</view>
			</view>
			<view class="content-bank-info" @click="copyText('HDFC0009413')">
				<view class="bank-info-key">
					IFSC:
				</view>
				<view class="bank-info-value">
					{{dueBank.ifsc}}
				</view>
			</view>
		</view>
		<view class="content-pay" @click="recharge">
			Sending screenshots
		</view>
		<view class="content-note">
			Once you have successfully transferred the funds, please send a screenshot of the transfer details to the
			recharge agent
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: 0,
				dueBank: {
					account_name: '',
					account_num: '',
					ifsc: '',
					upi: ''
				},
				onlineService: ''
			}
		},
		onLoad(options) {
			this.money = options.money
			this.routeGuard()
			this.getAccount()
		},
		methods: {
			getAccount() {
				this.uniRequest('common/settings', {}, 'GET').then((res) => {
					this.dueBank = res.data.due_bank
					this.onlineService = res.data.online_service
				})
			},
			recharge() {
				this.uniRequest('user/account/recharge', {
					amount: this.money
				}, ).then((res) => {
					if (res.code === 0) {
						this.openUrl(this.onlineService)
					}
				})
			},
			//复制链接
			copyText(value) {
				uni.setClipboardData({
					data: value,
					success: function() {
						uni.showToast({
							title: '复制成功',
							duration: 2000,
							icon: 'none'
						});
					},
					fail: function(err) {
						uni.showToast({
							title: '复制失败',
							duration: 2000,
							icon: 'none'
						});
					}
				});
			},
			openUrl(url) {
				window.open(url, "_blank");
			},
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 40rpx;

		.content-hint {
			padding: 20rpx 0;
			color: #8d8a8a;
		}

		.content-money {
			font-size: 50rpx;
			color: #000;
			padding-bottom: 20rpx;
		}

		.content-hint2 {
			color: #fa0404;
			padding-left: 20rpx;
		}

		.content-bank {
			.content-bank-title {
				padding: 34rpx 0;
				color: #000;
				font-weight: 700;
				border-bottom: 1px solid #7c7a7a;
			}

			.content-bank-info {
				padding: 20rpx;
				border-bottom: 1px solid #f2f2f2;

				.bank-info-key {
					width: 35%;
					display: inline-block;
					color: #8d8a8a;
				}

				.bank-info-value {
					display: inline-block;
					font-weight: 700;
					font-size: 35rpx;
					color: #000;
				}
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

		.content-note {
			background: #faf9df;
			color: #f5b400;
			padding: 35rpx;
			border: 1px dashed #d1ce01;
			line-height: 180%;
			font-size: 35rpx;
			border-radius: 20rpx;
			margin-top: 20rpx;
		}

	}
</style>
