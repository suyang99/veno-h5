<template>
	<view class="content">
		<view class="content-slideshow">
			<uni-swiper-dot :info="settings.banner" :current="current" field="content" mode="round"
				:dots-styles="dotsStyles">
				<swiper @change="change" class="remake-swiper-item">
					<swiper-item v-for="(item,index) in settings.banner" :key="index">
						<image class="swiper-item" :src="item.image" @click="openUrl(item.image_route)"
							mode="widthFix" />
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<view class="content-operation">
			<view class="content-operation2">
				<view class="content-operation-item" @click="goRechargePage"
					style="background: url(https://dgbroker.in/app/img/deposit_bg@2x.24ebf008.png) no-repeat center center;background-size: contain;">
					<image class="operation-item-icon" src="https://dgbroker.in/app/img/deposit@2x.708eddb6.png"
						mode="aspectFit" />
					<view class="operation-item-name">
						Recharge
					</view>
				</view>
				<view class="content-operation-item" @click="goPayoutPage"
					style="background: url(https://dgbroker.in/app/img/withdraw_bg@2x.af3b5f8f.png) no-repeat center center;background-size: contain;">
					<image class="operation-item-icon"
						src="data:image/png;base64,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"
						mode="aspectFit" />
					<view class="operation-item-name">
						Withdraw
					</view>
				</view>
				<view class="content-operation-item" @click="goDirectPage"
					style="background: url(https://dgbroker.in/app/img/invite_bg@2x.30c9b362.png) no-repeat center center;background-size: contain;">
					<image class="operation-item-icon"
						src="data:image/png;base64,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"
						mode="aspectFit" />
					<view class="operation-item-name">
						Direct
					</view>
				</view>
				<view class="content-operation-item" @click="openUrl(settings.online_service)"
					style="background: url(https://dgbroker.in/app/img/service_bg@2x.7973f282.png) no-repeat center center;background-size: contain;">
					<image class="operation-item-icon" src="https://dgbroker.in/app/img/service@2x.41b858a5.png"
						mode="aspectFit" />
					<view class="operation-item-name">
						Service
					</view>
				</view>
			</view>
		</view>
		<view class="content-widhraw">
			<view class="content-widhraw-title">
				Users Withdraw
			</view>
			<view class="content-widhraw-log">
				<swiper circular="true" vertical="true" interval="1500" display-multiple-items="4" autoplay="true"
					class="mq">
					<swiper-item v-if="accountDataList.length > 0" class="item" v-for="(item,index) in accountDataList"
						:key="index">
						<view class="item-li" style="text-align: left;padding-left: 20rpx;">{{item.full_name}}</view>
						<view class="item-li">₹{{item.amount}}</view>
						<view class="item-li" style="text-align: right; padding-right: 20rpx;">
							{{item.status === 1 ?"Unpaid" : item.status === 2 ? "Finish" : "Reject"}}
						</view>
					</swiper-item>
					<swiper-item v-if="accountDataList.length === 0" class="item">
						<view class="" style="text-align: center;">
							- No more -
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="commonality-window" v-if="commonalityWindow">
			<view class="commonality-window-black">
				<view class="commonality-window-card">
					<view class="window-card-header">
						Notice
					</view>
					<rich-text class="window-card-content" :nodes="noticeContent" />
					<view class="window-card-btn" @click="switchCommonalityWindow">
						Confirm
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
				current: 0,
				dotsStyles: {
					backgroundColor: 'rgba(83, 200, 249,0.3)',
					border: '1px rgba(83, 200, 249,0.3) solid',
					color: '#fff',
					bottom: "60",
					selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
					selectedBorder: '1px rgba(83, 200, 249,0.9) solid'
				},
				commonalityWindow: false,
				settings: {
					banner: [],
					notice: null,
					online_service: null,
					recharge_limit: {
						max: null,
						min: null
					},
					site_domain: null,
					site_logo: "",
					site_name: "",
					withdraw_charge: '',
					withdraw_limit: ''
				},
				noticeContent: '',
				accountDataList: []
			}
		},
		onLoad() {
			if (this.routeGuard()) {
				this.getSettingsFn()
				this.getAccountList()
			}
		},
		methods: {
			getCommonSettings() {

			},
			getNotice(value) {
				this.uniRequest('common/notice?id=' + value, {}, 'GET').then((res) => {
					if (res.code === 0) {
						this.noticeContent = res.data.content;
						this.switchCommonalityWindow()
					}
				})
			},
			getSettingsFn() {
				this.uniRequest('common/settings', {}, 'GET').then((res) => {
					if (res.code === 0) {
						this.settings = res.data
						if (res.data.notice) {
							this.getNotice(res.data.notice)
						}
						uni.setNavigationBarTitle({
							title: res.data.site_name
						})
					}
				})
			},
			getAccountList() {
				let url = `common/withdraw`
				this.uniRequest(url, {}, 'GET').then((res) => {
					this.accountDataList = res.data
				})
			},
			switchCommonalityWindow() {
				this.commonalityWindow = !this.commonalityWindow
			},
			change(e) {
				this.current = e.detail.current;
			},
			goRechargePage() {
				uni.navigateTo({
					url: `/pages/index/recharge/recharge?max=${this.settings.recharge_limit.max}&min=${this.settings.recharge_limit.min}`,
				})
			},
			goPayoutPage() {
				let url =
					`/pages/index/payout/payout?withdrawCharge=${this.settings.withdraw_charge}&withdrawLimit=${this.settings.withdraw_limit}`
				uni.navigateTo({
					url: url
				})
			},
			goDirectPage() {
				uni.navigateTo({
					url: "/pages/index/direct/direct"
				})
			},
			openUrl(url) {
				window.open(url, "_blank");
			},

		}
	}
