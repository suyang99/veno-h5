<template>
	<view class="content">
		<view class="market-header">
			<view class="market-header-li">
				Name/24H
			</view>
			<view class="market-header-li">
				Market Price
			</view>
			<view class="market-header-li" style="text-align: right;">
				Change%
			</view>
		</view>
		<view class="mraket-content">
			<view class="mraket-list" v-for="item in 15" :key="item" @click="openKlinePage('XRP'+ item)">
				<view class="mraket-list-name">
					<view class="list-name-1">XRP{{item}}</view>
					<view class="list-name-2">24H ₹5.{{item}}1B</view>
				</view>
				<view class="mraket-list-name">
					<view class="list-name-1">0.{{item}}354{{item}}</view>
					<view class="list-name-2">≈₹{{item}}2.70</view>
				</view>
				<view class="mraket-list-name" style="text-align: right;">
					<view :class="item % 2 == 0 ? 'mraket-list-change red': 'mraket-list-change green'">
						{{item % 2 == 0 ?'+2.85%' : '-1.46%'}}
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

			}
		},
		methods: {
			openKlinePage(value) {
				uni.navigateTo({
					url: '/pages/trde/kline/kline?name=' + value
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		.market-header {
			padding: 20rpx;
			background: #fff;

			.market-header-li {
				color: #4a5e78;
				display: inline-block;
				width: 32.33%;
			}
		}

		.mraket-content {
			.mraket-list {
				border-bottom: 1px solid #f2f2f2;
				padding: 0 14rpx;

				.mraket-list-name {
					width: 33.33%;
					vertical-align: middle;
					padding: 20rpx 4rpx;
					margin-right: -4px;
					display: inline-block;

					.list-name-1 {
						font-size: 32rpx;
						font-weight: 700;
						color: #333;
					}

					.list-name-2 {
						color: #2e3e5c;
						font-size: 24rpx;
					}

					.mraket-list-change {
						min-width: 140rpx;
						padding: 16rpx;
						text-align: center;
						border-radius: 8rpx;
						font-size: 32rpx;
						color: #fff;
						font-weight: 700;
						display: inline-block;
					}

					.red {
						background: #e34f68;
					}

					.green {
						background: #28baa6;
					}
				}


			}
		}
	}
</style>
