export function getValidImageFile(fileList){
	let imageFile = null;
		for (let i = 0; i < fileList.length; i++) {
			if (fileList[i].type.match(/^image\//)) {
		        imageFile = fileList[i];
		        break;
		    }
		}
	return imageFile;
}

export function extractCheckedDay(id){
	let day="";
	const daySelectorTag=document.getElementById(id).children;
	for (let i = 0; i < daySelectorTag.length; i++) {
		if(daySelectorTag[i].checked){
			day=daySelectorTag[i].value;
			break;
		}
	}
	return day;
}