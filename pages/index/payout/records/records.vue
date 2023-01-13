<template>
	<view class="content">
		<view class="content-header">
			<view :class="navigator == 0 ? 'content-header-item header-item-active' : 'content-header-item'"
				@click="navigator = 0">
				Recharge Records
			</view>
			<view :class="navigator == 1 ? 'content-header-item header-item-active' : 'content-header-item'"
				@click="navigator = 1">
				Withdraw Records
			</view>
		</view>
		<view class="content-list" v-show="navigator === 0">
			<view class="list-item" v-for="item in 5" :key="item">
				<view class="list-item-black">
					<view class="item-black-key">
						Amount
					</view>
					<view class="item-black-value">
						₹1000{{item}}
					</view>
				</view>
				<view class="list-item-black">
					<view class="item-black-key">
						Status
					</view>
					<view class="item-black-value2">
						Unpaid
					</view>
				</view>
				<view class="list-item-black" style="text-align: right;">
					<view class="item-black-key">
						Time
					</view>
					<view class="item-black-value3">
						2023/01/09 15:19:00
					</view>
				</view>
			</view>
			<view class="content-list-nomare">
				- No more -
			</view>
		</view>
		<view class="content-list" v-show="navigator === 1">
			<view class="list-item" v-for="item in 0" :key="item">
				<view class="list-item-black">
					<view class="item-black-key">
						Amount
					</view>
					<view class="item-black-value">
						₹1000{{item}}
					</view>
				</view>
				<view class="list-item-black">
					<view class="item-black-key">
						Status
					</view>
					<view class="item-black-value2">
						Unpaid
					</view>
				</view>
				<view class="list-item-black" style="text-align: right;">
					<view class="item-black-key">
						Time
					</view>
					<view class="item-black-value3">
						2023/01/09 15:19:00
					</view>
				</view>
			</view>
			<view class="content-list-nomare">
				- No more -
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
		onLoad() {
			this.routeGuard()
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
				margin-right: 20rpx;
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

		.content-list {
			min-height: 60vh;
			background-color: #ffffff;

			.list-item {
				padding: 24rpx 18rpx;
				border-bottom: 1px solid #f5f7f8;

				.list-item-black {
					width: 33.33%;
					display: inline-block;

					.item-black-key {
						font-size: 22rpx;
						font-weight: 500;
						padding: 4rpx 0;
						color: #9d9e9e;
					}

					.item-black-value {
						font-size: 30rpx;
						color: #000;
						font-weight: 700;
					}

					.item-black-value2 {
						font-size: 30rpx;
						color: #767777;
						font-weight: 700;
					}

					.item-black-value3 {
						font-size: 20rpx;
						color: #000;
						font-weight: 700;
					}
				}
			}

			.content-list-nomare {
				color: #969799;
				font-size: 28rpx;
				line-height: 100rpx;
				text-align: center;
			}
		}

	}
</style>
