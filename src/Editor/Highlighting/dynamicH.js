function dH(color,element){
    // get range and create new span
    let range = window.getSelection().getRangeAt(0); const newElement = document.createElement('span');
    //magic
    newElement.style.color=`${color}`; newElement.append(`${element}`); range.insertNode(newElement);
}

module.exports = dH;