<template>
	<view class="content">
		<view class="kline-header">
			<view class="kline-header-left">
				<view class="header-left-price">
					4.9112
				</view>
				<view class="header-left-black">
					≈₹332.27
					<view class="left-black-call">
						1.06%
					</view>
				</view>
			</view>
			<view class="kline-header-right">
				<view class="header-right-balck">
					<view class="right-balck-key">
						High
					</view>
					<view class="right-balck-value">
						4.97
					</view>
				</view>
				<view class="header-right-balck">
					<view class="right-balck-key">
						Low
					</view>
					<view class="right-balck-value">
						4.822
					</view>
				</view>
				<view class="header-right-balck">
					<view class="right-balck-key">
						24H
					</view>
					<view class="right-balck-value">
						$0.02B
					</view>
				</view>
			</view>

		</view>
		<view class="kline-time">
			<view :class="activeNav == 0 ?'kline-time-item time-item-aktive' : 'kline-time-item'"
				@click="activeNav = 0">
				1M
			</view>
			<view :class="activeNav == 1 ?'kline-time-item time-item-aktive' : 'kline-time-item'"
				@click="activeNav = 1">
				15M
			</view>
			<view :class="activeNav == 2 ?'kline-time-item time-item-aktive' : 'kline-time-item'"
				@click="activeNav = 2">
				30M
			</view>
			<view :class="activeNav == 3 ?'kline-time-item time-item-aktive' : 'kline-time-item'"
				@click="activeNav = 3">
				1DAY
			</view>
		</view>
		<view class="kline-chart">
			<echarts :option="echartsOption" style="height: 45vh;" />
		</view>
		<view class="kline-btns">
			<view class="kline-balance">
				<view class="kline-balance-key">
					₹95.00
				</view>
				<view class="kline-balance-value">
					Balance
				</view>
			</view>
			<view class="kline-btns-focus">
				1M
			</view>
			<view class="kline-btns-amount">
				<view class="btns-amount-operation btns-amount-minus"
					@click="inputValue > 10? inputValue = inputValue - 10 : inputValue = 0">
					-
				</view>
				<view class="recharge-input">
					<uni-easyinput type="text" v-model="inputValue" :inputBorder='false' :clearable="false" />
				</view>
				<view class="btns-amount-operation btns-amount-add" @click="inputValue = inputValue + 10 ">
					+
				</view>
			</view>
			<view class="kline-btns-balck">
				<view class="btns-balck-child kline-btns-call">
					<image class="balck-child-icon"
						src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAYAAAD9yHLdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAACP1JREFUeNrt3X/sVfMfB/BzPkgkFKVi9HNopdLMr8yYpvIxS5jJzFhmjOYf/rFp80//2GjIPw0rJjQy+klJSWNmEjbElLb8aEvaknTP94/XTnyMr8/n43N733Pv4/HPa+/z+ef1ufec9/Oec8/73CwDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACosjx1A5BSURRFUfTpE6P29qiTJmVFVmTFkCFZnuVZXqvF9u++i7puXfx92bK8LW/L2377LfX/AUCdRWDkedS77ipqRa2o/fhj0S3bt0e96abU/xcAdRITfe/eURcv7l5g/Jv58yOQjjwy9f8LwH8UE3u/flHXratPcPzVypURJH37pv7/AeiimMiHDIn68ceHJzj+6v33I0gGDkz9egDwL2LCHjMmJvBt29IEx5/UilpR27o16qhRqV8fAP4iZuvLLou6e3fq3Ph7O3dGnTgx9esF0PJiQp4xI+q+fakj4l/VilpR27s3BtOmpX79AFpOTMCzZ0c9eDB1LnTPgQMRKLNmpX49AZpWTLjl+o25c1NP/T2rVos6Z07q1xmgacQn9F69YoJ9/vnUU339s6SoFbUFC6wnAeimch1FzKorV6ae19N49dWoxxyT+v0AaHgxYQ4eHAHy0Uepp/DkakWtqG3aFHXAgNTvD0DDidly9Oio336bet5uTF9+GUEycmTq9wuyLMvaUjdAa4uJ8YIL4um269bF1tNPT91XYxo5Mp4OvH59vG4TJqTuiNYmQEgiJsDp02O0Zk1MjCefnLqvahg0KOo778TrOGVK6o4A6i4mvHvuiVrV9RuNZv/+qDNnpn5/AXpMTGzl+o05c1JPtc3NehKgCXRcv7FoUeqptTXNmxe1zaVq6sJP2tKjIjiOOy6+03jppdjqGn1ar7wSdebMPM/zPN+3L3VHNAcBQo+IT7rll7tvvBH13HNT98Wfvfde1KuvjiDZtSt1R1SbAOE/ieAYMSJGK1ZEtU6hsX32Wdw2PXVq3pa35W3btqXuiGpybZRuiUtV558fo/KTreCohtGj4xLjpk3xAWD8+NQdUU0ChC6JCeeaa2ICWrMmtnrERjUNHhx17dp4Xy+9NHVHVIsAoVNigrntthi9/HLUY49N3Rc94cQTo65aFe/zjTem7ohqECD8rZhI/li/EVsXLIjqMePNqVevqOVj8++/P3VHNDZfotNBx9+hePLJuFTlF/Na27x5Ue+7L+7eqtVSd0RjECBkWVaecfTpE6MXX4zqN7v5syVLot58cwTJr7+m7oi0BEiLizOOU06JM41y/cbEian7opGtXRu3AU+fHrcB//xz6o5IQ4C0qDjjGD48RuX6jVGjUvdFlWzZEkEybVoEyfbtqTvi8PIleouJM47zzotRuX5DcNAdY8YcWk9SK2pF7ZxzUnfE4SVAWkQc4JMnxwH/1luxdeDA1H3RDIYMif3q7bdjP7vkktQdcXgIkCYXl6puvbXjdxx9+6bui2bUr1/sZ6tXx353ww2pO6K+BEiTigP4gQdi9PTTUY86KnVftIKjj45arie5++7UHVEfvkRvEnGgHnFEjB5/POqdd6buC/5gPUmzESAVF8FRPlJk8eKo7e2p+4J/tnBh3L11++1x99aBA6k7onsESEVFcPTvH6PXXot68cWp+4JOKbIiK8qbOa69NoJkz57UbdE1AqRiIjiGDYvR8uVRzzwzdV/QfZ98EnXq1Li0tWNH6o7oHF+iV0TH++zXr48qOGgGY8dG3bAhPiDZr6tCgDS4CI4rrojbI8vgOPXU1H1Bzxs6NOrGjbHfT5qUuiP+PwHSoOIAuuWWCI5ly2Lr8cen7gvqr3//Q+tJakWtqF13XeqO+HsCpMHEKfzs2XEAPfNMbLV+g1bUu3ccBy+8EMeF29IbjQBJrFy/EfWJJ2Lro49Gzd3kAFm5vmn+/DhO5s4tf/AsdWetzhuQSJyalyt2Fy6MT1rXX5+6L6iOZ5+N24FnzbKeJA0BcpjFJ6d+/WK0dGlUD5+DbimyIitWr47BjBkRJL/8krqtViFADpMIjqFDY4dfvjzOOM46K3Vf0Dw++CCOr/b2CJIffkjdUbMTIHUWl6rK300oF/6ddlrqvqB5ffNNBMmUKREkX3yRuqNm5Uv0Ookzjssvj+DYsCG2Cg6ov2HD4rjbuDGOw4suSt1RsxIgPazjfevl72+ccELqvqD1nHRSnImsWhVBctVVqTtqNgKkh3Rcv1E+Fbd379R9QUvLszzL+/SJwdKlcZzecUfqtpqFAOmm2BHb2qI+9lhsLddvtHldoeGU60meeiquFDz4YOqOqs5E95888kjUe+9N3QnQWXkeZyYPPxwfAB96KHVHVeUurC6KHW7mzBgtWpS6H6AHFFmRFZMnx11bb76Zup2qECCddOjRCUVWZMVXX8UnmOHDU/cF9IAiK7Ji06YIkAsvTN1OVQiQToprpmPHRnBs3py6H6CnFUUEyaBBFiJ2ju9AuuSMM1J3ANRL+XBGx3lnCZDOyrM8y/ftS90GUEd5lmf53r2p26gKAdJZRVZkxZYtMTh4MHU7QE/bsyeO86+/Tt1JVQiQToprot9/H6PyFwKB5vHcc3Gc79+fupOq8CV6F8XdWCNGxOjDD6N6VAlU144dUceNy/M8z/Ndu1J3VBXOQLoodrCtW2NUPltn9+7UfQFdtXNn1CuvFBzdI0C6KXa4d9+N0YQJUVesSN0X8E+KIuqSJfFdx/jxcRx/+mnqzqrKJaweFutFxo2Luzna22Pr2WdHHTAgdlzPyoK6yLM8y3//PQY//RTH2+bNsf311yMwPv88dZsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANBF/wP62dqS2sMCMQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wOS0xMlQxMzo0NToyMiswODowMKPKegoAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDktMTJUMTM6NDU6MjIrMDg6MDDSl8K2AAAASXRFWHRzdmc6YmFzZS11cmkAZmlsZTovLy9ob21lL2FkbWluL2ljb24tZm9udC90bXAvaWNvbl92aTNqNjJsbDN5L2ppYW50b3Uuc3Zn+p8QXQAAAABJRU5ErkJggg=="
						mode="aspectFit" />
					CALL
				</view>
				<view class="btns-balck-child kline-btns-put">
					<image class="balck-child-icon"
						src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAYAAAD9yHLdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAA39JREFUeNrt1c1N41AYhlE70Ap0wJ4VVVAcEktKoZhQge8szIwUJiG24/t/zubKu1ey9D3DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQFnG3ANKEaYwhenxcRiHcRifn3PvAQoUhjCE43E8jIfx8PGRe05uAvIthBBCuLubv97e5vf1NfcuoBRfX3NAXl7mgHx+5l6Um4D8ICTAKeG4REAuEBLonXBcIyBXCAn0RjiWEpCFhARaJxxrCchKQgKtEY6tBGQjIYHaCcetBORGQgK1EY69CMhOhARKJxx7E5CdCQmURjhiEZBIhARyE47YBCQyIYHUhCMVAUlESCA24UhNQBITEtibcOQiIJkICdxKOHITkMyEBNYSjlIISCGEBK4RjtIISGGEBH4SjlIJSKGEBISjdAJSOCGhP8JRCwGphJDQPuGojYBURkhoj3DUSkAqJSTUTzhqJyCVExLqIxytEJBGCAnlE47WCEhjhITyCEerBKRRQkJ+wtE6AWmckJCecPRCQDohJMQnHL0RkM4ICfsTjl4JSKeEhNsJR+8EpHNCwnrCwUxAGIZBSFhCODglIJwQEv4nHJwnIJwlJAgH1wgIvxKSHgkHywgIiwhJD4SDdQSEVYSkRcLBNgLCJkLSAuHgNgLCTYSkRsLBPgSEXQhJDYSDfQkIuxKSEgkHcQgIUQhJCYSDuASEqIQkB+EgDQEhCSFJQThIS0BISkhiEA6gI39DMr/v74ENjscwhSlMT0+5/ydAcvMhFJJ1hAPgn/kwCsnvhAPgovlQCskp4QBYbD6cvYdEOAA26zMkwgGwmz5CIhwA0bQZEuEASKaNkAgHQDZ1hkQ4AIpRR0iEA6BYZYZEOACqUUZIhAOgWnlCIhwAzUgTEuEAaFackAgHQDf2CYlwAHRrW0iEA4Bvy0IiHABccD4kwgHAQnMw7u/n9+Eh9x4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA6/4A5kzF9ODjq2EAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDktMTJUMTM6NDU6MjIrMDg6MDCjynoKAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA5LTEyVDEzOjQ1OjIyKzA4OjAw0pfCtgAAAFF0RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vaG9tZS9hZG1pbi9pY29uLWZvbnQvdG1wL2ljb25fdmkzajYybGwzeS9qaWFudG91YXJyb3c0ODYuc3ZnkzlJWAAAAABJRU5ErkJggg=="
						mode="aspectFit" />
					PUT
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import echarts from '@/components/echarts/echarts.vue'
	export default {
		components: {
			echarts
		},
		data() {
			return {
				activeNav: 0,
				inputValue: 0,
				xAxisDatas: ['', '', '', '', '', '', '', '', '', '', ''],
				yAxisDatas: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				echartsOption: {
					animation: false,
					grid: {
						left: '0', //距离左边的距离
						right: '0', //距离右边的距离
						bottom: '10px', //距离下边的距离
						top: '10px' //距离上边的距离
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						splitLine: {
							show: true,
							lineStyle: {
								type: 'dashed',
								color: 'rgba(128, 128, 128, 0.3)'
							}
						},
						axisLabel: {
							show: false, // 不显示坐标轴上的文字
						},
						data: []
					},
					yAxis: {
						axisLabel: {
							inside: true,
							textStyle: {
								color: '#639cab'
							}
						},
						type: 'value',
						position: 'right',
						splitLine: {
							show: true,
							lineStyle: {
								type: 'dashed',
								color: 'rgba(128, 128, 128, 0.3)'
							}
						},
						interval: 20,
					},
					series: [{
						symbol: "none",
						data: [],
						type: 'line',
						areaStyle: {
							normal: {
								color: '#48647f ' //改变区域颜色
							}
						},
						itemStyle: {
							normal: {
								lineStyle: {
									color: '#639cab'
								}
							}
						},

					}],
					tooltip: {
						show: true,
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						},
					}
				}
			}
		},
		onLoad(option) {
			this.routeGuard()
			uni.setNavigationBarTitle({
				title: option.name + '/USTD'
			})
			this.initEchartsData()
		},
		methods: {
			initEchartsData() {
				let NewXAxisDatas = this.yAxisDatas;
				NewXAxisDatas.splice(0, 1)
				NewXAxisDatas[9] = Math.floor(Math.random() * (100 - 0) + 0)
				this.yAxisDatas = NewXAxisDatas;
				this.echartsOption.series[0].data = NewXAxisDatas

				setTimeout(() => {
					this.initEchartsData()
				}, 1000)
			}
		}
	}