</script>

<style lang="scss">
	.content {
		background: #f6f7f9;
		height: 100%;
		padding-top: 20rpx;

		.content-slideshow {
			padding: 0 20rpx;
			height: 360rpx;
			overflow: hidden;
			margin-bottom: 10rpx;

			.remake-swiper-item {
				height: 440rpx;
			}

			.swiper-item {
				width: 100%;
				height: 100%;
			}
		}

		.content-operation {
			margin: 0 20rpx;

			.content-operation2 {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.content-operation-item {
					width: 48%;
					height: 80px;
					margin: 10rpx 0;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 20rpx;

					.operation-item-icon {
						width: 80rpx;
						height: 80rpx;
						float: left;
					}

					.operation-item-name {
						width: 180rpx;
						color: #fff;
						font-size: 36rpx;
						padding-left: 36rpx;
						float: left;
					}
				}

			}
		}

		.content-widhraw {
			background: #fff;

			.content-widhraw-title {
				padding: 36rpx 18rpx;
				color: #5ad2fe;
				border-bottom: 1px solid #f2f2f2;
			}

			.content-widhraw-title::before {
				content: " ";
				width: 20rpx;
				background: #5ad2fe;
				float: left;
				height: 36rpx;
				margin-right: 20rpx;
			}

			.content-widhraw-log {
				.mq {
					height: 340rpx;
					background: #fff;

					.item {
						display: flex;
						justify-content: center;
						align-items: center;

						.item-li {
							width: 33%;
							text-align: center;
						}
					}
				}

			}
		}

		.commonality-window {
			box-sizing: border-box;
			position: fixed;
			overflow: auto;
			padding: 40rpx 0;
			top: 0;
			left: 0;
			z-index: 2000;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, .7);

			.commonality-window-black {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				.commonality-window-card {
					width: 85%;
					border-radius: 10rpx;
					background-color: white;

					.window-card-header {
						text-align: center;
						font-size: 36rpx;
						color: #ed662c;
						padding: 36rpx;
						border-bottom: 1px solid #f2f2f2;
						font-weight: 700;
					}

					.window-card-content {
						overflow: scroll;
						height: 70%;
						padding: 20rpx 30rpx;

						h1,
						h2,
						p {
							margin: 20rpx;
						}
					}

					.window-card-btn {
						background: #ed662c;
						display: block;
						padding: 20rpx;
						text-align: center;
						border-radius: 20rpx;
						color: #fff;
						font-size: 40rpx;
						font-weight: 700;
						margin: 40rpx;
					}
				}
			}

		}
	}
</style>
