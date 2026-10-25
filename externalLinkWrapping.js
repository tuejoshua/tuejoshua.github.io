// Warn user about leaving domain. If confirmed, open link in new window/tab
function externalLink(link, isHttp) {
    let domain = window.location.hostname; // This seems to be empty (but not undefined) for client-side viewing of this page

    if (domain == '') {
        console.error('No domain detected. If you\'re viewing an offline copy of this page (from your local filesystem), that\'s probably why...');
    }
    else {
        domain = '[' + domain + '] ';
    }

    let confirmMessage = 'By following this link [to ' + link + '], you\'ll be leaving the relative safety(?) of my ' + domain + 'domain.\n'
        + 'Although I have provided this external link, I take no responsibility for the corresponding destination.\n\n';
    if (isHttp) {
        confirmMessage += 'Furthermore: the destination page is hosted on an HTTP-only (i.e. "insecure") server\n' +
            '(see the "Projects showcase" description for more information).\n\n';
    }
    confirmMessage += 'Do you want to continue?';
    if (isHttp) {
        confirmMessage += '\n(You may be warned again later by your browser)';
    }

    if (confirm(confirmMessage)) {
        window.open(link, "_blank"); // if the target="_blank" parameter is instead provided in the <a> tag, a new tab/window will open even if user does not confirm(!)
    }
}

// Returns a "<a>...</a>" string with externalLink() handling
function linkMacroString(url, clickableContent) {
    // Use URL (also) as clickable content unless other provided
    if (clickableContent === undefined) {
        clickableContent = url;
    }
    // the following (href="#" onclick="... return false;") based on (comments on) https://stackoverflow.com/questions/1291942/what-does-javascriptvoid0-mean/
    return '<a title="https://' + url + '" href="#" onclick="externalLink(\'https://' + url + '\', false); return false;">' + clickableContent + '</a>';
}

// Writes (the output of linkMacroString()) directly to the DOM where invoked
function linkMacro(url, clickableContent) {
    document.write(linkMacroString(url, clickableContent));
}