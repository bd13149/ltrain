//测试函数，是否已连接MyJavascript
function test(){

alert("myjs is connected")
}



//获取某个对象的属性值
function  getStyle(obj,attr){
     if(obj.currentStyle){
	 	    return obj.currentStyle[attr]
	 }
    else{ 
	   return getComputedStyle(obj)[attr]
		}
}

//获取父节点的兼容方案
function  getParentNode(obj){
     if(obj.parentNode){
	     return obj.parentNode;	 
	 }
    else{
	
	 return obj.parentElementNode;
	}

}

//获取第一个节点(firstChild)的兼容方案
/* 
firstChild会把标签之间的空行或空格当做一个文本节点，
*/
function  getFirstChild(obj){
     if(obj.firstChild.nodeType==1){
	     return obj.firstChild;	 
	 }
    else{
	
	 return obj.firstElementChild;
	}
}

//获取最后节点(lastChild)的兼容方案
function  getLastChild(obj){
     if(obj.lastChild.nodeType==1){
	     return obj.lastChild;	 
	 }
    else{
	
	 return obj.lastElementChild;
	}
}
//此处省略其他节点指针的兼容函数，后补


