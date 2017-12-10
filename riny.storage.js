var rinyStorage=function(option){
	this.storage=option.storage;
	this.limit=option.limit;
	this.input=option.input;
};
rinyStorage.prototype.checkStorage=function(){
	var storage=localStorage.getItem(this.storage);
	if(!storage){
		return;
	};
	this.history=JSON.parse(storage);
	return this.history;
};
rinyStorage.prototype.setStorage=function(){

	this.value=this.input.value.replace(/(^\s*)|(\s*$)/g,'');
	this.value=this.value.replace(/</,'&lt;');
	this.value=this.value.replace(/>/,'&gt;');

	this.checkStorage();
	var history;
	if(this.history){
		history=this.history;
	}else{
		history=[];
	};

	var indexof=history.indexOf(this.value);

	if(indexof!=-1){
		history.splice(indexof,1);
	};
	history.unshift(this.value);

	if(this.limit && history.length>this.limit){
		history.splice(history.length-1,1);
	};

	history=JSON.stringify(history);
	localStorage.setItem(this.storage,history);

};
rinyStorage.prototype.cancelStorage=function(val){

	this.checkStorage();

	if(!this.history) return;

	if(!val){
		localStorage.removeItem(this.storage);
		this.history=undefined;
	}else{
		var indexof=this.history.indexOf(val+'');

		if(indexof==-1){
			return;
		};

		this.history.splice(indexof,1);
		var history=JSON.stringify(this.history);
		localStorage.setItem(this.storage,history);
	};

};
