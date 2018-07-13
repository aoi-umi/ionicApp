export let stringFormat = function (formatString: string, ...args) {
    if(!formatString)
        formatString = '';
    let reg = /(\{(\d)\})/g;
    if(typeof args[0] === 'object'){
        args = args[0];
        reg = /(\{([^{}]+)\})/g;
    }
    let result = formatString.replace(reg, function(){
        let match = arguments[2];
        return args[match] || '';
    });
    return result;
};