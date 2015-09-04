(function($) {
  var Social = function(){
    this.social_networks = ['twitter'];
    this.share_link = window.location.href;

    this.setNetworks = function(options){
      if (typeof options.social_networks != 'undefined')
        if (Object.prototype.toString.call(options.social_networks) === '[object Array]')
          this.social_networks = options.social_networks;
        else
          throw new Error("Sorry, you need to pass an array containing social networks.");
      else
        return false;
    }

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
    }
    
    this.validUrl = function(str){
      var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
      if (regex.test(str))
        return true;
      else
        return false;
    }
  }

  var ChooseToShare = function(options){
    this.social = new Social();
    this.social.setNetworks(options);
    this.social.setShareLink(options);
  };

  $.fn.chooseToShare = function(options){
    return new ChooseToShare(options);
  };

})(jQuery);