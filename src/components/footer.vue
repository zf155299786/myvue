<template>
	<div >
		<button @click="add">点击</button>
		<p>{{num}}</p>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				arr:[1]
			}
		},
		methods:{
			add(){
				this.arr[0]+=2;
				console.log(this.arr[0]);
			}
		},
		computed:{
			num(){
 				
			}
		}
	}
</script>

<style>

</style>
		