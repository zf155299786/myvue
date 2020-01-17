	//时间格式化
	let dateFormat=(val)=>{  
		let dateNow=new Date();   //现在时间
		let dateOld=new Date(val);	//修改时间
		let format=dateNow-dateOld;  //时间差

		let miniute=format/1000/60;      
		let hours=miniute/60;
		let day=hours/24;
		let month=day/30;

		if(miniute<1){
			return "几秒前";
		}else if(hours<1){
			return parseInt(miniute)+"分钟前";
		}else if(day<1){
			return parseInt(hours)+"小时前";
		}else if(month<1){
			return parseInt(day)+"天前";
		}else{
			return parseInt(month)+"个月前";
		}
	}

 	//分类格式化
	let tabFormat=(val,top,good)=>{    
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

	export default{
		dateFormat,
		tabFormat
	}


