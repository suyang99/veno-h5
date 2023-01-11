<template>
	<view class="content">
		<view class="content-header">
			<view :class="navigator == 0 ? 'content-header-item header-item-active' : 'content-header-item'"
				@click="navigator = 0">
				Trading Pairs
			</view>
			<view :class="navigator == 1 ? 'content-header-item header-item-active' : 'content-header-item'"
				@click="navigator = 1">
				History
			</view>
		</view>
		<view class="mraket-list" v-show="navigator == 0">
			<view class="mraket-list-item">
				<view class="list-item-header">
					<view class="item-header-text1 red">
						PUT
					</view>
					<view class="item-header-text2">
						FIL/USDT
					</view>
					<view class="item-header-text3">
						1M
					</view>
				</view>
				<view class="list-item-black">
					<view class="item-black-child">
						<view class="black-child-key">
							Time
						</view>
						<view class="black-child-value">
							13:13:31
						</view>
					</view>
					<view class="item-black-child">
						<view class="black-child-key">
							Openning Price
						</view>
						<view class="black-child-value">
							2.98
						</view>
					</view>
					<view class="item-black-child" style="text-align: right;">
						<view class="black-child-key">
							Closing Price
						</view>
						<view class="black-child-value">
							2.98
						</view>
					</view>
				</view>
				<view class="list-item-black">
					<view class="item-black-child">
						<view class="black-child-key">
							Total
						</view>
						<view class="black-child-value">
							₹20
						</view>
					</view>
					<view class="item-black-child">
						<view class="black-child-key">
							Status
						</view>
						<view class="black-child-value red">
							Loss
						</view>
					</view>
					<view class="item-black-child" style="text-align: right;">
						<view class="black-child-key">
							Settlement
						</view>
						<view class="black-child-value">
							₹0
						</view>
					</view>
				</view>
			</view>
			<view class="mraket-list-item">
				<view class="list-item-header">
					<view class="item-header-text1 green">
						CALL
					</view>
					<view class="item-header-text2">
						FIL/USDT
					</view>
					<view class="item-header-text3">
						1M
					</view>
				</view>
				<view class="list-item-black">
					<view class="item-black-child">
						<view class="black-child-key">
							Time
						</view>
						<view class="black-child-value">
							13:13:31
						</view>
					</view>
					<view class="item-black-child">
						<view class="black-child-key">
							Openning Price
						</view>
						<view class="black-child-value">
							2.98
						</view>
					</view>
					<view class="item-black-child" style="text-align: right;">
						<view class="black-child-key">
							Closing Price
						</view>
						<view class="black-child-value">
							2.98
						</view>
					</view>
				</view>
				<view class="list-item-black">
					<view class="item-black-child">
						<view class="black-child-key">
							Total
						</view>
						<view class="black-child-value">
							₹20
						</view>
					</view>
					<view class="item-black-child">
						<view class="black-child-key">
							Status
						</view>
						<view class="black-child-value green">
							Loss
						</view>
					</view>
					<view class="item-black-child" style="text-align: right;">
						<view class="black-child-key">
							Settlement
						</view>
						<view class="black-child-value">
							₹0
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mraket-list" v-show="navigator == 1">
			<view class="mraket-list-item">
				<view class="list-item-header">
					<view class="item-header-text1 green">
						CALL
					</view>
					<view class="item-header-text2">
						FIL/USDT
					</view>
					<view class="item-header-text3">
						1M
					</view>
				</view>
				<view class="list-item-black">
					<view class="item-black-child">
						<view class="black-child-key">
							Time
						</view>
						<view class="black-child-value">
							13:13:31
						</view>
					</view>
					<view class="item-black-child">
						<view class="black-child-key">
							Openning Price
						</view>
						<view class="black-child-value">
							2.98
						</view>
					</view>
					<view class="item-black-child" style="text-align: right;">
						<view class="black-child-key">
							Closing Price
						</view>
						<view class="black-child-value">
							2.98
						</view>
					</view>
				</view>
				<view class="list-item-black">
					<view class="item-black-child">
						<view class="black-child-key">
							Total
						</view>
						<view class="black-child-value">
							₹20
						</view>
					</view>
					<view class="item-black-child">
						<view class="black-child-key">
							Status
						</view>
						<view class="black-child-value green">
							Loss
						</view>
					</view>
					<view class="item-black-child" style="text-align: right;">
						<view class="black-child-key">
							Settlement
						</view>
						<view class="black-child-value">
							₹0
						</view>
					</view>
				</view>
			</view>
			<view class="mraket-list-item">
				<view class="list-item-header">
					<view class="item-header-text1 red">
						PUT
					</view>
					<view class="item-header-text2">
						FIL/USDT
					</view>
					<view class="item-header-text3">
						1M
					</view>
				</view>
				<view class="list-item-black">
					<view class="item-black-child">
						<view class="black-child-key">
							Time
						</view>
						<view class="black-child-value">
							13:13:31
						</view>
					</view>
					<view class="item-black-child">
						<view class="black-child-key">
							Openning Price
						</view>
						<view class="black-child-value">
							2.98
						</view>
					</view>
					<view class="item-black-child" style="text-align: right;">
						<view class="black-child-key">
							Closing Price
						</view>
						<view class="black-child-value">
							2.98
						</view>
					</view>
				</view>
				<view class="list-item-black">
					<view class="item-black-child">
						<view class="black-child-key">
							Total
						</view>
						<view class="black-child-value">
							₹20
						</view>
					</view>
					<view class="item-black-child">
						<view class="black-child-key">
							Status
						</view>
						<view class="black-child-value red">
							Loss
						</view>
					</view>
					<view class="item-black-child" style="text-align: right;">
						<view class="black-child-key">
							Settlement
						</view>
						<view class="black-child-value">
							₹0
						</view>
					</view>
				</view>
			</view>
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
		methods: {

		}
	}
</script>

<style lang="scss">
	.content {
		min-height: 94vh;
		background: #f6f7f9;

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

		.mraket-list {


			.mraket-list-item {
				margin-top: 2px;
				padding: 30rpx;
				background: #fff;

				.list-item-header {
					display: flex;
					font-weight: 700;

					.item-header-text1 {
						margin-right: 20rpx;
					}

					.item-header-text2 {
						margin-right: 20rpx;
					}

					.item-header-text3 {}
				}

				.list-item-black {
					.item-black-child {
						display: inline-block;
						width: 33.333%;
						vertical-align: middle;

						.black-child-key {
							padding: 4rpx 0;
							font-size: 24rpx;
							color: #9d9e9e;
						}

						.black-child-value {
							padding: 4rpx 0;
							color: #000;
							font-size: 30rpx;
						}

						.red {
							color: #e44e69;
						}

						.green {
							color: #28baa7;
							;
						}
					}
				}

				.red {
					color: #e44e69;
				}

				.green {
					color: #28baa7;
					;
				}
			}
		}
	}
</style>