</script>

<style lang="scss">
	.content {
		min-height: 94vh;
		background: #161e31;

		.kline-header {
			padding: 20rpx;

			.kline-header-left {
				width: 50%;
				display: inline-block;

				.header-left-price {
					font-size: 55rpx;
					color: #28baa6;
				}

				.header-left-black {
					color: #677288;

					.left-black-call {
						display: inline-block;
						margin-left: 10rpx;
						font-size: 24rpx;
						color: #28baa6;
					}
				}
			}

			.kline-header-right {
				width: 50%;
				display: inline-block;

				.header-right-balck {
					font-size: 24rpx;

					.right-balck-key {
						display: inline-block;
						width: 50%;
						color: #677288;
						text-align: right;
					}

					.right-balck-value {
						display: inline-block;
						width: 50%;
						color: #c6cbda;
						text-align: right;
					}
				}
			}
		}

		.kline-time {
			background: #171b28;

			.kline-time-item {
				display: inline-block;
				color: #4a5e78;
				width: 25%;
				text-align: center;
				padding: 6rpx 0;
			}

			.time-item-aktive {
				color: #fff;
				border-bottom: 1px solid #6cb7a6;
			}
		}

		.kline-chart {
			color: white;
			// border: 1px solid red;
		}

		.kline-btns {
			padding: 30rpx;

			.kline-balance {
				width: 50%;
				text-align: center;

				.kline-balance-key {
					color: #fff;
				}

				.kline-balance-value {
					color: #4d5675;
				}
			}

			.kline-btns-focus {
				width: 40rpx;
				margin: 10rpx 0;
				padding: 2rpx 55rpx;
				transform: scale(1.1);
				transition: all .3s ease-in-out;
				background: #ccdcfa;
				border: 1px solid #528bf6;
				color: #000;
				border-radius: 10rpx;
			}

			.kline-btns-focus:before {
				content: " ";
				background-size: contain !important;
				display: block;
				background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAArCAYAAADsQwGHAAAEmUlEQVRYhdWZW2wUVQCG/710d+2FErGkaUJKrNFU0FBtFNNgTSReUgmKAQPeXtDwwtYEQzGalAexxQcFi70ktqApSelSkl4EFlpta+FBrBjBUrWSNG2RCtqd3ZnOfY6ZoS3bPbvtdHubfsk+7P5nJ1/P/ufMpbaASLCUONzIHnAuIV9b+6/i570DyjtLRdrR8qNQ7u8W3tUImKUg7azrGD3W1SO9LivGe83q0q6v/Fzd5T75FUWb+CxkZenELxrZk72DyouqNjmwqnRKqS/U1D+sPqPRmxtvRenlxbXBM8Mj2nra10CymnTa3hrGz3Akh0ruQqwknVFYFWgVJGRTyWSClpCWVZLprWDaNIIsKoyCnf5oYQmw6oO7K5hOs8IAhEWd6cHbytqSevY8IUinwtiIiybdOyg/9mUzd05RsYIKp2FRpLv/lPK+bh39VlKQSoXTs/DXHh1XhGcbLgiNooIkKjTJgkqfviQUnO0WTooyPFRonoVbiPWd/NauHrFWlOGiwpmxMAux2s+99ct1uUZS4KDCOJh36bImdte1AaVc1WCjwviY34V40Bd6v39Y/VQlcyZsMG/S+2uDxTcD2n4S41JtKvLXuHDfMjt+6pPRf0uNHDkvnbYV1TClAY7spRITbH7Cg1ef8sDlBF7IcaOwOojRyU8MhLm+9rAVVgWOxCv88ContuXdEdZJcNqQtoxWnLOZllXi8FYw1RrB21RogkS3DUVbkuEIc2Q4LVo95ubSNMCqrn3HQt8Qgteo0CQfbU2GPWy56pX4rImL9uXZ3wQM/at4Sk6w9YRgExWaZPuGe5BxrwMJY7u4IAO+i0K0Wcasb7d6B+XE8hauUVaxkQpNovf4pVz3RC0UFfjjhoIzP4uxDsDTLTdJd5+UWtHC+UWZFs59IAGlb6bg6TVTn7Gj9XhUIjjUHLUWE8Q1051XxBUNF/izgozcyCwzzQFvQZKxA+zcmIhHM52oaeMjty2DyB7rs3zAx0YdG0ZoxjN9+hKf3nCR/z6aMMZ+bvvYUXXx9Q+58MkbKcYfE05kj/VHXsc7+Vg9DkebkbTvB36Vv1tsFyQ8QoVjdPwmYYTVjFnTcdqB9OV2fLwjxagNwnrsufPWGHttaMoehyObfj5dc467//JfcpukYDUVRqB3dc/mJGSlO+BJuPv7SwrQflVE/lo33GHFDPIE79FnvlhsMCVd1sRm/z6otMoqMqhwCvQKhO8MGNt/9TPdeC30Wf7weMhMLcaZXvqgL7Su/x/Vr2pYSYUm0Kuwb0vyxKk5HFEG6rp4s7UYZ92UnS6uDT55/ab6XbzCOj0DCvYcDeLvEc2oxziyCgz9p85UGATQYs500VEmn2FJMwFSqDBOdhck4fGsBGNx6k9Dd1UyZnscTnZU6cKqwPOChFP6mqLCWaLXRX91XJVwK6jFc7DMSdKyQuCtZF7WCE7o2yw13BpkTnRavwz0VjI7NAKfhYWRmgjWWNNDtxWU1LM7NYJK/T9J1EgL4d2UrDr7bigoa2a9sopD+p2HlYW35bmxeqVDsR9pZj8QJBy2qvC4lH4b9lyOBzaA+x9acQxsktZs9AAAAABJRU5ErkJggg==) no-repeat 100% 100%;
				width: 40rpx;
				height: 37rpx;
				position: absolute;
				right: 0;
				bottom: 0;
			}

			.kline-btns-amount {
				margin: 20rpx 0;
				display: flex;

				.btns-amount-operation {
					display: flex;
					justify-content: center;
					align-items: center;
					background: #2e3e5c;
					width: 80rpx;
					height: 80rpx;
					text-align: center;
					color: #fff;
					border-radius: 20rpx;
					font-size: 36rpx;
				}

				.btns-amount-minus {
					margin-right: 10rpx;
				}

				.recharge-input {
					width: 300rpx;
					padding: 10rpx;
					margin-bottom: 20rpx;
					background: #2e3e5c;
					border-radius: 20rpx;

					::v-deep .uni-easyinput__content {
						background-color: #2e3e5c !important;
					}

					::v-deep .uni-input-input {
						height: 36rpx;
						font-size: 20px;
						color: #fff;
					}
				}

				.btns-amount-add {
					margin-left: 10rpx;
				}
			}

			.kline-btns-balck {
				display: flex;

				.btns-balck-child {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 48%;
					border-radius: 20rpx;
					height: 105rpx;
					font-weight: 700;
					color: #fff;
					font-size: 36rpx;

					.balck-child-icon {
						width: 50rpx;
						height: 50rpx;
						margin-right: 20rpx;
					}
				}

				.kline-btns-call {
					background: #28baa6;
				}

				.kline-btns-put {
					margin-left: 20rpx;
					background: #e34f68;
				}
			}


		}

	}
</style>
