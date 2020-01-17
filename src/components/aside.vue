<template>
	<div class="aside-content">

		<div v-if="isNow" class="inner">
			<div class="header">个人信息</div>
			<div class="info" v-if="authorInfo">
				<div>
					<router-link :to="'/user/'+authorInfo.loginname">
						<img :src="authorInfo.avatar_url"  alt="">
						<span>{{authorInfo.loginname}}</span>	
					</router-link>
				</div>
				<div>
					<p>积分:{{authorInfo.score}}</p>
					<i>"这家伙很懒，什么个性签名都没有留下。 "</i>
				</div>
			</div>
		</div>
		<div v-else>
			<div v-if="isLogin" class="inner">
				<div class="header">个人信息</div>
				<div class="info">
					<div>
						<router-link :to="'/user/'+userInfo.loginname">
							<img :src="userInfo.avatar_url"  alt="">
							<span>{{userInfo.loginname}}</span>	
						</router-link>
					</div>
					<div>
						<p>积分:{{score}}</p>
						<i>"这家伙很懒，什么个性签名都没有留下。 "</i>
					</div>
				</div>
			</div>
			<div class="inner" v-else>
				<p>CNode：Node.js专业中文社区</p>
				<div>
					您可以 
					<router-link to="/signin">登录</router-link> 或 
					<router-link to="/login">注册</router-link> , 也可以
					<router-link to="/signin" class="github">通过 GitHub 登录</router-link>
				</div>
			</div>
		</div>
		<div class="inner" v-if="isLogin">
			<router-link to="/create" tag="button" class="send-btn">发布话题</router-link>
		</div>
		<div class="inner">
			
			<div >
				<img src="../assets/phphub-logo.png" alt="">
				<img src="../assets/phphub-logo.png" alt="">
				<img src="../assets/phphub-logo.png" alt="">
			</div>
		</div>

	</div>
</template>

<script>
	import {user,getStorage} from "@/fetch"
	export default {
		data () {
			return {
				userInfo:null,  //用户信息
				score:0,			//积分
				isLogin:false,
				authorInfo:null
			}
		},
		props:['isNow',"author"],
		mounted(){
			//获取本地存储的用户信息
			let msg=getStorage('msg');
			if(msg){
				if(msg.isLogin){
					this.userInfo=msg;
					this.isLogin=msg.isLogin;
					
					user(this.userInfo.loginname).then(res=>{
						this.score=res.data.data.score;
					})
				}
			}

			if(this.isNow){
				user(this.author).then(res=>{
					this.authorInfo=res.data.data;
					console.log(this.authorInfo)
				})
			}
		}
	}
</script>

<style lang="scss">
.aside-content{
	float:right;
	width: 290px;
	height: 300px;
	.inner{
		background:#fff;
		border-radius: 0 0 3px 3px;
		margin-bottom:10px;
		padding: 10px;
		.header{
			font-size:14px;
			background:#f6f6f6;
			border-radius:3px 3px 0 0;
		}
		img{
			width:100%;
			margin-bottom:10px;
		}
		.github{
			padding: 8px 15px;
			background: #5bc0de;
			border-radius:3px;
			color:#fff;
			display:inline-block;
			margin-top:3px;
		}
		.info{
			padding:10px;
			img{
				width:100px;
				height: 100px;
			}
		}
		.send-btn{
			border-radius: 3px;
   			background-color: #80bd01;
   			border: none;
		    padding: 3px 10px;
		    margin: 0;
		    font-size: 14px;
		    transition: all .2s ease-in-out;
		    line-height: 2em;
		    vertical-align: middle;
		    color: #fff;
		    cursor: pointer;
		}
	}
}

</style>
