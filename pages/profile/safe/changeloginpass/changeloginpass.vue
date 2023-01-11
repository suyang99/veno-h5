<template>
	<view class="content">
		<view class="recharge-input">
			<uni-easyinput type="number" v-model="inputValue1" placeholder="Old Password" :inputBorder='false'
				:clearable="false" />
		</view>
		<view class="recharge-input">
			<uni-easyinput type="number" v-model="inputValue2" placeholder="New Password" :inputBorder='false'
				:clearable="false" />
		</view>
		<view class="recharge-input">
			<uni-easyinput type="number" v-model="inputValue3" placeholder="Confirm Password" :inputBorder='false'
				:clearable="false" />
		</view>
		<view class="content-pay" @click="">
			Submit
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
			inputValue1: null,
			inputValue2: null,
			inputValue3: null
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 40rpx;
		padding-top: 180rpx;

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
</style>
