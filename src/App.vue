<template>
	<div id="app">
		
		<router-view/>
		
	</div>
</template>

<script>
import Header from "@/components/header"
import Footer from "@/components/footer"
	export default {
		name: 'App',
		components:{
			Header,
			Footer,
		}
	}
</script>

<style>
body{
	padding: 0;
	margin: 0;
	background: #e1e1e1;
	font-size: 14px;
	font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;
}
a{
	text-decoration: none;
	color:#08c;
}
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

</style>
