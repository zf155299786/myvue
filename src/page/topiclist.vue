<template>
	<div id="main">
		<Header></Header>
		<div id="aside-content">
			<Aside :isNow="isNow" v-if="author" :author="author"></Aside>
			<div id="content">
				<div class="topic-header">
					<div class="full-header">
						<span class="put_top">{{tab|tabFormat(top,good)}}</span>
						<h2>{{title}}</h2>
					</div>
					<div class="changes">
						<span> 发布于 {{sendTime|dateFormat}} </span>  
						<span>作者 {{author}}</span>
						<span>{{visit_count}} 次浏览</span>
						<span>最后一次编辑是 {{lastTime|dateFormat}}</span>
						<span>来自 分享</span>
						<button>收藏</button>
					</div>
				</div>
				<div class="panel">
					<div class="topic-inner" v-html="content"></div>
				</div>
				<div class="panel">
					<div class="header">
						<span>{{replies.length}}回复</span>
					</div>
					<div class="replies" v-for="(item,index) in replies" :key="item.id">
						<div class="replies-header">
							<router-link :to="'/user/'+item.author.loginname">
								<img :src="item.author.avatar_url" alt="" :title="item.author.loginname">
								<span class="replies-name" style="color:#666;">{{item.author.loginname}}</span>
							</router-link>
							<a>
								{{index+1}}楼•{{item.create_at|dateFormat}}
							</a>
						</div>
						<div v-html="item.content">
							
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
	import {TopicDetail} from "@/fetch"
	import Aside from "@/components/aside"
	export default {
		data () {
			return {
				sendTime:'',    //发布时间
				content:'',     //topic 详情
				author:'',    	//作者
				visit_count:0,  //浏览次数
				lastTime:'',    //最后一次修改时间
				tab:'',     	//类型
				title:'',  		//标题
				top:Boolean, 	//置顶
				good:Boolean,   //精华
				replies:Array,   //回复
				isNow:true       //传给aside,用来表示显示作者还是用户自身
			}
		},
		created(){
			this.getTopicDetail(this.$route.params.id)
		},
		beforeRouteLeave (to, from, next) {
			this.isNow=false;
			next();
    		// 离开当前路由页面时调用
    	},
    	methods:{
    		getTopicDetail(id){
    			TopicDetail(id).then(res=>{
    				this.$nextTick(()=>{
    					this.sendTime=res.data.data.create_at;
    					this.content=res.data.data.content;
    					this.author=res.data.data.author.loginname;
    					this.visit_count=res.data.data.visit_count;
    					this.lastTime=res.data.data.last_reply_at;
    					this.tab=res.data.data.tab;
    					this.title=res.data.data.title;
    					this.top=res.data.data.top;
    					this.good=res.data.data.good;
    					this.replies=res.data.data.replies;
    				})
    			})
    		}
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
	
	#aside-content{
		width:90%;
		margin:15px auto;
	}
	#content{
		margin-right:305px;
		padding-bottom:10px; 
		.topic-header,.header{
			background: #fff;
			padding: 10px;
			border-bottom:1px solid #e5e5e5;
			.full-header{
				padding: 5px;
				h2{
					display:inline;
				}
			}
			.changes{
				margin-top:5px;
				overflow:hidden;
				span{
					font-size:12px;
					color:#838383;
					margin:0 2px;
					&:before{content:"•"}
				}
				button{
					border-radius:3px;
					background-color: #80bd01;
					padding: 3px 10px;
					color: #fff;
					font-size:14px;
					border:none;
					float:right;
				}
			}
		}
		.topic-inner{
			background: #fff;
			padding: 10px 20px;
			p{
				font-size:15px;
			}
			h2{
				margin: 30px 0 15px;
				border-bottom: 1px solid #eee;
				font-size:26px;
			}
			img{
				max-width:100%;
			}
			pre{
				background: #f7f7f7;
				font-size:14px;
				padding: 0 15px;
				margin: 20px -10px;
				font-family: Monaco,Menlo,Consolas,"Courier New",monospace;
				line-height: 22px;
				tab-size:4;
			}
		}
		.panel{
			margin-bottom:13px;
			background: #fff;
			.header{
				background: #f6f6f6;
				border-radius:3px 3px 0 0;
			}
			.replies{
				border-bottom:1px solid #f0f0f0;
				padding: 10px;
				.replies-header{
					a{
						font-size:11px;
					}
				}
				img{
					width:30px;
					height: 30px;
					border-radius:3px;
					vertical-align:middle;
				}
			}
		}
	}
	.markdown-text{
		padding: 10px;
		p{
			white-space:pre-wrap;
			padding-left: 30px;
		}
	}
}
</style>
