/*
document.getElementById("txtarea").addEventListener("onchange", changeColor);


document.getElementById("txtarea").addEventListener("input",changeColor);

function changeColor(){
    var text = document.getElementById("txtarea").value;
    
    let arr = text.split(" ");
    for(let i = 0 ; i<arr.length;i++){
        if(arr[i] == "int"){
            arr[i] = `<span class="int">`+arr[i]+`</span>`;
        }
        else if(arr[i] == "<"){
            arr[i] = `$lt;`;
        }
        else if(arr[i] == ">"){
            arr[i] = `$gt;`;
        }
    }
    console.log(arr.join());
    document.getElementById("txtarea").innerHTML = arr.join(' ');
    
    document.getElementById("txtarea").innerHTML = data;
}
*/


//load()

/*
        let arr = data.split(" ");
        for(let i = 0 ; i<arr.length;i++){
            if(arr[i] == "int"){
                arr[i] = `<span class="int">`+arr[i]+`</span>`;
            }
        }
        let arr1 = arr.join(' ');
        let arr2 = arr1.split("");

        for(let i = 0 ; i<arr2.length;i++){
            if(arr2[i] == "<" && arr2[i+2]!="p" && arr2[i+1]!="/"){
                arr2[i] = `&lt;`;
            }

            if(arr2[i] == ">" && arr2[i-1]!=`"` && arr2[i-1]!=`n`){
                arr2[i] = `&gt;`;
            }
  
        }

        console.log(arr2.join(''));
        console.log(arr2);
        document.getElementById("txtarea").innerHTML = arr2.join('');
*/


