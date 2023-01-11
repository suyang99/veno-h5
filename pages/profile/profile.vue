<template>
	<view class="content">
		<view class="content-header">
			<view class="content-header-card">
				<view class="header-card-user">
					<image src="https://dgbroker.in/app/img/face@2x.47568f54.png" class="card-user-photo" mode="" />
					<view class="card-user-info">
						<view class="user-info-name">
							Hi,yumen
						</view>
						<view class="user-info-uid">
							UID:001839
						</view>
					</view>
				</view>
				<view class="header-card-balance">
					<view class="card-balance-title">
						Balance
					</view>
					<view class="card-balance-funds">
						₹95.00
					</view>
					<view class="card-balance-black">
						<view class="balance-black-btm" @click="goPayoutPage">
							Withdraw
						</view>
						<view class="balance-black-btm" @click="goRechargePage">
							Recharge
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="content-actions">
			<view class="content-actions-item" @click="goRecodsPage">
				<image class="actions-item-icon" src="../../static/wallet/actions-icon-1.png" mode="aspectFit" />
				<view class="actions-item-name">
					Exchange Record
				</view>
			</view>
			<view class="content-actions-item" @click="goSafePage">
				<image class="actions-item-icon" src="../../static/wallet/actions-icon-2.png" mode="aspectFit" />
				<view class="actions-item-name">
					Security
				</view>
			</view>
			<view class="content-actions-item" @click="goDirectPage">
				<image class="actions-item-icon" src="../../static/wallet/actions-icon-3.png" mode="aspectFit" />
				<view class="actions-item-name">
					Direct Subordinate
				</view>
			</view>
			<view class="content-actions-item">
				<image class="actions-item-icon" src="../../static/wallet/actions-icon-4.png" mode="aspectFit" />
				<view class="actions-item-name">
					Online service
				</view>
			</view>
			<view class="content-actions-item">
				<image class="actions-item-icon" src="../../static/wallet/actions-icon-5.png" mode="aspectFit" />
				<view class="actions-item-name">
					Settings
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			goPayoutPage() {
				uni.navigateTo({
					url: '/pages/index/payout/payout'
				})
			},
			goRechargePage() {
				uni.navigateTo({
					url: '/pages/index/recharge/recharge'
				})
			},
			goSafePage() {
				uni.navigateTo({
					url: '/pages/profile/safe/safe'
				})
			},
			goRecodsPage() {
				uni.navigateTo({
					url: '/pages/profile/recods/recods'
				})
			},
			goDirectPage() {
				uni.navigateTo({
					url: "/pages/index/direct/direct"
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		background: #f6f7f9;

		.content-header {
			padding: 40rpx;
			background: url('../../static/wallet/wallet-header-bg.png') no-repeat;
			background-size: contain;

			.content-header-card {
				padding-bottom: 10px;
				border-radius: 20rpx;
				background-color: #fff;

				.header-card-user {
					padding: 40rpx;
					display: flex;
					align-items: center;

					.card-user-photo {
						width: 100rpx;
						height: 110rpx;
						vertical-align: middle;
						border-radius: 50%;
					}

					.card-user-info {
						margin: 0 40rpx;
						font-size: 28rpx;

						.user-info-name {
							font-weight: 700;
						}

					}
				}

				.header-card-balance {
					height: 150rpx;
					padding: 30rpx;
					background: url('../../static/wallet/header-card-balance-bg.png') no-repeat;
					background-size: contain;

					.card-balance-title {
						color: #ffffff;
						font-size: 28rpx;
					}

					.card-balance-funds {
						color: #ffffff;
						font-size: 36rpx;
					}



					.card-balance-black {
						text-align: right;

						.balance-black-btm {
							margin-left: 20rpx;
							display: inline-block;
							background: hsla(0, 0%, 100%, .12);
							border: 0 solid #fff;
							text-align: center;
							color: #ffffff;
							border-radius: 40rpx;
							padding: 5rpx 15rpx;
						}
					}
				}

			}
		}

		.content-actions {
			background: #ffffff;

			.content-actions-item {
				display: flex;
				align-items: center;
				padding: 20rpx 50rpx;
				border-bottom: 1px solid #f2f2f2;

				.actions-item-icon {
					width: 40rpx;
					height: 40rpx;
				}

				.actions-item-name {
					margin-left: 10rpx;
					font-size: 36rpx;
				}
			}
		}
	}
</style>
