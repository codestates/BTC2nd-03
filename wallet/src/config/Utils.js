export const SetStorageByBrowserType = (key,value) => {
    if(process.env.REACT_APP_BROWSER_TYPE === 'extension') {
        let data = {};
        data[key] = value;
        /*global chrome*/
        chrome.storage.local.set(data,function(){ console.log("saved ok"); } );
    } else {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
}

export const GetStorageByBrowserType = (key) => {
    if(process.env.REACT_APP_BROWSER_TYPE === 'extension') {
        let data = '';
        /*global chrome*/
        chrome.storage.local.get([key],function(result){console.log(result); data =result;});
        console.log('data',data);
        return data;
    } else {
        return JSON.parse(sessionStorage.getItem(key));
    }
}