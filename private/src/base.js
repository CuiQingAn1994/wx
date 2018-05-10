exports.install = function (Vue, options) {
    Vue.prototype.setTitle = function (title) {
      var u = navigator.userAgent
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isAndroid) {
          document.title = title
      }else if (isiOS) {
          var $body = $('body')
          document.title = title
          var $iframe = $('<iframe src="/favicon.ico"></iframe>')
          $iframe.on('load', function () {
            // window.setTimeout(function () {
              $iframe.off('load').remove()
            // }, 0)
          }).appendTo($body)
        }
    
    }
}