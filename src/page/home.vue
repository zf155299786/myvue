<template>
	<div id="main">
		<Header></Header>
		<div id="home-content">
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
							<router-link :to="'/user/'+item.author.loginname" class="pull-left">
								<img :src="item.author.avatar_url" alt="" :title="item.author.loginname">
							</router-link>
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
					<Pagination :pageCount="pageCount" :pageNowParent="pageNow" :tab="tab"></Pagination>
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
	import Pagination from "@/components/pagination"
	import {Topics}from "@/fetch"
	export default {
		data () {
			return {
				topicList:[],  //数据列表
				pageCount:40,  //数据的总页数
				pageNow:1,     //当前的页码
				tab:"all"     //文章的分类
			}
		},
		mounted(){
			this.getData(this.pageNow,this.tab);  //页面刷新渲染一次数据
		},
        beforeRouteEnter(to,from,next){
            console.log(to);
            next();
        },
		beforeRouteUpdate (to, from, next) {   
	    	// 同一页面，刷新不同数据时调用，
	    	this.pageNow=to.query.page;
	    	this.tab=to.query.tab;
	    	this.getData(this.pageNow,this.tab); 
	    	next();
	    },
	    methods:{
    	 	//获取数据
    	 	getData(page,tab){  
    	 		Topics(page,tab).then(res=>{
    	 			this.topicList=res.data.data;
    	 		})
    	 	}
    	 },
    	 components:{
    	 	Aside,
    	 	Pagination,
    	 	Header,
    	 	Footer
    	 }
    	}
    </script>

    <style lang="scss">
    #main{
    	#home-content{
    		width:90%;
    		margin:15px auto;
    	}
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
</style>
