<template>
	<view class="content">
		<view class="content-header">
			<view :class="navigator == 0 ? 'content-header-item header-item-active' : 'content-header-item'"
				@click="switchover">
				Trading Pairs
			</view>
			<view :class="navigator == 1 ? 'content-header-item header-item-active' : 'content-header-item'"
				@click="switchover">
				History
			</view>
		</view>
		<view class="mraket-list" v-if="recordList.length > 0">
			<view class="mraket-list-item" v-for="(item,index) in recordList" :key="index">
				<view class="list-item-header">
					<view :class="item.direction == 1? 'item-header-text1 red' : 'item-header-text1 green'">
						{{item.direction == 1? "CALL" : "PUT"}}
					</view>
					<view class="item-header-text2">
						{{item.goods_name}}/USDT
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
							{{item.created_at}}
						</view>
					</view>
					<view class="item-black-child">
						<view class="black-child-key">
							Openning Price
						</view>
						<view class="black-child-value">
							{{item.opening}}
						</view>
					</view>
					<view class="item-black-child" style="text-align: right;">
						<view class="black-child-key">
							Closing Price
						</view>
						<view class="black-child-value">
							{{item.closing}}
						</view>
					</view>
				</view>
				<view class="list-item-black">
					<view class="item-black-child">
						<view class="black-child-key">
							Total
						</view>
						<view class="black-child-value">
							₹{{item.amount}}
						</view>
					</view>
					<view class="item-black-child">
						<view class="black-child-key">
							Status
						</view>
						<view v-if="navigator === 0"
							:class="item.result === 1 ? 'black-child-value green':'black-child-value'">
							<!-- {{item.result === 1 ? 'Profit' : 'Loss'}} -->
							Processing
						</view>
						<view v-else :class="item.result === 1 ? 'black-child-value green':'black-child-value'">
							{{item.result === 1 ? 'Profit' : 'Loss'}}
						</view>
					</view>
					<view class="item-black-child" style="text-align: right;">
						<view class="black-child-key">
							Settlement
						</view>
						<view v-if="item.result === 1" class="black-child-value">
							₹{{Number(item.amount)+Number(item.gain)}}
						</view>
						<view v-if="item.result !== 1" class="black-child-value">
							₹0
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mraket-list">
			<uni-load-more :status="status" :content-text="contentText" />
			<!-- <view style="text-align: center;">
				- No more -
			</view> -->
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: 'more',
				contentText: {
					contentdown: 'Pull up to load more',
					contentrefresh: 'Under load...',
					contentnomore: 'No more'
				},
				pages: 0,
				navigator: 1,
				recordList: []
			}
		},
		onLoad() {
			this.routeGuard()
			this.getRecordList()

		},
		onReachBottom() {
			this.clickLoadMore()
		},
		methods: {
			switchover() {
				this.recordList = []
				this.navigator = this.navigator === 0 ? 1 : 0
				this.pages = 1
				this.getRecordList()
			},
			getRecordList() {
				this.status = 'loading'

				let url = `trade/record?type=${this.navigator === 0 ? 'pairs' : 'history'}&page=${this.pages}`
				this.uniRequest(url, {}, "GET").then((res) => {
					if (res.data.list.length > 0) {
						res.data.list.map((item) => {
							item.created_at = this.formatDateTime(item.created_at).split(' ')[1]
							this.recordList.push(item)
						});
						this.status = 'more'
					} else {
						this.status = "noMore"
					}
					if (res.data.total < 9) {
						this.status = "noMore"
					}
				})
			},
			clickLoadMore(status) {
				if (this.status == "more") {
					this.pages = this.pages + 1
					this.getRecordList()
				}

			}
		}
	}
</script>

<style lang="scss">
	.content {
		min-height: 94vh;
		background: #f6f7f9;

		.content-header {
			position: sticky;
			top: 5%;
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
