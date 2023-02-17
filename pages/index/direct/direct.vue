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
					{{total.children}}
				</view>
			</view>
			<view class="card-back-line" />
			<view class="content-card-back">
				<view class="card-back-key">
					Recharged peoples:
				</view>
				<view class="card-back-value">
					{{total.recharged}}
				</view>
			</view>
			<view class="card-back-line" />
			<view class="content-card-back">
				<view class="card-back-key">
					Cashed Amount:
				</view>
				<view class="card-back-value">
					₹{{total.consume}}
				</view>
			</view>
		</view>
		<view class="content-black">
			<view class="content-black-row">
				<view class="black-row-key">
					My Promotion Code
				</view>
				<view class="black-row-value">
					{{userId}}
				</view>
			</view>
			<view class="content-black-row">
				<view class="black-row-key">
					My Promotion Link
				</view>
				<view class="black-row-value">
					{{siteUrl}}
				</view>
			</view>
			<view class="content-black-button">
				<button type="default" @click="copyText(siteUrl)">Copy
					Link</button>
			</view>
		</view>
		<view class="content-header">
			<view :class="navigator == 1 ? 'content-header-item header-item-active' : 'content-header-item'"
				@click="setNavigator(1)">
				Level 1（{{count.level1}}）
			</view>
			<view :class="navigator == 2 ? 'content-header-item header-item-active' : 'content-header-item'"
				@click="setNavigator(2)">
				Level 2（{{count.level2}}）
			</view>
			<view :class="navigator == 3 ? 'content-header-item header-item-active' : 'content-header-item'"
				@click="setNavigator(3)">
				Level 3（{{count.level3}}）
			</view>
		</view>
		<view class="content-direcct">
			<uni-search-bar v-model="searchValue" @confirm="getMembers" radius="100" placeholder="Search"
				bgColor="#f8f8f8" cancelButton="none">
			</uni-search-bar>
			<!-- <view class="direcct-in_come">
				Total commissio：
				<view class="direcct-in_come-text">₹{{level.level1.commissio}}</view>
			</view> -->
			<view class="direcct-black-content" style="border: none;">
				<view class="direcct-black">
					<view class="direcct-black-key">
						ID
					</view>
				</view>
				<view class="direcct-black">
					<view class="direcct-black-key">
						Phone
					</view>
				</view>
				<view class="direcct-black">
					<view class="direcct-black-key">
						Water reward
					</view>
				</view>
				<view class="direcct-black">
					<view class="direcct-black-key">
						First reward
					</view>
				</view>
			</view>
			<view class="direcct-black-content" v-for="(item,index) in tableData" :key="index">
				<view class="direcct-black">
					<view class="direcct-black-value">
						{{item.id}}
					</view>
				</view>
				<view class="direcct-black">
					<view class="direcct-black-value">
						{{item.mobile}}
					</view>
				</view>
				<view class="direcct-black">
					<view class="direcct-black-value">
						₹{{item.water}}
					</view>
				</view>
				<view class="direcct-black">
					<view class="direcct-black-value">
						₹{{item.first}}
					</view>
				</view>
			</view>
			<uni-load-more :status="status" :content-text="contentText" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: null,
				searchValue: null,
				navigator: 1,
				page: 1,
				status: 'more',
				contentText: {
					contentdown: 'Pull up to load more',
					contentrefresh: 'Under load...',
					contentnomore: 'No more'
				},
				total: {
					children: 0,
					recharged: "0.00",
					consume: "0.00"
				},
				count: {
					level1: 0,
					level2: 0,
					level3: 0
				},
				tableData: [],
				siteUrl: null,
			}
		},
		onLoad() {
			this.routeGuard()
			this.getUserTeam()
			this.getMembers()
			this.userId = uni.getStorageSync('userInfo').id
			this.siteUrl = `${uni.getStorageSync('settings').site_url}/#/pages/login/login?code=${this.userId}`
		},
		onReachBottom() {
			this.clickLoadMore()
		},
		methods: {
			getUserTeam() {
				this.uniRequest('user/team', {}, 'GET').then((res) => {
					if (res.code === 0) {
						this.total = res.data.total;
						this.count = res.data.count;
					}
				})
			},
			getMembers() {
				this.status = 'loading'
				let url
				if (this.searchValue) {
					url = `user/members?level=${this.navigator}&mobile=${this.searchValue}&page=${this.page}`
				} else {
					url = `user/members?level=${this.navigator}&page=${this.page}`
				}
				this.uniRequest(url, {}, 'GET').then((res) => {
					if (res.code === 0) {
						if (res.data.list.length > 0) {
							this.tableData = res.data.list
						} else {
							this.status = "noMore"
						}
						if (res.data.total < 9) {
							this.status = "noMore"
						}
						// console.log(res)
					}
				})
			},
			setNavigator(value) {
				this.tableData = []
				this.navigator = value
				this.getMembers()
			},
			//复制链接
			clickLoadMore(status) {
				if (this.status == "more") {
					this.pages = this.pages + 1
					this.getMembers()
				}

			},
			copyText(value) {
				uni.setClipboardData({
					data: value,
					success: function() {
						uni.showToast({
							title: 'Copy successfully！',
							duration: 2000,
							icon: 'none'
						});
					},
					fail: function(err) {
						uni.showToast({
							title: 'Copy failure！',
							duration: 2000,
							icon: 'none'
						});
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.content {
		padding-top: 20rpx;

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

			.card-back-line {
				height: 1px;
				background-color: #e2e2e2;
			}
		}

		.content-black {
			background: #ffffff;

			.content-black-row {
				border-bottom: 1px solid #aeafaf;
				padding: 20rpx;
				margin: 0 10rpx;

				.black-row-key {
					color: #aeafaf;
				}

				.black-row-value {
					color: #000;
				}
			}

			.content-black-button {
				width: 50%;
				margin: 40rpx auto;
			}
		}

		.content-header {
			height: 70rpx;
			padding: 20rpx;
			background: #ffffff;
			border-bottom: 1px solid #e9e8e7;
			margin-bottom: 26rpx;
			display: flex;
			justify-content: space-evenly;
			align-items: center;

			.content-header-item {
				display: inline-block;
				// margin-right: 40rpx;
				font-weight: 700;
				font-size: 26rpx;
				color: #6b6c6e;
				transition: all .2s ease-in-out;
				-webkit-transition: all .2s ease-in-out;
			}

			.header-item-active {
				font-size: 36rpx;
				color: #000;
			}
		}

		.content-direcct {
			background: #fff;
			// min-height: 50vh;

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

			.direcct-black-content {
				border-bottom: 2px solid #f5f6f7;

				.direcct-black {
					display: inline-block;
					margin-top: 36rpx;
					width: 25%;
					text-align: center;

					.direcct-black-key {
						color: #000;

					}

					.direcct-black-value {
						font-size: 24rpx;
						padding: 20rpx 0;
						color: #aeafaf;

					}
				}
			}


		}
	}
</style>
