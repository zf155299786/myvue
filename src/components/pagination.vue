<template>

	<!-- 需要传入 
		pageCount 总页数
		pageNow   当前页码
		tab       分类
	 -->
	<div class="pagination">
		<ul>
			<li @click="fastGo(1)">«</li>
			<li v-if="pageNow>3">...</li>
			<li v-for="(item,index) in showPage" :key="index" @click="goNum(item,index)" :class="item==pageNow?'cursor-active':''">{{item}}</li>
			<li v-if="pageNow<pageCount-2">...</li>
			<li @click="fastGo(pageCount)">»</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				pageNow:this.pageNowParent
			}
		},
		props:["pageCount","pageNowParent","tab"],
		methods:{
			 //页码跳转
			goNum(item,index){   
				if(item!=this.pageNow){
					this.pageNow=item;  //让当前页码等于当前点击的那一个
				}
				//跳向这个路由,并把页码传递过去
				this.$router.push({path:"/",query:{page:this.pageNow,tab:this.tab}});
			},
			//快速跳转	
			fastGo(page){    
				this.pageNow=page;
				this.$router.push({path:"/",query:{page:this.pageNow,tab:this.tab}});
			}
		},
		computed:{
			//显示的页码
			showPage(){ 
				let start = 1;   //页码开始
				let arrPage=[];  //初始化页码的数组
				let end=this.pageCount;		//页码结束

				if(this.pageCount>=5){
					//点击的页码在范围内，  -2  +2
					if(this.pageNow>3&&this.pageNow<this.pageCount-2){
						start=this.pageNow-2;
						end=parseInt(this.pageNow)+2; 
					}else{
						//惦记的页码不在范围内， 判断是在前三个还是后几个
						if(this.pageNow<=3){
							start=1;
							end=5;
						}else{
							start=this.pageCount-4;
							end=this.pageCount;
						}
					}
				}
				while(start<=end){
					arrPage.push(start);
					start++
				}
				console.log(arrPage)
				return arrPage;
			} 
		},
	}
</script>

<style lang="scss" scoped>
.pagination{
	margin: 10px 0 0 10px;
	ul{
		margin: 0;
		padding: 0;
		list-style: none;
		&:after{display: block;clear: both;content:"";}
		li{
			&:hover{background:#f6f6f6;}
			cursor:pointer;
			color:#999;
			padding: 4px 12px;
			line-height: 20px;
			border:1px solid #ddd;
			float: left;
		}
		.cursor-active{
			color:#80bd01;
		}
	}
}

</style>
