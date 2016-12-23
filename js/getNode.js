
function  getParentNode(obj){
     if(obj.parentNode){
	     return obj.parentNode;	 
	 }
    else{
	
	 return obj.parentElementNode;
	}
}

function getChildNodes(obj)
{
     var aResult = [];
     var aChild = obj.childNodes;
     for(var i=0;i<aChild.length;i++)
     {
           if(aChild[i].nodeType==1)
           {
                 aResult.push(aChild[i]);
           }
     }
     return aResult;
}

function  getFirstChild(obj){
     if(obj.firstChild.nodeType==1){
	     return obj.firstChild;	 
	 }
    else{
	
	 return obj.firstElementChild;
	}
}

function  getLastChild(obj){
     if(obj.lastChild.nodeType==1){
	     return obj.lastChild;	 
	 }
    else{
	
	 return obj.lastElementChild;
	}
}

function getPreviousSibling(obj){
      
	  if(obj.previousSibling.nodeType==1){
	    return obj.previousSibling
	  }
	  else{
	    return obj.previousElementSibling
	  }
}

function getNextSibling(obj){
      
	  if(obj.nextSibling.nodeType==1){
	    return obj.nextSibling
	  }
	  else{
	    return obj.nextElementSibling
	  }
}

//relation:parentNode,childNodes,firstChild,lastChild,previousSibling,nextSibling
function getNode(obj,relation){
        var target;
        switch(relation){
		     case "parentNode":
		             target=getParentNode(obj);
		             break;
					 
			  case "childNodes":
		             target=getChildNodes(obj);
		             break;
					 
			  case "firstChild":
		             target=getFirstChild(obj);
                      break;
					  
			  case "lastChild":
		         target=getLastChild(obj);
                  break;
				  
			  case "previousSibling":
		         target=getPreviousSibling(obj);
                  break;
				 
              case "nextSibling":
		         target=getNextSibling(obj);
                  break; 				 
		}
		return target
}
