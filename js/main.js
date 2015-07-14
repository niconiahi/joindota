$(document).ready(function() {
  'use strict';
  var big = $('#slider-big');
  var little = $('#slider-little');

  big.owlCarousel({
    stopOnHover: true,
    autoPlay: 5000,
    singleItem: true,
    slideSpeed: 0,
    rewindSpeed: 1000,
    navigation: false,
    pagination: false,
    afterAction: syncPosition,
    responsiveRefreshRate: 200
  });

  little.owlCarousel({
    stopOnHover: true,
    items: 5,
    pagination: false,
    responsiveRefreshRate: 100,
    afterInit: function(el) {
      el.find('.owl-item').eq(0).addClass('synced');
    }
  });

  var littleData = little.data('owlCarousel');
  var bigData = big.data('owlCarousel');

  function syncPosition(el) {
    var currentSlide = this.currentItem;
    little
      .find('.owl-item')
      .removeClass('synced')
      .eq(currentSlide)
      .addClass('synced');

    if (little.data('owlCarousel') !== undefined) {
      center(currentSlide);
    }
  }

  function center(number) {
    var littleVisible = little.data('owlCarousel').owl.visibleItems;
    var num = number;
    var found = false;

    for (var i in littleVisible) {
      if (num === littleVisible[i]) {
        found = true;
      }
    }

    if (found === false) {
      if (num > littleVisible[littleVisible.length - 1]) {
        littleData.goTo(num - littleVisible.length + 2);
      } else {
        if (num - 1 === -1) {
          num = 0;
        }
        little.trigger('owl.goTo', num);
      }
    } else if (num === littleVisible[littleVisible.length - 1]) {
      littleData.goTo(num - littleVisible[1]);
    } else if (num === littleVisible[0]) {
      littleData.goTo(num - 1);
    }
  }

  little.on('mouseover', '.owl-item', function(x) {
    x.preventDefault();
    bigData.stop();
    var number = $(this).data('owlItem');
    bigData.goTo(number);
  });

  little.on('mouseleave', '.owl-item', function(x) {
    bigData.play();
  });

});
