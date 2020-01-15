<template>
	<div class="navbar">
		<div class="navbar-inner">
			
			<div class="brand">
				<img src="../assets/cnodejs_light.svg" alt="">
			</div>
			<form action="/search" class="navbar-search">
				<input type="search">
			</form>
			<div class="nav">
				<ul>
					<li><router-link to="/">首页</router-link></li>
					<li><router-link to="/getstart">新手入门</router-link></li>
					<li><router-link to="/api">API</router-link></li>
					<li><router-link to="/about">关于</router-link></li>
					<li><router-link to="/login">注册</router-link></li>
					<li><router-link to="/signin">登录</router-link></li>
				</ul>
			</div>
		</div>	

	</div>
</template>

<script>
	export default {
		data () {
			return {

			}
		},
		methods:{

		}
	}
</script>

<style scoped lang="scss">
	.navbar{
		width:100%;
		background:#444;
		.navbar-inner{
			margin:auto;
			display: flex;
			width:90%;
			padding:5px;
			.brand{
				width:120px;
				padding: 3px 20px 3px 0;
				height: 34px;
			}
			.navbar-search{
				display:flex;
				align-items:center;
				input{
					box-sizing:content-box;
					padding: 3px 5px 3px 22px;
					border-radius:15px;
					border:0;
					width:206px;
					height: 20px;
					background:url("../assets/search.png") no-repeat 4px,#888 ;
					outline:none;
				}
			}
			.nav{
				flex:1;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				ul{
					&:after{display:block;clear:both;content:"";}
					margin: 0;
					padding: 0;
					list-style: none;
				}
				li{
					float: left;
					a{
						padding: 10px 15px;
						text-decoration: none;
						color: #ccc;
						&:hover{color:#fff;}
					}
				}
			}
		}
	}
</style>
		