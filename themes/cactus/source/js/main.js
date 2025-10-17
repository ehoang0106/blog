/**
 * Sets up Justified Gallery.
 */
if (!!$.prototype.justifiedGallery) {
  var options = {
    rowHeight: 140,
    margins: 4,
    lastRow: "justify"
  };
  $(".article-gallery").justifiedGallery(options);
}

$(document).ready(function() {

  /**
   * Shows the responsive navigation menu on mobile.
   */
  $("#header > #nav > ul > .icon").click(function() {
    $("#header > #nav > ul").toggleClass("responsive");
  });


  /**
   * Controls the different versions of  the menu in blog post articles 
   * for Desktop, tablet and mobile.
   */
  if ($(".post").length) {
    var menu = $("#menu");
    var nav = $("#menu > #nav");
    var menuIcon = $("#menu-icon, #menu-icon-tablet");

    /**
     * Display the menu on hi-res laptops and desktops.
     */
    if ($(document).width() >= 1440) {
      menu.show();
      menuIcon.addClass("active");
    }

    /**
     * Display the menu if the menu icon is clicked.
     */
    menuIcon.click(function() {
      if (menu.is(":hidden")) {
        menu.show();
        menuIcon.addClass("active");
      } else {
        menu.hide();
        menuIcon.removeClass("active");
      }
      return false;
    });

    /**
     * Add a scroll listener to the menu to hide/show the navigation links.
     */
    if (menu.length) {
      $(window).on("scroll", function() {
        var topDistance = menu.offset().top;

        // hide only the navigation links on desktop
        if (!nav.is(":visible") && topDistance < 50) {
          nav.show();
        } else if (nav.is(":visible") && topDistance > 100) {
          nav.show();
        }

        // on tablet, hide the navigation icon as well and show a "scroll to top
        // icon" instead
        if ( ! $( "#menu-icon" ).is(":visible") && topDistance < 50 ) {
          $("#menu-icon-tablet").show();
          $("#top-icon-tablet").hide();
        } else if (! $( "#menu-icon" ).is(":visible") && topDistance > 100) {
          $("#menu-icon-tablet").hide();
          $("#top-icon-tablet").show();
        }
      });
    }

    /**
     * Show mobile navigation menu after scrolling upwards,
     * hide it again after scrolling downwards.
     */
    if ($( "#footer-post").length) {
      var lastScrollTop = 0;
      $(window).on("scroll", function() {
        var topDistance = $(window).scrollTop();

        if (topDistance > lastScrollTop){
          // downscroll -> show menu
          $("#footer-post").hide();
        } else {
          // upscroll -> hide menu
          $("#footer-post").show();
        }
        lastScrollTop = topDistance;

        // close all submenu"s on scroll
        $("#nav-footer").hide();
        $("#toc-footer").hide();
        $("#share-footer").hide();

        // show a "navigation" icon when close to the top of the page, 
        // otherwise show a "scroll to the top" icon
        if (topDistance < 50) {
          $("#actions-footer > #top").hide();
        } else if (topDistance > 100) {
          $("#actions-footer > #top").show();
        }
      });
    }
  }
});

// call an api endpoint api url: https://count.khoah.net

async function callApi(endpoint, method = 'GET', data = null) {
  const apiBaseUrl = 'https://count.khoah.net';
  const url = `${apiBaseUrl}/${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error calling API:', error);
    throw error;
  }
}


//check if user has already been counted in this session
async function trackVisitor() {
  try {
    //use sessionStorage
    const hasVisited = localStorage.getItem('hasVisited');
    const lastVisitTime = localStorage.getItem('lastVisitTime');
    const cachedCount = localStorage.getItem('visitCount');
    const currentTime = new Date().getTime();
    
    //define session duration
    const sessionDuration = 15 * 60 * 1000; // 15 minutes
    
    //check if this is a new session (no visit recorded or session expired)
    const isNewSession = !hasVisited || !lastVisitTime || (currentTime - parseInt(lastVisitTime)) > sessionDuration;

    if (isNewSession) {
      //call API to increment counter
      const data = await callApi('');
      console.log('API response:', data);
      
      //mark user as visited
      localStorage.setItem('hasVisited', 'true');
      localStorage.setItem('lastVisitTime', currentTime.toString());
      
      //store the count in localStorage
      if (data.total_visits !== undefined) {
        localStorage.setItem('visitCount', data.total_visits);
        const visitCountElement = document.getElementById('visit-count');
        if (visitCountElement) {
          visitCountElement.textContent = data.total_visits;
        }
      }
    } else {
      //user has already been counted in this session, display on console
      console.log('Already counted in this session');
      
      //update last visit time to extend the session
      localStorage.setItem('lastVisitTime', currentTime.toString());
      
      if (cachedCount) {
        const visitCountElement = document.getElementById('visit-count');
        if (visitCountElement) {
          visitCountElement.textContent = cachedCount;
        }
      }
    }
  } catch (error) {
    console.error('Visitor tracking failed:', error);
    const visitCountElement = document.getElementById('visit-count');
    if (visitCountElement) {
      visitCountElement.textContent = 'N/A';
    }
  }
}

//call the function when page loads
trackVisitor();