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
			<view class="mraket-list" v-for="(item,index) in tradeGoodsList" :key="index"
				@click="openKlinePage(item.name,item.id)">
				<view class="mraket-list-name">
					<view class="list-name-1">{{item.name}}</view>
					<view class="list-name-2">24H ₹{{item.vol.toFixed(2)}} B</view>
				</view>
				<view class="mraket-list-name">
					<view class="list-name-1">{{item.close}}</view>
					<view class="list-name-2">≈₹{{(rate * item.close).toFixed(2)}}</view>
				</view>
				<view class="mraket-list-name" style="text-align: right;">
					<view :class="item.change >= 0 ? 'mraket-list-change red': 'mraket-list-change green'">
						{{item.change >= 0 ? `+${Math.abs(item.change)}%` : `${item.change}%`}}
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
				tradeGoodsList: [],
				rate: 0
			}
		},
		onLoad() {
			if (this.routeGuard()) {
				this.getTradeGoods()
			}
		},
		methods: {
			randomNumberFun(max) {
				return Number((Math.random() * max)) - (max / 2);
			},
			SetTradeGood() {
				let updateValue1 = Math.floor(Math.random() * this.tradeGoodsList.length)
				let formerAmount = Number(this.tradeGoodsList[updateValue1].close)
				// 生成涨幅随机小数
				let randomNumber = this.randomNumberFun(0.5)
				//涨幅计算
				switch (this.tradeGoodsList[updateValue1].direction) {
					case 1:
						// 涨
						randomNumber = Math.abs(randomNumber)
						break;
					case 2:
						// 跌
						randomNumber = Math.abs(randomNumber) * -1
						break;
				}
				formerAmount += formerAmount * randomNumber
				this.tradeGoodsList[updateValue1].close = formerAmount.toFixed(6)
				this.tradeGoodsList[updateValue1].change = randomNumber.toFixed(2)
				uni.setStorageSync('tradeGoodsList', this.tradeGoodsList)
				setTimeout(() => {
					this.SetTradeGood()
				}, 3000)
			},
			getTradeGoods() {
				this.uniRequest('trade/goods', {}, 'GET').then((res) => {
					if (res.code === 0) {
						let newData = []
						res.data.list.map((item) => {
							newData.push({
								id: item.id,
								name: item.name,
								direction: item.direction,
								close: Number(item.data.close.toFixed(4)),
								vol: item.data.vol,
								change: this.randomNumberFun(9.99).toFixed(2),
								high: item.data.high,
								low: item.data.low,
								high: item.data.high
							})

						})
						this.tradeGoodsList = newData;
						this.rate = res.data.rate;
						uni.setStorageSync('rate', this.rate)
						this.SetTradeGood()

					}
				})
			},
			openKlinePage(name, id) {
				uni.navigateTo({
					url: `/pages/trde/kline/kline?name=${name}&id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding-bottom: 80rpx;

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
