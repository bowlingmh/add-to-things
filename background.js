chrome.browserAction.onClicked.addListener(function(tab) {

    chrome.tabs.executeScript(tab.id, {
        // run script to try to get user selected text
        code: 'window.getSelection().toString()'
    },function(selection) {
        // format selection if it is not null
        selection = selection ? '\n' + selection[0]: '';

	// Get Title / URL
	title = tab.title;
	url = tab.url;

	// Make PermaLinks of GMail URLs and only include Email subject
	if (url.match(/^https:\/\/mail.google.com\/mail\/u\/[0-9]\//)) {
	    title_parts = title.match(/^(.*) - ([a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_\-\.]+\.[a-zA-Z]{2,5}) - .*$/);
	    if (title_parts) {
		url = url.replace(/^(https:\/\/mail.google.com\/mail\/u\/)[0-9]\/(.*)$/, "$1"+title_parts[2]+"/$2");
		title = title_parts[1];
	    }
	}
	
        // Things 3.4 URL Scheme
        // https://support.culturedcode.com/customer/en/portal/articles/2803573
        var thingsURL = 'things:///add?show-quick-entry=true&title=' + encodeURIComponent(title) + '&notes=' + encodeURIComponent(url + selection);
          chrome.tabs.update({ url: thingsURL });
    });

});
