<template>
	<view class="content">
		<view class="content-card">
			<view class="content-card-title">
				Team data view
			</view>
			<view class="content-card-back">
				<view class="card-back-key">
					Registed:
				</view>
				<view class="card-back-value">
					0
				</view>
			</view>
			<view class="content-card-back">
				<view class="card-back-key">
					Recharged peoples:
				</view>
				<view class="card-back-value">
					0
				</view>
			</view>
			<view class="content-card-back">
				<view class="card-back-key">
					Cashed Amount:
				</view>
				<view class="card-back-value">
					₹0.00
				</view>
			</view>
		</view>
		<view class="content-header">
			<view :class="navigator == 0 ? 'content-header-item header-item-active' : 'content-header-item'"
				@click="navigator = 0">
				Level-1
			</view>
			<view :class="navigator == 1 ? 'content-header-item header-item-active' : 'content-header-item'"
				@click="navigator = 1">
				Level-2
			</view>
			<view :class="navigator == 2 ? 'content-header-item header-item-active' : 'content-header-item'"
				@click="navigator = 2">
				Level-3
			</view>
		</view>
		<view v-show="navigator == 0" class="content-direcct">
			<view class="direcct-in_come">
				Total commissio：
				<view class="direcct-in_come-text">₹0.00</view>
			</view>
			<view class="direcct-black">
				<view class="direcct-black-key">
					0
				</view>
				<view class="direcct-black-value">
					Number of people
				</view>
			</view>
			<view class="direcct-black">
				<view class="direcct-black-key">
					0
				</view>
				<view class="direcct-black-value">
					Number of deposits
				</view>
			</view>
			<view class="direcct-black">
				<view class="direcct-black-key">
					₹0.00
				</view>
				<view class="direcct-black-value">
					Deposit amount
				</view>
			</view>
			<view class="direcct-black">
				<view class="direcct-black-key">
					₹0.00
				</view>
				<view class="direcct-black-value">
					Withdrawal Amount
				</view>
			</view>
			<view class="direcct-wire" />
		</view>
		<view v-show="navigator == 1" class="content-direcct">
			<view class="direcct-in_come">
				Total commissio：
				<view class="direcct-in_come-text">₹0.00</view>
			</view>
			<view class="direcct-black">
				<view class="direcct-black-key">
					1
				</view>
				<view class="direcct-black-value">
					Number of people
				</view>
			</view>
			<view class="direcct-black">
				<view class="direcct-black-key">
					1
				</view>
				<view class="direcct-black-value">
					Number of deposits
				</view>
			</view>
			<view class="direcct-black">
				<view class="direcct-black-key">
					₹1.00
				</view>
				<view class="direcct-black-value">
					Deposit amount
				</view>
			</view>
			<view class="direcct-black">
				<view class="direcct-black-key">
					₹1.00
				</view>
				<view class="direcct-black-value">
					Withdrawal Amount
				</view>
			</view>
			<view class="direcct-wire" />
		</view>
		<view v-show="navigator == 2" class="content-direcct">
			<view class="direcct-in_come">
				Total commissio：
				<view class="direcct-in_come-text">₹0.00</view>
			</view>
			<view class="direcct-black">
				<view class="direcct-black-key">
					2
				</view>
				<view class="direcct-black-value">
					Number of people
				</view>
			</view>
			<view class="direcct-black">
				<view class="direcct-black-key">
					2
				</view>
				<view class="direcct-black-value">
					Number of deposits
				</view>
			</view>
			<view class="direcct-black">
				<view class="direcct-black-key">
					₹2.00
				</view>
				<view class="direcct-black-value">
					Deposit amount
				</view>
			</view>
			<view class="direcct-black">
				<view class="direcct-black-key">
					₹2.00
				</view>
				<view class="direcct-black-value">
					Withdrawal Amount
				</view>
			</view>
			<view class="direcct-wire" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navigator: 0
			}
		},
		onLoad() {
			this.routeGuard()
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.content {
		padding-top: 20rpx;
		background: #f6f7f9;

		.content-card {
			margin: 20rpx;
			margin-top: 0;
			padding: 36rpx 0;
			border: 1px solid #f2f2f2;
			background: #ffffff;
			border-radius: 20rpx;

			.content-card-title {
				font-size: 50rpx;
				padding: 36rpx;
				color: #000;

			}

			.content-card-back {
				border-bottom: 1px solid #e2e2e2;

				.card-back-key {
					display: inline-block;
					width: 40%;
					font-size: 36rpx;
					padding: 8rpx 36rpx;
					padding-right: 0;
					color: #858282;

				}

				.card-back-value {
					text-align: right;
					color: #f79604;
					display: inline-block;
					width: 40%;
					font-size: 36rpx;
				}
			}
		}

		.content-header {
			height: 70rpx;
			padding: 20rpx;
			background: #ffffff;
			border-bottom: 1px solid #e9e8e7;
			margin-bottom: 26rpx;

			.content-header-item {
				display: inline-block;
				margin-right: 40rpx;
				font-weight: 700;
				font-size: 30rpx;
				color: #6b6c6e;
				transition: all .2s ease-in-out;
				-webkit-transition: all .2s ease-in-out;
			}

			.header-item-active {
				font-size: 43rpx;
				color: #000;
			}
		}

		.content-direcct {
			background: #fff;
			min-height: 50vh;

			.direcct-in_come {
				padding: 36rpx;
				border-bottom: 2px solid #f5f6f7;
				color: #aeafaf;

				.direcct-in_come-text {
					font-size: 40rpx;
					font-weight: 700;
					color: #06275c;
					display: inline-block;
				}
			}

			.direcct-black {
				display: inline-block;
				margin-top: 36rpx;
				width: 50%;
				text-align: center;

				.direcct-black-key {
					color: #000;

				}

				.direcct-black-value {
					font-size: 24rpx;
					margin-top: 20rpx;
					color: #aeafaf;
				}
			}

			.direcct-wire {
				margin-top: 20rpx;
				height: 10rpx;
				background: #f5f6f7;
			}
		}
	}
</style>
