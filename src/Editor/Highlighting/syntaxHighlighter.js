function syntaxHighlighter(data){

    let arrayx = data.split("");
    for(let i = 0;i<arrayx.length;i++){

        switch (arrayx[i]) {
            case "<":
                arrayx[i] = `<span style='color:${pref.secondary_color}'>&lt;</span>`;
                break;
            case ">":
                arrayx[i]=`<span style='color:${pref.secondary_color}'>&gt;</span>`;
                break;
            case ";":
                arrayx[i]=`<span style='color:${pref.secondary_color}'>;</span>`;
                break;
            case "(":
                arrayx[i]=`<span style='color:${pref.secondary_color}'>(</span>`
                break;
            case ")":
                arrayx[i]=`<span style='color:${pref.secondary_color}'>)</span>`
        }
    }    
    data = arrayx.join("");

    return data;
}

module.exports = syntaxHighlighter