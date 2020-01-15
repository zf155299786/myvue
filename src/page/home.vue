<template>
	<div class="home-content">
		<Header></Header>
		<div class="main">
			<Aside></Aside>
			<div id="content">
				<div class="panel">
					<header>
						<router-link to="/?tab=all" :class="{'active':tab=='all'} " >全部</router-link>
						<router-link to="/?tab=good" :class="{'active':tab=='good'} ">精华</router-link>
						<router-link to="/?tab=share" :class="{'active':tab=='share'} ">分享</router-link>
						<router-link to="/?tab=ask" :class="{'active':tab=='ask'} ">问答</router-link>
						<router-link to="/?tab=job" :class="{'active':tab=='job'} ">招聘</router-link>
						<router-link to="/?tab=dev" :class="{'active':tab=='dev'} ">客户端测试</router-link>
					</header>
					<div class="inner">
						<div class="cell" v-for="item in topicList" :key="item.id">
							<a href="" class="pull-left">
								<img :src="item.author.avatar_url" alt="" :title="item.author.loginname">
							</a>
							<span class="rnum">
								<span class="anser">{{item.reply_count}}</span>
								<span class="click">/ {{item.visit_count}}</span>
							</span>
							<div class="text">  <!--  文本部分 -->
								<span :class="item.top?'put_top':item.good?'put_good':'put_ordinary'">{{item.tab|tabFormat(item.top,item.good)}}</span>
								<a href="" class="t">{{item.title}}</a>
							</div>
							<a href="" class="pull-right">   <!-- 图片时间部分 -->
								<img :src="item.author.avatar_url" alt="" :title="item.author.loginname">
								<span>{{item.last_reply_at|dateFormat}}</span>
							</a>

						</div>
					</div>
					<div class="pagination">
						<ul>
							<li>«</li>
							<li v-for="(item,index) in showPage" :key="index" @click="goNum($event,index)">{{item}}</li>
							
							<li>»</li>
						</ul>

					</div>
				</div>
			</div>
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
	import Header from "@/components/header"
	import Footer from "@/components/footer"
	import Aside from "@/components/aside"
	export default {
		data () {
			return {
				topicList:[], //数据列表
				pageCount:40,  //数据的总页数
				showPage:[1,2,3,4,5], //显示的页码
				pageNow:1,    //当前的页码
				tab:"all"
			}
		},
		mounted(){
			this.getData(this.pageNow,this.tab);  //页面刷新渲染一次数据
		},
		beforeRouteUpdate (to, from, next) {   
    	// 同一页面，刷新不同数据时调用，
    		this.pageNow=to.query.page;
    		this.tab=to.query.tab;
			this.getData(this.pageNow,this.tab); 
		   next();
		},
		methods:{
			getData(page,tab){   //获取数据
				this.$http.get('https://cnodejs.org/api/v1/topics',{
					params:{
						tab,
						page //当前页码
					}
				}).then(res=>{
					console.log(res.data.data)
					this.topicList=res.data.data;
					// console.log(this.topicList);
				})
			},
			goNum(event,index){    //页码跳转
				this.pageNow=event.target.innerHTML;//当前点击的页数
							//跳向这个路由,并把页码传递过去
				this.$router.push({path:"/",query:{page:this.pageNow,tab:this.tab}});

				//页码动态改变
				// this.pageNow=event.target.innerHTML;//当前点击的页数
				// if(index==3&&this.pageNow<39){
				// 	this.showPage.forEach((n,i)=>{
				// 		this.$set(this.showPage,i,n+=1);
				// 	})
				// }
			}
		},
		filters:{
			dateFormat(val){  //时间格式化
				let dateNow=new Date();   //现在时间
				let dateOld=new Date(val);	//修改时间
				let format=dateNow-dateOld;  //时间差

				let miniute=format/1000/60;      
				let hours=miniute/60;
				let day=hours/24;

				if(miniute<1){
					return "几秒前";
				}else if(hours<1){
					return parseInt(miniute)+"分钟前";
				}else if(day<1){
					return parseInt(hours)+"小时前";
				}else {
					return parseInt(day)+"天前";
				}
			},
			tabFormat(val,top,good){     //标题格式化
				if(top){
					return "置顶";
				}else{
					if(good){
						return "精华";
					}
					switch (val){
						case "share":
						return "分享";
						break;
						case "ask":
						return "问答";
						break;
					}
				}
			}
		},
		components:{
			Header,
			Footer,
			Aside
		}
	}
</script>

<style scoped lang="scss">
.main{
	&:after{display: block;clear: both;content:"";}
	width:90%;
	margin:15px auto;
	background: yellow;     //要删掉
	#content{
		margin-right:305px;
		background: #fff;
		padding-bottom:10px;    
		header{
			background: #f6f6f6;
			padding: 10px;
			border-radius:3px 3px 0 0;
			a{
				text-decoration:none;
				color:#80bd01;
				margin:0 10px;
				&:hover:not(.active){color:#005580;}
			}
			.active{
				background: #80bd01;
				color: #fff;
				padding: 3px 4px;
				border-radius:3px;
			}
		}
		.inner{
			.cell{
				display: flex;
				padding: 10px;
				border-top:1px solid #f0f0f0;
				&:first-child{
					border-top:0;
				}
				&:hover{
					background: #f6f6f6;
				}
				.pull-left{
					img{
						width: 30px;
						height: 30px;
					}
				}
				.rnum{
					width: 70px;
					display: inline-block;
					text-align: center;
					line-height: 2em;
					.anser{
						color:#9e78c0;
					}
					.click{
						color:#b4b4b4;
						font-size:10px;
					}
				}
				.text{
					display:flex;
					align-items: center;
					flex:1;
					overflow:hidden;
					.put_top,.put_good{
						white-space:nowrap;
						background: #80bd01;
						padding: 2px 4px;
						color: #fff;
						border-radius:3px;
						font-size:12px;
					}
					.put_ordinary{
						white-space:nowrap;
						background: #e5e5e5;
						padding: 2px 4px;
						color: #999;
						border-radius:3px;
						font-size:12px;
					}
					.t{
						white-space:nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						color: #888;
						font-size:16px;
						margin-left:2px;
						margin-right:50px;
						&:hover{text-decoration:underline;}
						}//设置文字
					}
					.pull-right{
						display: flex;
						align-items: center;
						min-width:70px;
						justify-content:space-between;
						color: #778087;
						img{
							width: 18px;
							height: 18px;
						}
						span{
							font-size:11px;
						}
					}
				}
			}
			.pagination{
				margin: 10px 0 0 10px;
				ul{
					margin: 0;
					padding: 0;
					list-style: none;
					&:after{display: block;clear: both;content:"";}
					li{
						color:#999;
						padding: 4px 12px;
						line-height: 20px;
						border:1px solid #ddd;
						float: left;
					}
				}
			}
		}
	}
</style>
