<template>
	<view class="content">
		<view v-if="pageType=='award'" class="content-list">
			<view class="list-item" v-for="(item,index) in dataList" :key="index" style="display: flex;">
				<view class="list-item-black">
					<view class="item-black-key">
						amount
					</view>
					<view class="item-black-value">
						₹{{item.amount}}
					</view>
				</view>
				<view class="list-item-black" style="text-align: center;">
					<view class="item-black-key">
						people
					</view>
					<view class="item-black-value2">
						{{item.full_name}}
					</view>
				</view>
				<view class="list-item-black" style="text-align: center;">
					<view class="item-black-key">
						remark
					</view>
					<view class="item-black-value2">
						{{item.remark}}
					</view>
				</view>
				<view class="list-item-black" style="text-align: right;">
					<view class="item-black-key">
						time
					</view>
					<view class="item-black-value3">
						{{item.updated_at}}
					</view>
				</view>
			</view>
			<view class="content-list-nomare">
				<uni-load-more :status="status" :content-text="contentText" @clickLoadMore="clickLoadMore" />
			</view>
		</view>
		<view v-else class="content-list">
			<view class="list-item" v-for="(item,index) in dataList" :key="index">
				<view class="list-item-black">
					<view class="item-black-key">
						{{pageType}}
					</view>
					<view class="item-black-value">
						₹{{item.amount}}
					</view>
				</view>
				<view class="list-item-black">
					<view class="item-black-key">
						status
					</view>
					<view class="item-black-value2">
						{{item.status === 1 ? "Finish" : item.status === 2 ? "Finish" : "Wait"}}
					</view>
				</view>
				<view class="list-item-black" style="text-align: right;">
					<view class="item-black-key">
						time
					</view>
					<view class="item-black-value3">
						{{item.updated_at}}
					</view>
				</view>
			</view>
			<view class="content-list-nomare">
				<uni-load-more :status="status" :content-text="contentText" @clickLoadMore="clickLoadMore" />
			</view>
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
				pages: 1,
				dataList: [],
				pageType: '',
			}
		},
		onLoad(op) {
			this.routeGuard()
			this.pageType = op.type
			this.getAccountList()
			uni.setNavigationBarTitle({
				title: (op.type == 'recharge' ? 'Recharge' : op.type == 'withdraw' ? "Withdraw" : "Award") +
					' Record'
			})
		},
		onReachBottom() {
			this.clickLoadMore()
		},
		methods: {
			getAccountList() {
				this.status = 'loading'
				let url = `user/account/record?type=${this.pageType}&page=${this.pages}`
				this.uniRequest(url, {}, 'GET').then((res) => {
					if (res.data.list.length > 0) {
						res.data.list.map(item => {
							item.updated_at = this.formatDateTime(item.updated_at)
							this.dataList.push(item)
						})
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
					this.getAccountList()
				}

			}
		}
	}
</script>

<style lang="scss">
	.content {
		height: 100%;
		background: #f6f7f9;


		.content-list {
			height: 100%;
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
