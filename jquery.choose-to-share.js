(function($) {
  var Social = function(){    
    var self = this;
    
    this.social_networks = ['twitter'];
    this.share_link = window.location.href;
    
    this.chooseToShareSelection = new ChooseToShareSelection();
    this.twitter = new Twitter(this);

    this.setNetworks = function(options){
      if (typeof options.social_networks != 'undefined')
        if (Object.prototype.toString.call(options.social_networks) === '[object Array]')
          this.social_networks = options.social_networks;
        else
          throw new Error("Sorry, you need to pass an array containing social networks.");
      else
        return false;
    };

    this.setShareLink = function(options){
      if (typeof options.share_link != 'undefined')
        if (typeof options.share_link === 'string')
          if (this.validUrl(options.share_link))
            this.share_link = options.share_link;
          else
            throw new Error("Sorry, you need to pass a valid url.");
        else
          throw new Error("Sorry, you need to pass a string containing link to share.");
      else
        return false;
    };
    
    this.validUrl = function(str){
      var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
      if (regex.test(str))
        return true;
      else
        return false;
    };

    this.render = function(){
      var html = '<div style="position: absolute;"><ul><li><a class="action twitter" style="cursor: pointer;">Twitter</a></li></ul></div>';
      self.$choose = $(html);
      self.$choose.find('a.twitter').on('click',self.twitter.share);
      $('body').append(self.$choose);
    };

    this.show = function(e){
      setTimeout(function() {
        var sel = self.chooseToShareSelection.get();
        var selection = self.chooseToShareSelection.getText().trim();
        if(!sel.isCollapsed && selection && selection.length > 10) {
          var top = (sel.getRangeAt(0).getBoundingClientRect().top - 5) + window.scrollY - self.$choose.height();
          var left = (sel.anchorNode.parentNode.offsetWidth / 2) - self.$choose.width();
          self.$choose.css("top", top+5).css("left", left).fadeIn('fast');
        }
      }, 10);
    };

    this.hide = function(e) {
      self.$choose.fadeOut('fast');
    };
  };

  var ChooseToShareSelection = function(){
    var self = this;

    this.text = null;

    this.getText = function(){
        self.text = self.get().toString();
        return self.text;
    };

    this.get = function(){
      if (window.getSelection && window.getSelection()){
        return window.getSelection();
      } else if (document.getSelection && document.getSelection()){
        return document.getSelection();
      } else {
          var selection = document.selection && document.selection.createRange();
          if (!(typeof selection === "undefined") && selection.text)
            return selection;
          else
            return false;
      }

      return false;
    };
  };

  var ChooseToShareText = function(){
    this.cut = function(str, n){
        var str = str.replace(/\s+/g, ' ');
        var isLong = str.length > n, s = isLong ? str.substr(0,n-1) : str;
        s = isLong ? s.substr(0,s.lastIndexOf(' ')) : s;
        s = isLong ? s + '...' : s;
        return "“" + s + "”";
    };
  }

  var Twitter = function(social){
    var self = this;

    this.chooseToShareText = new ChooseToShareText();
    this.social = social;

    this.share = function() {
      
    };
  }

  var ChooseToShare = function(options){
    this.social = new Social();
    this.social.setNetworks(options);
    this.social.setShareLink(options);

    var self = this;

    this.init = function(el){
      this.social.render();
      el.mouseup(self.social.show).mousedown(self.social.hide);
      el.on('click',function(e){
        if (el.is(':visible')) self.social.hide();
      });
    };
  };

  $.fn.chooseToShare = function(options){
    var c = new ChooseToShare(options);
    c.init(this);
    return this;
  };

})(jQuery);

// Polyfill trim
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}