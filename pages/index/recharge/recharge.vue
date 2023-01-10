<template>
	<view class="content">
		<view class="content-available">
			<view class="content-available-key">Available Balance</view>
			<view class="content-available-value">
				₹
				<text style="font-weight: 700;">95</text>
			</view>
		</view>
		<view class="content-recharge">
			<view class="recharge-input">
				<uni-easyinput type="number" v-model="recharge" :inputBorder='false' :clearable="false" />
			</view>
			<view class="recharge-amount">
				<view class="recharge-amount-title">
					Recommended amount
				</view>
				<view class="recharge-amount-focus">
					<view :class="recharge == 2000 ? 'amount-focus-item focus-item-active' : 'amount-focus-item'"
						@click="setRecharge(2000)">
						₹2000
					</view>
					<view :class="recharge == 5000 ? 'amount-focus-item focus-item-active' : 'amount-focus-item'"
						@click="setRecharge(5000)">
						₹5000
					</view>
					<view :class="recharge == 10000 ? 'amount-focus-item focus-item-active' : 'amount-focus-item'"
						@click="setRecharge(10000)">
						₹10000
					</view>
					<view :class="recharge == 30000 ? 'amount-focus-item focus-item-active' : 'amount-focus-item'"
						@click="setRecharge(30000)">
						₹30000
					</view>
					<view :class="recharge == 50000 ? 'amount-focus-item focus-item-active' : 'amount-focus-item'"
						@click="setRecharge(50000)">
						₹50000
					</view>
					<view :class="recharge == 100000 ? 'amount-focus-item focus-item-active' : 'amount-focus-item'"
						@click="setRecharge(100000)">
						₹100000
					</view>
				</view>
				<view class="recharge-amount-paytype">
					<view class="amount-paytype-title">
						Payment Type
					</view>
					<view class="amount-paytype-ac">
						Bank&UPI Transfer
					</view>
				</view>
			</view>
		</view>
		<view class="content-pay" @click="goBankTransferPage">
			NEXT
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recharge: 2000,

			}
		},
		methods: {
			//快速选择充值金额
			setRecharge(value) {
				this.recharge = value
			},
			// 去往转载页面
			goBankTransferPage() {
				uni.navigateTo({
					url: '/pages/index/recharge/bank_transfer/bank_transfer?money=' + this.recharge
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		.content-available {
			padding: 52rpx 40rpx;
			font-size: 32rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #f2f2f2;
		}

		.content-recharge {
			padding: 40rpx;

			.recharge-input {
				padding: 20rpx;
				margin-bottom: 20rpx;
				background: #f7f7f7;
				border: 1px solid #f2f2f2;
				border-radius: 20rpx;


				::v-deep .uni-easyinput__content {
					background-color: rgba(0, 0, 0, 0) !important;
				}

				::v-deep .uni-input-input {
					font-size: 20px;
				}
			}

			.recharge-amount {
				.recharge-amount-title {
					border-bottom: 1px dashed #f5f5f5;
					padding: 3rpx 0;
					margin: 36rpx 0;
					font-size: 36rpx;
					font-weight: 700;
					color: #5ad2fe;
				}

				.recharge-amount-focus {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-evenly;

					.amount-focus-item {
						transform: scale(1);
						transition: all .3s ease-in-out;
						width: 40%;
						padding: 10rpx 0;
						text-align: center;
						border: 1px solid #e9e8e7;
						border-radius: 40rpx;
						overflow: hidden;
						margin-bottom: 10rpx;
						color: #000;
						font-size: 36rpx;
						font-weight: 400;
					}

					.focus-item-active {
						transform: scale(1.01);
						transition: all .5s ease-in-out;
						border: 1px solid #5ad2fe !important;
						color: #fff;
						font-weight: 700;
						background: #beeafa;
					}
				}

				.recharge-amount-paytype {
					margin-top: 60rpx;

					.amount-paytype-title {
						padding: 20rpx;
						border-bottom: 1px solid #d4cff8;
						color: #000;
					}

					.amount-paytype-ac {
						margin-top: 20rpx;
						border-radius: 2rem;
						display: inline-block;
						width: 40%;
						padding: 20rpx 0;
						text-align: center;
						background: #57abec;
						border: 1px solid #57abec;
						margin-left: 15rpx;
						color: #ffffff;
						font-size: 20rpx
					}
				}
			}
		}

		.content-pay {
			width: 95%;
			border: none;
			background-image: linear-gradient(90deg, #5ad2fe, #1c9ced);
			color: #fff;
			text-align: center;
			margin: 40rpx auto;
			padding: 20rpx 0;
			border-radius: 40rpx;
			font-size: 36rpx;
			font-weight: 500;
		}
	}
</style>
