Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

export function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

export function show(el){
    el.classList.add('show');
    el.classList.remove('hide');
}

export function hide(el){
    el.classList.add('hide');
    el.classList.remove('show');
}

export function baseName(str)
{
   var base = new String(str).substring(str.lastIndexOf('/') + 1); 
    if(base.lastIndexOf(".") != -1)       
        base = base.substring(0, base.lastIndexOf("."));
   return base;
}


export const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export const restring = (string) => {
    const words = string.split('-');

    let result = words.join(" ");

    return result;
}

export const barWidth = (value, highest) => {
    let result = Math.floor(value/highest*100) + '%';
    return result;
}

export function compare(a, b, key, isDirectionAscending) {
    if ( a[key] < b[key] ){
      return -1 * isDirectionAscending;
    } else if ( a[key] > b[key] ){
      return 1 * isDirectionAscending;
    }
    return 0;
}

export const helper = (array, sort, direction) => {
    if (direction === 'asc') {
        return array.sort((a,b) => compare(a, b, sort, 1))
    } else if (direction === 'desc') {
        return array.sort((a,b) => compare(a, b, sort, -1))
    } else {
        return array;
    }
}

export const collapse = (title) => {
    let id = title + "-body";
    let panel = document.getElementById(id);
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
}

export const allTypes = ['bug', 'dark', 'dragon', 'electric', 'fire', 'fairy', 'fighting', 'flying', 'ghost', 'grass', 'ground', 'ice', 'normal', 'poison', 'psychic', 'rock', 'steel', 'water'];