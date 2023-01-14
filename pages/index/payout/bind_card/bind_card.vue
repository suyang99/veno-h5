<template>
	<view class="content">
		<view class="content-hint">
			<image class="content-hint-icon" src="../../../../static/index/note-icon.png" mode=""></image>
			<view class="content-hint-content">
				The same account can only be bound to one account
			</view>
		</view>
		<view class="content-recharge">
			<view class="recharge-input">
				<uni-easyinput type="text" v-model="inputValue.bank_name" placeholder="Bank Account holder"
					:inputBorder='false' :clearable="false" />
			</view>
			<view class="recharge-input">
				<uni-easyinput type="text" v-model="inputValue.account_holder" placeholder="Bank Account"
					:inputBorder='false' :clearable="false" />
			</view>
			<view class="recharge-input">
				<uni-easyinput type="text" v-model="inputValue.account_num" placeholder="IFSC" :inputBorder='false'
					:clearable="false" />
			</view>
			<view class="recharge-input">
				<uni-easyinput type="text" v-model="inputValue.ifsc" placeholder="Bank Name" :inputBorder='false'
					:clearable="false" />
			</view>
			<view class="content-pay" @click="accountBindBank">
				Submit
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputValue: {
					bank_name: 'RenLishisan',
					account_holder: '888888888818',
					account_num: '188888',
					ifsc: 'CDCC',
				}
			}
		},
		methods: {
			accountBindBank() {
				this.uniRequest('user/account/bind_bank', this.inputValue).then((res) => {
					if (res.code === 0) {
						uni.showModal({
							content: res.data.message,
							showCancel: false,
							confirmText: 'Enter',
							success: function(res) {
								if (res.confirm) {
									uni.navigateBack()
								}
							}
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 40rpx;

		.content-hint {
			padding: 20rpx;
			display: flex;
			align-items: center;
			color: rgb(25, 137, 250);
			background: rgb(236, 249, 255);
			border-radius: 20rpx;

			.content-hint-icon {
				width: 35rpx;
				height: 35rpx;
				margin-right: 10rpx;
			}

			.content-hint-content {
				position: relative;
				white-space: normal;
				word-wrap: break-word;
			}
		}

		.content-recharge {
			margin-top: 40rpx;

			.recharge-input {
				padding: 20rpx;
				margin-bottom: 20rpx;
				background: #f7f7f7;
				border: 1px solid #f2f2f2;
				border-radius: 30rpx;


				::v-deep .uni-easyinput__content {
					background-color: rgba(0, 0, 0, 0) !important;
				}

				::v-deep .uni-input-input {
					font-size: 20px;
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
	}
</style>
