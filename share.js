var cal = {};
cal.base = function($, undefined) {
    function getMetaContentByName(name) {
        return (document.getElementsByName(name)[0] || 0).content;
    }

    function getDefaults(onlyUrl = false, s) {
        var site = getMetaContentByName("twitter:site");
        if (onlyUrl) {
            newsUrl = s.parents("div.post-body").prevAll("h1")[0].firstElementChild.href;
            title = $.trim(s.parents("div.post-body").prevAll("h1")[0].firstElementChild.text);
            desc = s.parents("div.post-body").prevAll("p")[0].firstElementChild.text;
            return { url: newsUrl, title: title, source: location.origin, origin: site, desc: desc }
        } else {

            var title = getMetaContentByName("title") || document.title;
            var desc = getMetaContentByName("description") || "";
            var defaults = {
                url: location.href,
                origin: site,
                source: location.origin,
                title: title,
                desc: desc
            }
            return defaults
        }
    }

    shareTools = {
        templates: {
            linkedin: "https://www.linkedin.com/shareArticle?mini=true&ro=true&title={{TITLE}}&url={{URL}}&source={{SOURCE}}&summary={{DESC}}&armin=armin",
            facebook: "https://www.facebook.com/sharer/sharer.php?u={{URL}}&t={{TITLE}}",
            twitter: "http://www.facebook.com/sharer/sharer.php?u={{URL}}",
            google: "https://plus.google.com/share?url={{URL}}",
            twitter: "https://twitter.com/intent/tweet?text={{TITLE}}&url={{URL}}&via={{ORIGIN}}"
        },
        makeUrl: function(name, data) {
            return this.templates[name].replace(/\{\{(\w*)\}\}/g, function(fix, key) {
                return encodeURIComponent(data[key.toLowerCase()]);
            });
        },
        run: function(url) {
            window.open(url, "_blank", 'toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=450,top=100,left=100');
        }
    }

    function IsIndexList() {
        loca = window.location.href;
        if (loca.indexOf("index") == -1) {
            return false;
        }
        return true;
    }

    function track_sharing_links() {
        $("[data-shared]").on("click", function() {
            var $this = $(this);
            var shareLink = $this.data("shared");
            if (shareLink === "") {
                return;
            }
            isIndex = IsIndexList();
            if (isIndex) {
                data = getDefaults(true, $(this));
            } else {
                data = getDefaults();
            }
            realUrl = shareTools.makeUrl(shareLink, data);
            shareTools.run(realUrl);
        });
    }

    return {
        init: function() {
            $(document).ready(function() {
                track_sharing_links();
            });
        }
    }
}(jQuery);

cal.base.init();;