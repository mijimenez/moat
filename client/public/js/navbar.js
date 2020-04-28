

(function ($) {
   "use strict"; // Start of use strict

   // Closes responsive menu when a scroll trigger link is clicked
   $('.link-trigger').click(function () {
      $('.navbar-collapse').collapse('hide');
   });

   // closes responsive menu when clicking out of menu
   $(document).on("click", function (e) {
      let $trigger = $(".navbar-toggler");
      if ($trigger !== e.target && !$trigger.has(event.target).length) {
         $('.navbar-collapse').collapse('hide');
      }
   });


   // Activate scrollspy to add active class to navbar items on scroll
   $('body').scrollspy({
      target: '#sideNav'
   });

})(jQuery); // End of use strict
