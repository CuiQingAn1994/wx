var _config = {
	appid:'wx5e283c15e63b68f1',
	server:"http://v3api.hcb66.com",
	login:"http://wxv3.hcb66.com/account.html"
};

if(localStorage.getItem("env") == "test"){
	_config = {
		appid:'wx7a034c89e8da2624',
		server:"http://v3api.hcb66.com",
		login:"http://wxv3.hcb66.com/account.html"
	};
}
if(localStorage.getItem("env") == "dev"){
	_config = {
		appid:'wx0101d6071a30f6a4',
		server:"http://192.168.1.166:3000",
		login:"http://192.168.1.155:8080/account.html",
	};
}

if(localStorage.getItem("env") == "local"){
	_config = {
		appid:'wx0101d6071a30f6a4',
		server:"http://192.168.1.166:3000",
		login:"http://192.168.1.155:8080/account.html",
	};
}

