function erase(x) {
    x.value = null;
}

function check(x) {
    if (x.keyCode == 13) javascript: process();
}
var wait = false;
var node = null;
var parent = null;

function process(url) {
    if (!url || url.length > 2000) {
        alert("Please enter profile link properly!");
        return -1;
    }
    if (!wait) {
        wait = true;
        if (parent && node) {
            parent.removeChild(node);
        }
        var img = document.createElement("img");
        node = img;;
        img.src = "img/loader.gif";
        loc = document.getElementById("image");
        parent = loc;
        loc.classList.add("text-center");
        img.classList.add("fancybox");
        img.setAttribute("id", "show");
        loc.appendChild(img);
        $.getJSON("ajax.php?id=" + url, function (result) {
            if (result.error) {
                alert(result.error);
                loc.removeChild(img);
                parent = null;
                node = null;
                wait = false;
                return -1;
            }
            document.getElementById("show").src = result.data
            if (!/(Nokia|Opera)/i.test(navigator.userAgent)) {
                img.setAttribute("title", result.title);
                $("#show").fancybox({
                    scrolling: "no",
                    autoDimensions: true,
                    autoSize: true,
                    fitToView: false,
                    centerOnScroll: true,
                    helpers: {
                        title: {
                            type: 'outside',
                            position: 'top'
                        }
                    }
                }).trigger('click');
                window.location.hash = DOMPurify.sanitize(result.hash);
            }
            wait = false;
        });
        return 1;
    }
    alert("Please hold on, we're processing!");
}

function hasher() {
    if (location.hash) {
        var page = "https://www.facebook.com/" + DOMPurify.sanitize(location.hash.substring(1));
        process(page);
    }
}