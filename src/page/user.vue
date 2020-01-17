<template>
	<div id="main">
		<Header></Header>
		<div id="user-content">
			<Aside :isNow="isNow" :author="loginname"></Aside>
			<div id="contents" v-if="authorInfo">
				<div class="panel">
					<header>
						<router-link to="/">主页</router-link>/
					</header>
					<div class="inner" >
						<div class="user_big_avatar">
							<img :src="authorInfo.avatar_url" alt="">
							<span>{{authorInfo.loginname}}</span>
						</div>
						<p>{{authorInfo.score}}积分</p>
						<p class="git">@{{authorInfo.githubUsername}}</p>
						<p>注册时间{{authorInfo.create_at|dateFormat}}</p>
					</div>
				</div>

				<div class="panel">
					<header>
						最近创建的话题
					</header>
					<div class="inner">
						<div class="cell" v-for="item in authorInfo.recent_topics" :key="item.id">
							<router-link :to="'/user/'+item.author.loginname" class="pull-left">
								<img :src="item.author.avatar_url" alt="" :title="item.author.loginname">
							</router-link>
							<span>{{item.author.loginname}}</span>
							<span class="rnum">
								<span class="anser">{{item.reply_count}}</span>
								<span class="click">/ {{item.visit_count}}</span>
							</span>
							<div class="text">  <!--  文本部分 -->
								<span :class="item.top?'put_top':item.good?'put_good':'put_ordinary'">{{item.tab|tabFormat(item.top,item.good)}}</span>
								<router-link :to="'/topic/'+item.id" class="t">{{item.title}}</router-link>
							</div>
							<a href="" class="pull-right">   <!-- 图片时间部分 -->
								<img :src="item.author.avatar_url" alt="" :title="item.author.loginname">
								<span>{{item.last_reply_at|dateFormat}}</span>
							</a>
						</div>
					</div>
				</div>

				<div class="panel">
					<header>
						最近参与的话题
					</header>
					<div class="inner">
						<div class="cell" v-for="item in authorInfo.recent_replies" :key="item.id">
							<router-link :to="'/user/'+item.author.loginname" class="pull-left">
								<img :src="item.author.avatar_url" alt="" :title="item.author.loginname">
							</router-link>
							<span>{{item.author.loginname}}</span>
							<span class="rnum">
								<span class="anser">{{item.reply_count}}</span>
								<span class="click">/ {{item.visit_count}}</span>
							</span>
							<div class="text">  <!--  文本部分 -->
								<span :class="item.top?'put_top':item.good?'put_good':'put_ordinary'">{{item.tab|tabFormat(item.top,item.good)}}</span>
								<router-link :to="'/topic/'+item.id" class="t">{{item.title}}</router-link>
							</div>
							<a href="" class="pull-right">   <!-- 图片时间部分 -->
								<img :src="item.author.avatar_url" alt="" :title="item.author.loginname">
								<span>{{item.last_reply_at|dateFormat}}</span>
							</a>
						</div>
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
	import {Topics,user}from "@/fetch"
	export default {
		data () {
			return {
				loginname:'',   //用户名
				authorInfo:null,   //作者信息
				isNow:true       //传给aside,用来表示显示作者还是用户自身
			}
		},
		created(){
			this.loginname=this.$route.params.id;
		},
		beforeRouteLeave (to, from, next) {
			this.isNow=false;
			next();
    		// 离开当前路由页面时调用
		},
		mounted(){
			user(this.loginname).then(res=>{
				this.authorInfo=res.data.data;
				console.log(this.authorInfo)
			})
		},
		components:{
			Aside,
			Header,
			Footer
		}
	}
</script>

<style lang="scss">
#main{
	#user-content{
		width:90%;
		margin:15px auto;
	}
	#contents{
		margin-right:305px;
		padding-bottom:10px;    
		.panel{
			margin-bottom:15px;
			border-radius:5px;
			header{
				background: #f6f6f6;
				padding: 10px;
				border-radius:3px 3px 0 0;
			}
			.inner{
				background: #fff;
				padding: 10px;
				.user_big_avatar{
					img{
						width: 40px;
						height: 40px;
						vertical-align:middle;
					}
				}
				span,.git,.git+p{
					color: #778087;
				}
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
    						vertical-align:middle;
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

    					//设置文字
    					.t{
    						white-space:nowrap;
    						overflow: hidden;
    						text-overflow: ellipsis;
    						color: #888;
    						font-size:16px;
    						margin-left:2px;
    						margin-right:50px;
    						&:hover{text-decoration:underline;}
    					}
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
		}
		
	}
}
</style>
