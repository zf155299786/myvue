<template>
	<div id="main">
		<Header></Header>
		<div class="signin-content">
			<div id="content">
				<div class="header">
					<span>登录</span>
				</div>
				<div class="inner">
					<form>
						用户名 <input type="text" v-model="accessToken" @keydown.enter="signin">
						<a href="https://cnodejs.org/signin" target="_blank">如何获取Access Token？</a>
						<button @click="signin">登录</button>
					</form>		
				</div>
			</div>
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
	import Header from "@/components/header"
	import Footer from "@/components/footer"
	import {login,setStorage} from "@/fetch"
	export default {
		data () {
			return {
				accessToken:''   //用户名
			}
		},
		methods:{
			signin(){
				this.accessToken==""?alert('不能为空'):
				login({accesstoken:this.accessToken}).then(res=>{
					if(res.data.success){
						let userInfo=res.data;
						setStorage("msg",{
							isLogin:true,
							loginname:userInfo.loginname,
							avatar_url:userInfo.avatar_url,
							access_token:this.accessToken
						});

						this.$router.push('/');
					}else{
						alert('没有这个用户')
					}
				})
			}
		},
		components:{
			Header,
			Footer
		}
	}
</script>

<style lang="scss">
#main{
	.signin-content{
		width:90%;
		margin:15px auto;
	}
	#content{
		background: #fff;
		padding-bottom:10px; 
		.header{
			background: #f6f6f6;
			padding: 10px;
			border-radius:3px 3px 0 0;
		}
		.inner{
			padding: 10px;
			form{
				width:30%;
				margin:20px auto;
			}
			input{
				min-width:70%;
				height: 30px;
				border-radius:5px;
				border:1px solid #ededed;
				padding:0 10px;
			}
			button{
				padding:10px 20px;
				display: block;
				background: #08c;
				color:#fff;
				border-radius:3px;
				border:none;
				margin:10px auto;

			}
		}
	}
}
</style>
