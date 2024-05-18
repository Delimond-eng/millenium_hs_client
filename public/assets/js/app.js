!(function () {
  var d = document.querySelector(".navbar-menu").innerHTML,
    M = 7,
    t = "en",
    a = localStorage.getItem("language");

  function o() {
    n(a === null ? t : a);

    var elements = document.getElementsByClassName("language");
    Array.from(elements).forEach(function (element) {
      element.addEventListener("click", function () {
        n(element.getAttribute("data-lang"));
      });
    });
  }

  function n(language) {
    var headerLangImg = document.getElementById("header-lang-img");

    // Vérifier si l'élément de l'image de langue existe
    if (headerLangImg) {
      // Changer l'image en fonction de la langue sélectionnée
      switch (language) {
        case "en":
          headerLangImg.src = "assets/images/flags/us.svg";
          break;
        case "sp":
          headerLangImg.src = "assets/images/flags/spain.svg";
          break;
        case "gr":
          headerLangImg.src = "assets/images/flags/germany.svg";
          break;
        case "it":
          headerLangImg.src = "assets/images/flags/italy.svg";
          break;
        case "ru":
          headerLangImg.src = "assets/images/flags/russia.svg";
          break;
        case "ch":
          headerLangImg.src = "assets/images/flags/china.svg";
          break;
        case "fr":
          headerLangImg.src = "assets/images/flags/french.svg";
          break;
        case "ar":
          headerLangImg.src = "assets/images/flags/ae.svg";
          break;
        default:
          break;
      }

      // Stocker la langue sélectionnée dans le stockage local
      localStorage.setItem("language", language);

      // Récupérer la langue sélectionnée du stockage local
      var selectedLanguage = localStorage.getItem("language");

      // Si la langue sélectionnée est nulle, utiliser la langue par défaut
      if (selectedLanguage === null) {
        changeLanguage(defaultLanguage);
      }

      // Effectuer une requête XMLHttpRequest pour obtenir les données de langue
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "assets/lang/" + selectedLanguage + ".json");
      xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          var languageData = JSON.parse(this.responseText);

          // Mettre à jour les éléments de la page avec les nouvelles données de langue
          Object.keys(languageData).forEach(function (key) {
            var elementsWithDataKey = document.querySelectorAll(
              "[data-key='" + key + "']"
            );
            Array.from(elementsWithDataKey).forEach(function (element) {
              element.textContent = languageData[key];
            });
          });
        }
      };
      xhr.send();
    }
  }

  function s() {
    var collapses = document.querySelectorAll(".navbar-nav .collapse");

    if (collapses.length > 0) {
      Array.from(collapses).forEach(function (collapse) {
        var collapseInstance = new bootstrap.Collapse(collapse, {
          toggle: false,
        });

        collapse.addEventListener("show.bs.collapse", function (event) {
          event.stopPropagation();

          var parentCollapse = collapse.parentElement.closest(".collapse");

          if (parentCollapse) {
            var nestedCollapses = parentCollapse.querySelectorAll(".collapse");

            Array.from(nestedCollapses).forEach(function (nestedCollapse) {
              var nestedCollapseInstance =
                bootstrap.Collapse.getInstance(nestedCollapse);

              if (nestedCollapseInstance !== collapseInstance) {
                nestedCollapseInstance.hide();
              }
            });
          } else {
            // Si le collapse n'a pas de parent collapse
            var siblings = (function (element) {
              var siblings = [];
              for (
                var sibling = element.parentNode.firstChild;
                sibling;
                sibling = sibling.nextSibling
              ) {
                if (sibling.nodeType === 1 && sibling !== element) {
                  siblings.push(sibling);
                }
              }
              return siblings;
            })(collapse.parentElement);

            // Réinitialisation des éléments voisins
            siblings.forEach(function (sibling) {
              if (sibling.childNodes.length > 2) {
                sibling.firstElementChild.setAttribute(
                  "aria-expanded",
                  "false"
                );
              }

              var ids = sibling.querySelectorAll("*[id]");

              Array.from(ids).forEach(function (id) {
                id.classList.remove("show");

                if (id.childNodes.length > 2) {
                  var nestedLinks = id.querySelectorAll("ul li a");

                  Array.from(nestedLinks).forEach(function (link) {
                    if (link.hasAttribute("aria-expanded")) {
                      link.setAttribute("aria-expanded", "false");
                    }
                  });
                }
              });
            });
          }
        });

        collapse.addEventListener("hide.bs.collapse", function (event) {
          event.stopPropagation();

          var nestedCollapses = collapse.querySelectorAll(".collapse");

          Array.from(nestedCollapses).forEach(function (nestedCollapse) {
            var nestedCollapseInstance =
              bootstrap.Collapse.getInstance(nestedCollapse);
            nestedCollapseInstance.hide();
          });
        });
      });
    }
  }

  function i() {
    var layout = document.documentElement.getAttribute("data-layout");
    var defaultAttribute = sessionStorage.getItem("defaultAttribute");
    var parsedDefaultAttribute = JSON.parse(defaultAttribute);

    if (
      !parsedDefaultAttribute ||
      (layout !== "twocolumn" &&
        parsedDefaultAttribute["data-layout"] !== "twocolumn")
    ) {
      return;
    }

    var navbarMenu = document.querySelector(".navbar-menu");

    if (navbarMenu) {
      navbarMenu.innerHTML =
        '<a href="#" class="logo"><img src="assets/images/logo-sm.png" alt="" height="22"></a>';
    }

    var twoColumnMenu = document.createElement("ul");
    twoColumnMenu.className = "twocolumn-iconview";

    var menuLinks = document
      .getElementById("navbar-nav")
      .querySelectorAll(".menu-link");

    menuLinks.forEach(function (menuLink) {
      menuLink.querySelectorAll("span").forEach(function (span) {
        span.classList.add("d-none");
      });

      var listItem = document.createElement("li");
      listItem.appendChild(menuLink);
      twoColumnMenu.appendChild(listItem);

      menuLink.classList.replace("nav-link", "nav-icon");
      menuLink.classList.remove("collapsed", "menu-link");

      if (menuLink.parentElement.classList.contains("twocolumn-item-show")) {
        menuLink.classList.add("active");
      }
    });

    var currentPath = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    var currentNavItem = document
      .getElementById("navbar-nav")
      .querySelector('[href="' + currentPath + '"]');

    if (currentNavItem) {
      var collapseMenu = currentNavItem.closest(".collapse.menu-dropdown");
      if (collapseMenu) {
        collapseMenu.classList.add("show");
        collapseMenu.parentElement.children[0].classList.add("active");
        collapseMenu.parentElement.children[0].setAttribute(
          "aria-expanded",
          "true"
        );

        var parentCollapse = collapseMenu.parentElement.closest(
          ".collapse.menu-dropdown"
        );
        if (parentCollapse) {
          parentCollapse.classList.add("show");
          parentCollapse.parentElement.children[0].classList.add("active");
        }
      }
    }

    document.getElementById("two-column-menu").innerHTML =
      twoColumnMenu.outerHTML;

    var menuLinksInTwoColumn = document
      .querySelector("#two-column-menu ul")
      .querySelectorAll("li a");
    menuLinksInTwoColumn.forEach(function (menuLink) {
      var href = menuLink.getAttribute("href").substring(1);

      menuLink.addEventListener("click", function (event) {
        if (
          location.pathname !== "/" + menuLink.getAttribute("href") ||
          menuLink.getAttribute("data-bs-toggle")
        ) {
          document.body.classList.remove("twocolumn-panel");
        }

        document
          .getElementById("navbar-nav")
          .classList.remove("twocolumn-nav-hide");
        document.querySelector(".hamburger-icon").classList.remove("open");

        if (event.target.matches("i")) {
          event.target.closest("a").classList.add("active");
        } else {
          event.target.classList.add("active");
        }

        var targetId = event.target.getAttribute("href").slice(1);
        var targetElement = document.getElementById(targetId);

        if (targetElement) {
          var currentActiveItems = document.getElementsByClassName(
            "twocolumn-item-show"
          );
          if (currentActiveItems.length > 0) {
            currentActiveItems[0].classList.remove("twocolumn-item-show");
          }
          targetElement.parentElement.classList.add("twocolumn-item-show");
        }
      });

      if (
        location.pathname === "/" + menuLink.getAttribute("href") &&
        !menuLink.getAttribute("data-bs-toggle")
      ) {
        menuLink.classList.add("active");
        document
          .getElementById("navbar-nav")
          .classList.add("twocolumn-nav-hide");
        if (document.querySelector(".hamburger-icon")) {
          document.querySelector(".hamburger-icon").classList.add("open");
        }
      }
    });

    if (layout !== "horizontal") {
      new SimpleBar(document.getElementById("navbar-nav"));
      new SimpleBar(document.getElementsByClassName("twocolumn-iconview")[0]);
    }
  }

  function l(e) {
    if (e) {
      var t = e.offsetTop,
        a = e.offsetLeft,
        n = e.offsetWidth,
        o = e.offsetHeight;
      if (e.offsetParent)
        for (; e.offsetParent; )
          (t += (e = e.offsetParent).offsetTop), (a += e.offsetLeft);
      return (
        t >= window.pageYOffset &&
        a >= window.pageXOffset &&
        t + o <= window.pageYOffset + window.innerHeight &&
        a + n <= window.pageXOffset + window.innerWidth
      );
    }
  }

  function r() {
    ("vertical" != document.documentElement.getAttribute("data-layout") &&
      "semibox" != document.documentElement.getAttribute("data-layout")) ||
      ((document.getElementById("two-column-menu").innerHTML = ""),
      document.querySelector(".navbar-menu") &&
        (document.querySelector(".navbar-menu").innerHTML = d),
      document.getElementById("scrollbar").setAttribute("data-simplebar", ""),
      document.getElementById("navbar-nav").setAttribute("data-simplebar", ""),
      document.getElementById("scrollbar").classList.add("h-100")),
      "twocolumn" == document.documentElement.getAttribute("data-layout") &&
        (document.getElementById("scrollbar").removeAttribute("data-simplebar"),
        document.getElementById("scrollbar").classList.remove("h-100")),
      "horizontal" == document.documentElement.getAttribute("data-layout") &&
        b();
  }

  function m() {
    // Remplacer les icônes Feather (si elles sont utilisées)
    feather.replace();

    // Récupérer la largeur de la fenêtre du navigateur
    var windowWidth = document.documentElement.clientWidth;

    // Gestion de la mise en page en fonction de la largeur de la fenêtre
    if (windowWidth < 1025 && 767 < windowWidth) {
      // Pour les tailles d'écran entre 767 et 1024 pixels
      document.body.classList.remove("twocolumn-panel");

      if (sessionStorage.getItem("data-layout") === "twocolumn") {
        // Si le layout est en mode twocolumn
        document.documentElement.setAttribute("data-layout", "twocolumn");
        // Appel des fonctions i(), u(), s() pour les actions spécifiques à ce layout
        i();
        u();
        s();
      }

      if (sessionStorage.getItem("data-layout") === "vertical") {
        // Si le layout est en mode vertical, définir la taille de la barre latérale sur "sm"
        document.documentElement.setAttribute("data-sidebar-size", "sm");
      }

      if (sessionStorage.getItem("data-layout") === "semibox") {
        // Si le layout est en mode semibox, définir la taille de la barre latérale sur "sm"
        document.documentElement.setAttribute("data-sidebar-size", "sm");
      }

      // Ajouter la classe "open" à l'icône de hamburger si elle existe
      if (document.querySelector(".hamburger-icon")) {
        document.querySelector(".hamburger-icon").classList.add("open");
      }
    } else if (1025 <= windowWidth) {
      // Pour les tailles d'écran de 1025 pixels et plus
      document.body.classList.remove("twocolumn-panel");

      if (sessionStorage.getItem("data-layout") === "twocolumn") {
        // Si le layout est en mode twocolumn
        document.documentElement.setAttribute("data-layout", "twocolumn");
        // Appel des fonctions i(), u(), s() pour les actions spécifiques à ce layout
        i();
        u();
        s();
      }

      if (sessionStorage.getItem("data-layout") === "vertical") {
        // Si le layout est en mode vertical, récupérer la taille de la barre latérale depuis le sessionStorage
        document.documentElement.setAttribute(
          "data-sidebar-size",
          sessionStorage.getItem("data-sidebar-size")
        );
      }

      if (sessionStorage.getItem("data-layout") === "semibox") {
        // Si le layout est en mode semibox, récupérer la taille de la barre latérale depuis le sessionStorage
        document.documentElement.setAttribute(
          "data-sidebar-size",
          sessionStorage.getItem("data-sidebar-size")
        );
      }

      // Retirer la classe "open" à l'icône de hamburger si elle existe
      if (document.querySelector(".hamburger-icon")) {
        document.querySelector(".hamburger-icon").classList.remove("open");
      }
    } else if (windowWidth <= 767) {
      // Pour les tailles d'écran inférieures ou égales à 767 pixels
      document.body.classList.remove("vertical-sidebar-enable");
      document.body.classList.add("twocolumn-panel");

      if (sessionStorage.getItem("data-layout") === "twocolumn") {
        // Si le layout est en mode twocolumn
        document.documentElement.setAttribute("data-layout", "vertical");
        // Appel de la fonction y() pour effectuer des actions spécifiques à ce layout
        y("vertical");
        // Appel de la fonction s() pour gérer les événements de la barre de navigation
        s();
      }

      if (sessionStorage.getItem("data-layout") !== "horizontal") {
        // Si le layout n'est pas horizontal, définir la taille de la barre latérale sur "lg"
        document.documentElement.setAttribute("data-sidebar-size", "lg");
      }

      // Ajouter la classe "open" à l'icône de hamburger si elle existe
      if (document.querySelector(".hamburger-icon")) {
        document.querySelector(".hamburger-icon").classList.add("open");
      }
    }

    // Ajouter des événements de clic et de survol aux éléments de la barre de navigation
    var navbarItems = document.querySelectorAll("#navbar-nav > li.nav-item");
    Array.from(navbarItems).forEach(function (item) {
      item.addEventListener("click", toggleNavbar.bind(this), false);
      item.addEventListener("mouseover", toggleNavbar.bind(this), false);
    });
  }

  function c(e) {
    if (e.target && e.target.matches("a.nav-link span"))
      if (0 == l(e.target.parentElement.nextElementSibling)) {
        e.target.parentElement.nextElementSibling.classList.add(
          "dropdown-custom-right"
        ),
          e.target.parentElement.parentElement.parentElement.parentElement.classList.add(
            "dropdown-custom-right"
          );
        var t = e.target.parentElement.nextElementSibling;
        Array.from(t.querySelectorAll(".menu-dropdown")).forEach(function (e) {
          e.classList.add("dropdown-custom-right");
        });
      } else if (
        1 == l(e.target.parentElement.nextElementSibling) &&
        1848 <= window.innerWidth
      )
        for (
          var a = document.getElementsByClassName("dropdown-custom-right");
          0 < a.length;

        )
          a[0].classList.remove("dropdown-custom-right");
    if (e.target && e.target.matches("a.nav-link"))
      if (0 == l(e.target.nextElementSibling)) {
        e.target.nextElementSibling.classList.add("dropdown-custom-right"),
          e.target.parentElement.parentElement.parentElement.classList.add(
            "dropdown-custom-right"
          );
        t = e.target.nextElementSibling;
        Array.from(t.querySelectorAll(".menu-dropdown")).forEach(function (e) {
          e.classList.add("dropdown-custom-right");
        });
      } else if (
        1 == l(e.target.nextElementSibling) &&
        1848 <= window.innerWidth
      )
        for (
          a = document.getElementsByClassName("dropdown-custom-right");
          0 < a.length;

        )
          a[0].classList.remove("dropdown-custom-right");
  }

  function O() {
    var screenWidth = document.documentElement.clientWidth;

    // Toggle hamburger icon
    if (screenWidth > 767) {
      document.querySelector(".hamburger-icon").classList.toggle("open");
    }

    // Toggle menu class based on layout
    var layout = document.documentElement.getAttribute("data-layout");
    if (layout === "horizontal") {
      document.body.classList.toggle("menu");
    }

    // Toggle sidebar size based on layout and screen width
    if (layout === "vertical" || layout === "semibox") {
      var sidebarSize =
        screenWidth > 767 ? (screenWidth > 1025 ? "lg" : "sm") : "lg";
      document.body.classList.toggle(
        "vertical-sidebar-enable",
        screenWidth <= 767
      );
      document.documentElement.setAttribute("data-sidebar-size", sidebarSize);
    }

    // Toggle twocolumn-panel class
    if (layout === "twocolumn") {
      document.body.classList.toggle("twocolumn-panel");
    }
  }

  function G() {
    document.addEventListener("DOMContentLoaded", function () {
      var switchers = document.querySelectorAll(".code-switcher");
      switchers.forEach(function (switcher) {
        switcher.addEventListener("change", function () {
          var card = switcher.closest(".card"),
            livePreview = card.querySelector(".live-preview"),
            codeView = card.querySelector(".code-view");
          switcher.checked
            ? (livePreview.classList.add("d-none"),
              codeView.classList.remove("d-none"))
            : (livePreview.classList.remove("d-none"),
              codeView.classList.add("d-none"));
        });
      });
      feather.replace();
    });

    window.addEventListener("resize", m);
    m();
    Waves.init();

    document.addEventListener("scroll", function () {
      var topbar = document.getElementById("page-topbar");
      topbar &&
        (50 <= document.body.scrollTop ||
        50 <= document.documentElement.scrollTop
          ? topbar.classList.add("topbar-shadow")
          : topbar.classList.remove("topbar-shadow"));
    });

    window.addEventListener("load", function () {
      var layout = document.documentElement.getAttribute("data-layout"),
        overlay = document.querySelectorAll(".vertical-overlay");
      ("twocolumn" == layout ? u : g)();

      overlay &&
        overlay.forEach(function (overlay) {
          overlay.addEventListener("click", function () {
            document.body.classList.remove("vertical-sidebar-enable"),
              "twocolumn" == sessionStorage.getItem("data-layout")
                ? document.body.classList.add("twocolumn-panel")
                : document.documentElement.setAttribute(
                    "data-sidebar-size",
                    sessionStorage.getItem("data-sidebar-size")
                  );
          });
        });
      E();
    });

    var defaultAttribute = sessionStorage.getItem("defaultAttribute"),
      parsedAttribute = JSON.parse(defaultAttribute),
      screenWidth = document.documentElement.clientWidth;

    "twocolumn" == parsedAttribute["data-layout"] &&
      screenWidth < 767 &&
      Array.from(
        document.getElementById("two-column-menu").querySelectorAll("li")
      ).forEach(function (menuItem) {
        menuItem.addEventListener("click", function () {
          document.body.classList.remove("twocolumn-panel");
        });
      });
  }

  document.getElementById("topnav-hamburger-icon") &&
    document
      .getElementById("topnav-hamburger-icon")
      .addEventListener("click", O);

  function u() {
    feather.replace();
    var e,
      t,
      a =
        "/" == location.pathname
          ? "index.html"
          : location.pathname.substring(1);
    (a = a.substring(a.lastIndexOf("/") + 1)) &&
      ("twocolumn-panel" == document.body.className &&
        document
          .getElementById("two-column-menu")
          .querySelector('[href="' + a + '"]')
          .classList.add("active"),
      (a = document
        .getElementById("navbar-nav")
        .querySelector('[href="' + a + '"]'))
        ? (a.classList.add("active"),
          (t = (
            (e = a.closest(".collapse.menu-dropdown")) &&
            e.parentElement.closest(".collapse.menu-dropdown")
              ? (e.classList.add("show"),
                e.parentElement.children[0].classList.add("active"),
                e.parentElement
                  .closest(".collapse.menu-dropdown")
                  .parentElement.classList.add("twocolumn-item-show"),
                e.parentElement.parentElement.parentElement.parentElement.closest(
                  ".collapse.menu-dropdown"
                ) &&
                  ((t =
                    e.parentElement.parentElement.parentElement.parentElement
                      .closest(".collapse.menu-dropdown")
                      .getAttribute("id")),
                  e.parentElement.parentElement.parentElement.parentElement
                    .closest(".collapse.menu-dropdown")
                    .parentElement.classList.add("twocolumn-item-show"),
                  e.parentElement
                    .closest(".collapse.menu-dropdown")
                    .parentElement.classList.remove("twocolumn-item-show"),
                  document
                    .getElementById("two-column-menu")
                    .querySelector('[href="#' + t + '"]')) &&
                  document
                    .getElementById("two-column-menu")
                    .querySelector('[href="#' + t + '"]')
                    .classList.add("active"),
                e.parentElement.closest(".collapse.menu-dropdown"))
              : (a
                  .closest(".collapse.menu-dropdown")
                  .parentElement.classList.add("twocolumn-item-show"),
                e)
          ).getAttribute("id")),
          document
            .getElementById("two-column-menu")
            .querySelector('[href="#' + t + '"]') &&
            document
              .getElementById("two-column-menu")
              .querySelector('[href="#' + t + '"]')
              .classList.add("active"))
        : document.body.classList.add("twocolumn-panel"));
  }

  function g() {
    var e =
      "/" == location.pathname ? "index.html" : location.pathname.substring(1);
    (e = e.substring(e.lastIndexOf("/") + 1)) &&
      (e = document
        .getElementById("navbar-nav")
        .querySelector('[href="' + e + '"]')) &&
      (e.classList.add("active"), (e = e.closest(".collapse.menu-dropdown"))) &&
      (e.classList.add("show"),
      e.parentElement.children[0].classList.add("active"),
      e.parentElement.children[0].setAttribute("aria-expanded", "true"),
      e.parentElement.closest(".collapse.menu-dropdown")) &&
      (e.parentElement.closest(".collapse").classList.add("show"),
      e.parentElement.closest(".collapse").previousElementSibling &&
        e.parentElement
          .closest(".collapse")
          .previousElementSibling.classList.add("active"),
      e.parentElement.parentElement.parentElement.parentElement.closest(
        ".collapse.menu-dropdown"
      )) &&
      (e.parentElement.parentElement.parentElement.parentElement
        .closest(".collapse")
        .classList.add("show"),
      e.parentElement.parentElement.parentElement.parentElement.closest(
        ".collapse"
      ).previousElementSibling) &&
      (e.parentElement.parentElement.parentElement.parentElement
        .closest(".collapse")
        .previousElementSibling.classList.add("active"),
      "horizontal" == document.documentElement.getAttribute("data-layout")) &&
      e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.closest(
        ".collapse"
      ) &&
      e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
        .closest(".collapse")
        .previousElementSibling.classList.add("active");
  }

  function l(e) {
    if (e) {
      var t = e.offsetTop,
        a = e.offsetLeft,
        n = e.offsetWidth,
        o = e.offsetHeight;
      if (e.offsetParent)
        for (; e.offsetParent; )
          (t += (e = e.offsetParent).offsetTop), (a += e.offsetLeft);
      return (
        t >= window.pageYOffset &&
        a >= window.pageXOffset &&
        t + o <= window.pageYOffset + window.innerHeight &&
        a + n <= window.pageXOffset + window.innerWidth
      );
    }
  }

  function D() {
    var e = document.querySelectorAll(".counter-value");

    function s(e) {
      return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    e &&
      Array.from(e).forEach(function (o) {
        !(function e() {
          var t = +o.getAttribute("data-target"),
            a = +o.innerText,
            n = t / 250;
          n < 1 && (n = 1),
            a < t
              ? ((o.innerText = (a + n).toFixed(0)), setTimeout(e, 1))
              : (o.innerText = s(t)),
            s(o.innerText);
        })();
      });
  }

  function b() {
    (document.getElementById("two-column-menu").innerHTML = ""),
      document.querySelector(".navbar-menu") &&
        (document.querySelector(".navbar-menu").innerHTML = d),
      document.getElementById("scrollbar").removeAttribute("data-simplebar"),
      document.getElementById("navbar-nav").removeAttribute("data-simplebar"),
      document.getElementById("scrollbar").classList.remove("h-100");
    var a = M,
      n = document.querySelectorAll("ul.navbar-nav > li.nav-item"),
      o = "",
      s = "";
    Array.from(n).forEach(function (e, t) {
      t + 1 === a && (s = e),
        a < t + 1 && ((o += e.outerHTML), e.remove()),
        t + 1 === n.length &&
          s.insertAdjacentHTML &&
          s.insertAdjacentHTML(
            "afterend",
            '<li class="nav-item">\t\t\t\t\t\t<a class="nav-link" href="#sidebarMore" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarMore">\t\t\t\t\t\t\t<i class="ri-briefcase-2-line"></i> <span data-key="t-more">More</span>\t\t\t\t\t\t</a>\t\t\t\t\t\t<div class="collapse menu-dropdown" id="sidebarMore"><ul class="nav nav-sm flex-column">' +
              o +
              "</ul></div>\t\t\t\t\t</li>"
          );
    });
  }

  function y(e) {
    "vertical" == e
      ? ((document.getElementById("two-column-menu").innerHTML = ""),
        document.querySelector(".navbar-menu") &&
          (document.querySelector(".navbar-menu").innerHTML = d),
        document.getElementById("theme-settings-offcanvas") &&
          ((document.getElementById("sidebar-size").style.display = "block"),
          (document.getElementById("sidebar-view").style.display = "block"),
          (document.getElementById("sidebar-color").style.display = "block"),
          document.getElementById("sidebar-img") &&
            (document.getElementById("sidebar-img").style.display = "block"),
          (document.getElementById("layout-position").style.display = "block"),
          (document.getElementById("layout-width").style.display = "block"),
          (document.getElementById("sidebar-visibility").style.display =
            "none")),
        r(),
        g(),
        E(),
        p())
      : "horizontal" == e
      ? (b(),
        document.getElementById("theme-settings-offcanvas") &&
          ((document.getElementById("sidebar-size").style.display = "none"),
          (document.getElementById("sidebar-view").style.display = "none"),
          (document.getElementById("sidebar-color").style.display = "none"),
          document.getElementById("sidebar-img") &&
            (document.getElementById("sidebar-img").style.display = "none"),
          (document.getElementById("layout-position").style.display = "block"),
          (document.getElementById("layout-width").style.display = "block"),
          (document.getElementById("sidebar-visibility").style.display =
            "none")),
        g())
      : "twocolumn" == e
      ? (document.getElementById("scrollbar").removeAttribute("data-simplebar"),
        document.getElementById("scrollbar").classList.remove("h-100"),
        document.getElementById("theme-settings-offcanvas") &&
          ((document.getElementById("sidebar-size").style.display = "none"),
          (document.getElementById("sidebar-view").style.display = "none"),
          (document.getElementById("sidebar-color").style.display = "block"),
          document.getElementById("sidebar-img") &&
            (document.getElementById("sidebar-img").style.display = "block"),
          (document.getElementById("layout-position").style.display = "none"),
          (document.getElementById("layout-width").style.display = "none"),
          (document.getElementById("sidebar-visibility").style.display =
            "none")))
      : "semibox" == e &&
        ((document.getElementById("two-column-menu").innerHTML = ""),
        document.querySelector(".navbar-menu") &&
          (document.querySelector(".navbar-menu").innerHTML = d),
        document.getElementById("theme-settings-offcanvas") &&
          ((document.getElementById("sidebar-size").style.display = "block"),
          (document.getElementById("sidebar-view").style.display = "none"),
          (document.getElementById("sidebar-color").style.display = "block"),
          document.getElementById("sidebar-img") &&
            (document.getElementById("sidebar-img").style.display = "block"),
          (document.getElementById("layout-position").style.display = "block"),
          (document.getElementById("layout-width").style.display = "none"),
          (document.getElementById("sidebar-visibility").style.display =
            "block")),
        r(),
        g(),
        E(),
        p());
  }

  function E() {
    document
      .getElementById("vertical-hover")
      .addEventListener("click", function () {
        "sm-hover" ===
        document.documentElement.getAttribute("data-sidebar-size")
          ? document.documentElement.setAttribute(
              "data-sidebar-size",
              "sm-hover-active"
            )
          : (document.documentElement.getAttribute("data-sidebar-size"),
            document.documentElement.setAttribute(
              "data-sidebar-size",
              "sm-hover"
            ));
      });
  }

  function e(e) {
    if (e == e) {
      switch (e["data-layout"]) {
        case "vertical":
          T("data-layout", "vertical"),
            sessionStorage.setItem("data-layout", "vertical"),
            document.documentElement.setAttribute("data-layout", "vertical"),
            y("vertical"),
            s();
          break;
        case "horizontal":
          T("data-layout", "horizontal"),
            sessionStorage.setItem("data-layout", "horizontal"),
            document.documentElement.setAttribute("data-layout", "horizontal"),
            y("horizontal");
          break;
        case "twocolumn":
          T("data-layout", "twocolumn"),
            sessionStorage.setItem("data-layout", "twocolumn"),
            document.documentElement.setAttribute("data-layout", "twocolumn"),
            y("twocolumn");
          break;
        case "semibox":
          T("data-layout", "semibox"),
            sessionStorage.setItem("data-layout", "semibox"),
            document.documentElement.setAttribute("data-layout", "semibox"),
            y("semibox");
          break;
        default:
          "vertical" == sessionStorage.getItem("data-layout") &&
          sessionStorage.getItem("data-layout")
            ? (T("data-layout", "vertical"),
              sessionStorage.setItem("data-layout", "vertical"),
              document.documentElement.setAttribute("data-layout", "vertical"),
              y("vertical"),
              s())
            : "horizontal" == sessionStorage.getItem("data-layout")
            ? (T("data-layout", "horizontal"),
              sessionStorage.setItem("data-layout", "horizontal"),
              document.documentElement.setAttribute(
                "data-layout",
                "horizontal"
              ),
              y("horizontal"))
            : "twocolumn" == sessionStorage.getItem("data-layout")
            ? (T("data-layout", "twocolumn"),
              sessionStorage.setItem("data-layout", "twocolumn"),
              document.documentElement.setAttribute("data-layout", "twocolumn"),
              y("twocolumn"))
            : "semibox" == sessionStorage.getItem("data-layout") &&
              (T("data-layout", "semibox"),
              sessionStorage.setItem("data-layout", "semibox"),
              document.documentElement.setAttribute("data-layout", "semibox"),
              y("semibox"));
      }
      switch (e["data-topbar"]) {
        case "light":
          T("data-topbar", "light"),
            sessionStorage.setItem("data-topbar", "light"),
            document.documentElement.setAttribute("data-topbar", "light");
          break;
        case "dark":
          T("data-topbar", "dark"),
            sessionStorage.setItem("data-topbar", "dark"),
            document.documentElement.setAttribute("data-topbar", "dark");
          break;
        default:
          "dark" == sessionStorage.getItem("data-topbar")
            ? (T("data-topbar", "dark"),
              sessionStorage.setItem("data-topbar", "dark"),
              document.documentElement.setAttribute("data-topbar", "dark"))
            : (T("data-topbar", "light"),
              sessionStorage.setItem("data-topbar", "light"),
              document.documentElement.setAttribute("data-topbar", "light"));
      }
      switch (
        ("hidden" === e["data-sidebar-visibility"]
          ? (T("data-sidebar-visibility", "hidden"),
            sessionStorage.setItem("data-sidebar-visibility", "hidden"),
            document.documentElement.setAttribute(
              "data-sidebar-visibility",
              "hidden"
            ))
          : (T("data-sidebar-visibility", "show"),
            sessionStorage.setItem("data-sidebar-visibility", "show"),
            document.documentElement.setAttribute(
              "data-sidebar-visibility",
              "show"
            )),
        e["data-layout-style"])
      ) {
        case "default":
          T("data-layout-style", "default"),
            sessionStorage.setItem("data-layout-style", "default"),
            document.documentElement.setAttribute(
              "data-layout-style",
              "default"
            );
          break;
        case "detached":
          T("data-layout-style", "detached"),
            sessionStorage.setItem("data-layout-style", "detached"),
            document.documentElement.setAttribute(
              "data-layout-style",
              "detached"
            );
          break;
        default:
          "detached" == sessionStorage.getItem("data-layout-style")
            ? (T("data-layout-style", "detached"),
              sessionStorage.setItem("data-layout-style", "detached"),
              document.documentElement.setAttribute(
                "data-layout-style",
                "detached"
              ))
            : (T("data-layout-style", "default"),
              sessionStorage.setItem("data-layout-style", "default"),
              document.documentElement.setAttribute(
                "data-layout-style",
                "default"
              ));
      }
      switch (e["data-sidebar-size"]) {
        case "lg":
          T("data-sidebar-size", "lg"),
            document.documentElement.setAttribute("data-sidebar-size", "lg"),
            sessionStorage.setItem("data-sidebar-size", "lg");
          break;
        case "sm":
          T("data-sidebar-size", "sm"),
            document.documentElement.setAttribute("data-sidebar-size", "sm"),
            sessionStorage.setItem("data-sidebar-size", "sm");
          break;
        case "md":
          T("data-sidebar-size", "md"),
            document.documentElement.setAttribute("data-sidebar-size", "md"),
            sessionStorage.setItem("data-sidebar-size", "md");
          break;
        case "sm-hover":
          T("data-sidebar-size", "sm-hover"),
            document.documentElement.setAttribute(
              "data-sidebar-size",
              "sm-hover"
            ),
            sessionStorage.setItem("data-sidebar-size", "sm-hover");
          break;
        default:
          "sm" == sessionStorage.getItem("data-sidebar-size")
            ? (document.documentElement.setAttribute("data-sidebar-size", "sm"),
              T("data-sidebar-size", "sm"),
              sessionStorage.setItem("data-sidebar-size", "sm"))
            : "md" == sessionStorage.getItem("data-sidebar-size")
            ? (document.documentElement.setAttribute("data-sidebar-size", "md"),
              T("data-sidebar-size", "md"),
              sessionStorage.setItem("data-sidebar-size", "md"))
            : "sm-hover" == sessionStorage.getItem("data-sidebar-size")
            ? (document.documentElement.setAttribute(
                "data-sidebar-size",
                "sm-hover"
              ),
              T("data-sidebar-size", "sm-hover"),
              sessionStorage.setItem("data-sidebar-size", "sm-hover"))
            : (document.documentElement.setAttribute("data-sidebar-size", "lg"),
              T("data-sidebar-size", "lg"),
              sessionStorage.setItem("data-sidebar-size", "lg"));
      }
      switch (e["data-bs-theme"]) {
        case "light":
          T("data-bs-theme", "light"),
            document.documentElement.setAttribute("data-bs-theme", "light"),
            sessionStorage.setItem("data-bs-theme", "light");
          break;
        case "dark":
          T("data-bs-theme", "dark"),
            document.documentElement.setAttribute("data-bs-theme", "dark"),
            sessionStorage.setItem("data-bs-theme", "dark");
          break;
        default:
          sessionStorage.getItem("data-bs-theme") &&
          "dark" == sessionStorage.getItem("data-bs-theme")
            ? (sessionStorage.setItem("data-bs-theme", "dark"),
              document.documentElement.setAttribute("data-bs-theme", "dark"),
              T("data-bs-theme", "dark"))
            : (sessionStorage.setItem("data-bs-theme", "light"),
              document.documentElement.setAttribute("data-bs-theme", "light"),
              T("data-bs-theme", "light"));
      }
      switch (e["data-layout-width"]) {
        case "fluid":
          T("data-layout-width", "fluid"),
            document.documentElement.setAttribute("data-layout-width", "fluid"),
            sessionStorage.setItem("data-layout-width", "fluid");
          break;
        case "boxed":
          T("data-layout-width", "boxed"),
            document.documentElement.setAttribute("data-layout-width", "boxed"),
            sessionStorage.setItem("data-layout-width", "boxed");
          break;
        default:
          "boxed" == sessionStorage.getItem("data-layout-width")
            ? (sessionStorage.setItem("data-layout-width", "boxed"),
              document.documentElement.setAttribute(
                "data-layout-width",
                "boxed"
              ),
              T("data-layout-width", "boxed"))
            : (sessionStorage.setItem("data-layout-width", "fluid"),
              document.documentElement.setAttribute(
                "data-layout-width",
                "fluid"
              ),
              T("data-layout-width", "fluid"));
      }
      switch (e["data-sidebar"]) {
        case "light":
          T("data-sidebar", "light"),
            sessionStorage.setItem("data-sidebar", "light"),
            document.documentElement.setAttribute("data-sidebar", "light");
          break;
        case "dark":
          T("data-sidebar", "dark"),
            sessionStorage.setItem("data-sidebar", "dark"),
            document.documentElement.setAttribute("data-sidebar", "dark");
          break;
        case "gradient":
          T("data-sidebar", "gradient"),
            sessionStorage.setItem("data-sidebar", "gradient"),
            document.documentElement.setAttribute("data-sidebar", "gradient");
          break;
        case "gradient-2":
          T("data-sidebar", "gradient-2"),
            sessionStorage.setItem("data-sidebar", "gradient-2"),
            document.documentElement.setAttribute("data-sidebar", "gradient-2");
          break;
        case "gradient-3":
          T("data-sidebar", "gradient-3"),
            sessionStorage.setItem("data-sidebar", "gradient-3"),
            document.documentElement.setAttribute("data-sidebar", "gradient-3");
          break;
        case "gradient-4":
          T("data-sidebar", "gradient-4"),
            sessionStorage.setItem("data-sidebar", "gradient-4"),
            document.documentElement.setAttribute("data-sidebar", "gradient-4");
          break;
        default:
          sessionStorage.getItem("data-sidebar") &&
          "light" == sessionStorage.getItem("data-sidebar")
            ? (sessionStorage.setItem("data-sidebar", "light"),
              T("data-sidebar", "light"),
              document.documentElement.setAttribute("data-sidebar", "light"))
            : "dark" == sessionStorage.getItem("data-sidebar")
            ? (sessionStorage.setItem("data-sidebar", "dark"),
              T("data-sidebar", "dark"),
              document.documentElement.setAttribute("data-sidebar", "dark"))
            : "gradient" == sessionStorage.getItem("data-sidebar")
            ? (sessionStorage.setItem("data-sidebar", "gradient"),
              T("data-sidebar", "gradient"),
              document.documentElement.setAttribute("data-sidebar", "gradient"))
            : "gradient-2" == sessionStorage.getItem("data-sidebar")
            ? (sessionStorage.setItem("data-sidebar", "gradient-2"),
              T("data-sidebar", "gradient-2"),
              document.documentElement.setAttribute(
                "data-sidebar",
                "gradient-2"
              ))
            : "gradient-3" == sessionStorage.getItem("data-sidebar")
            ? (sessionStorage.setItem("data-sidebar", "gradient-3"),
              T("data-sidebar", "gradient-3"),
              document.documentElement.setAttribute(
                "data-sidebar",
                "gradient-3"
              ))
            : "gradient-4" == sessionStorage.getItem("data-sidebar") &&
              (sessionStorage.setItem("data-sidebar", "gradient-4"),
              T("data-sidebar", "gradient-4"),
              document.documentElement.setAttribute(
                "data-sidebar",
                "gradient-4"
              ));
      }
      switch (e["data-sidebar-image"]) {
        case "none":
          T("data-sidebar-image", "none"),
            sessionStorage.setItem("data-sidebar-image", "none"),
            document.documentElement.setAttribute("data-sidebar-image", "none");
          break;
        case "img-1":
          T("data-sidebar-image", "img-1"),
            sessionStorage.setItem("data-sidebar-image", "img-1"),
            document.documentElement.setAttribute(
              "data-sidebar-image",
              "img-1"
            );
          break;
        case "img-2":
          T("data-sidebar-image", "img-2"),
            sessionStorage.setItem("data-sidebar-image", "img-2"),
            document.documentElement.setAttribute(
              "data-sidebar-image",
              "img-2"
            );
          break;
        case "img-3":
          T("data-sidebar-image", "img-3"),
            sessionStorage.setItem("data-sidebar-image", "img-3"),
            document.documentElement.setAttribute(
              "data-sidebar-image",
              "img-3"
            );
          break;
        case "img-4":
          T("data-sidebar-image", "img-4"),
            sessionStorage.setItem("data-sidebar-image", "img-4"),
            document.documentElement.setAttribute(
              "data-sidebar-image",
              "img-4"
            );
          break;
        default:
          sessionStorage.getItem("data-sidebar-image") &&
          "none" == sessionStorage.getItem("data-sidebar-image")
            ? (sessionStorage.setItem("data-sidebar-image", "none"),
              T("data-sidebar-image", "none"),
              document.documentElement.setAttribute(
                "data-sidebar-image",
                "none"
              ))
            : "img-1" == sessionStorage.getItem("data-sidebar-image")
            ? (sessionStorage.setItem("data-sidebar-image", "img-1"),
              T("data-sidebar-image", "img-1"),
              document.documentElement.setAttribute(
                "data-sidebar-image",
                "img-2"
              ))
            : "img-2" == sessionStorage.getItem("data-sidebar-image")
            ? (sessionStorage.setItem("data-sidebar-image", "img-2"),
              T("data-sidebar-image", "img-2"),
              document.documentElement.setAttribute(
                "data-sidebar-image",
                "img-2"
              ))
            : "img-3" == sessionStorage.getItem("data-sidebar-image")
            ? (sessionStorage.setItem("data-sidebar-image", "img-3"),
              T("data-sidebar-image", "img-3"),
              document.documentElement.setAttribute(
                "data-sidebar-image",
                "img-3"
              ))
            : "img-4" == sessionStorage.getItem("data-sidebar-image") &&
              (sessionStorage.setItem("data-sidebar-image", "img-4"),
              T("data-sidebar-image", "img-4"),
              document.documentElement.setAttribute(
                "data-sidebar-image",
                "img-4"
              ));
      }
      switch (e["data-layout-position"]) {
        case "fixed":
          T("data-layout-position", "fixed"),
            sessionStorage.setItem("data-layout-position", "fixed"),
            document.documentElement.setAttribute(
              "data-layout-position",
              "fixed"
            );
          break;
        case "scrollable":
          T("data-layout-position", "scrollable"),
            sessionStorage.setItem("data-layout-position", "scrollable"),
            document.documentElement.setAttribute(
              "data-layout-position",
              "scrollable"
            );
          break;
        default:
          sessionStorage.getItem("data-layout-position") &&
          "scrollable" == sessionStorage.getItem("data-layout-position")
            ? (T("data-layout-position", "scrollable"),
              sessionStorage.setItem("data-layout-position", "scrollable"),
              document.documentElement.setAttribute(
                "data-layout-position",
                "scrollable"
              ))
            : (T("data-layout-position", "fixed"),
              sessionStorage.setItem("data-layout-position", "fixed"),
              document.documentElement.setAttribute(
                "data-layout-position",
                "fixed"
              ));
      }
      switch (e["data-preloader"]) {
        case "disable":
          T("data-preloader", "disable"),
            sessionStorage.setItem("data-preloader", "disable"),
            document.documentElement.setAttribute("data-preloader", "disable");
          break;
        case "enable":
          T("data-preloader", "enable"),
            sessionStorage.setItem("data-preloader", "enable"),
            document.documentElement.setAttribute("data-preloader", "enable"),
            (t = document.getElementById("preloader")) &&
              window.addEventListener("load", function () {
                (t.style.opacity = "0"), (t.style.visibility = "hidden");
              });
          break;
        default:
          var t;
          sessionStorage.getItem("data-preloader") &&
          "disable" == sessionStorage.getItem("data-preloader")
            ? (T("data-preloader", "disable"),
              sessionStorage.setItem("data-preloader", "disable"),
              document.documentElement.setAttribute(
                "data-preloader",
                "disable"
              ))
            : "enable" == sessionStorage.getItem("data-preloader")
            ? (T("data-preloader", "enable"),
              sessionStorage.setItem("data-preloader", "enable"),
              document.documentElement.setAttribute("data-preloader", "enable"),
              (t = document.getElementById("preloader")) &&
                window.addEventListener("load", function () {
                  (t.style.opacity = "0"), (t.style.visibility = "hidden");
                }))
            : document.documentElement.setAttribute(
                "data-preloader",
                "disable"
              );
      }
      switch (e["data-body-image"]) {
        case "img-1":
          T("data-body-image", "img-1"),
            sessionStorage.setItem("data-sidebabodyr-image", "img-1"),
            document.documentElement.setAttribute("data-body-image", "img-1"),
            document.getElementById("theme-settings-offcanvas") &&
              document.documentElement.removeAttribute("data-sidebar-image");
          break;
        case "img-2":
          T("data-body-image", "img-2"),
            sessionStorage.setItem("data-body-image", "img-2"),
            document.documentElement.setAttribute("data-body-image", "img-2");
          break;
        case "img-3":
          T("data-body-image", "img-3"),
            sessionStorage.setItem("data-body-image", "img-3"),
            document.documentElement.setAttribute("data-body-image", "img-3");
          break;
        case "none":
          T("data-body-image", "none"),
            sessionStorage.setItem("data-body-image", "none"),
            document.documentElement.setAttribute("data-body-image", "none");
          break;
        default:
          sessionStorage.getItem("data-body-image") &&
          "img-1" == sessionStorage.getItem("data-body-image")
            ? (sessionStorage.setItem("data-body-image", "img-1"),
              T("data-body-image", "img-1"),
              document.documentElement.setAttribute("data-body-image", "img-1"),
              document.getElementById("theme-settings-offcanvas") &&
                document.getElementById("sidebar-img") &&
                ((document.getElementById("sidebar-img").style.display =
                  "none"),
                document.documentElement.removeAttribute("data-sidebar-image")))
            : "img-2" == sessionStorage.getItem("data-body-image")
            ? (sessionStorage.setItem("data-body-image", "img-2"),
              T("data-body-image", "img-2"),
              document.documentElement.setAttribute("data-body-image", "img-2"))
            : "img-3" == sessionStorage.getItem("data-body-image")
            ? (sessionStorage.setItem("data-body-image", "img-3"),
              T("data-body-image", "img-3"),
              document.documentElement.setAttribute("data-body-image", "img-3"))
            : "none" == sessionStorage.getItem("data-body-image") &&
              (sessionStorage.setItem("data-body-image", "none"),
              T("data-body-image", "none"),
              document.documentElement.setAttribute("data-body-image", "none"));
      }
    }
  }

  function p() {
    setTimeout(function () {
      var e,
        t,
        a = document.getElementById("navbar-nav");
      a &&
        ((a = a.querySelector(".nav-item .active")),
        300 < (e = a ? a.offsetTop : 0)) &&
        (t = document.getElementsByClassName("app-menu")
          ? document.getElementsByClassName("app-menu")[0]
          : "") &&
        t.querySelector(".simplebar-content-wrapper") &&
        setTimeout(function () {
          t.querySelector(".simplebar-content-wrapper").scrollTop =
            330 == e ? e + 85 : e;
        }, 0);
    }, 250);
  }
  var f,
    h,
    v,
    I,
    S,
    w,
    A,
    L,
    B,
    k,
    z,
    q,
    x = new Event("resize");

  function T(n, e) {
    Array.from(document.querySelectorAll("input[name=" + n + "]")).forEach(
      function (a) {
        e == a.value ? (a.checked = !0) : (a.checked = !1),
          a.addEventListener("change", function () {
            document.documentElement.setAttribute(n, a.value),
              sessionStorage.setItem(n, a.value),
              o(),
              "data-layout-width" == n && "boxed" == a.value
                ? (document.documentElement.setAttribute(
                    "data-sidebar-size",
                    "sm-hover"
                  ),
                  sessionStorage.setItem("data-sidebar-size", "sm-hover"),
                  (document.getElementById("sidebar-size-small-hover").checked =
                    !0))
                : "data-layout-width" == n &&
                  "fluid" == a.value &&
                  (document.documentElement.setAttribute(
                    "data-sidebar-size",
                    "lg"
                  ),
                  sessionStorage.setItem("data-sidebar-size", "lg"),
                  (document.getElementById("sidebar-size-default").checked =
                    !0)),
              "data-layout" == n &&
                ("vertical" == a.value
                  ? (y("vertical"), s(), feather.replace())
                  : "horizontal" == a.value
                  ? (document.getElementById("sidebarimg-none") &&
                      document.getElementById("sidebarimg-none").click(),
                    y("horizontal"),
                    feather.replace())
                  : "twocolumn" == a.value
                  ? (y("twocolumn"),
                    document.documentElement.setAttribute(
                      "data-layout-width",
                      "fluid"
                    ),
                    document.getElementById("layout-width-fluid").click(),
                    i(),
                    u(),
                    s(),
                    feather.replace())
                  : "semibox" == a.value &&
                    (y("semibox"),
                    document.documentElement.setAttribute(
                      "data-layout-width",
                      "fluid"
                    ),
                    document.getElementById("layout-width-fluid").click(),
                    document.documentElement.setAttribute(
                      "data-layout-style",
                      "default"
                    ),
                    document.getElementById("sidebar-view-default").click(),
                    s(),
                    feather.replace()));
            var e,
              t = "block";
            "semibox" == document.documentElement.getAttribute("data-layout") &&
              ("hidden" ==
              document.documentElement.getAttribute("data-sidebar-visibility")
                ? (document.documentElement.removeAttribute("data-sidebar"),
                  document.documentElement.removeAttribute(
                    "data-sidebar-image"
                  ),
                  document.documentElement.removeAttribute("data-sidebar-size"),
                  (t = "none"))
                : (document.documentElement.setAttribute(
                    "data-sidebar",
                    sessionStorage.getItem("data-sidebar")
                  ),
                  document.documentElement.setAttribute(
                    "data-sidebar-image",
                    sessionStorage.getItem("data-sidebar-image")
                  ),
                  document.documentElement.setAttribute(
                    "data-sidebar-size",
                    sessionStorage.getItem("data-sidebar-size")
                  ))),
              (document.getElementById("sidebar-size").style.display = t),
              (document.getElementById("sidebar-color").style.display = t),
              document.getElementById("sidebar-img") &&
                (document.getElementById("sidebar-img").style.display = t),
              "data-preloader" == n && "enable" == a.value
                ? (document.documentElement.setAttribute(
                    "data-preloader",
                    "enable"
                  ),
                  (e = document.getElementById("preloader")) &&
                    setTimeout(function () {
                      (e.style.opacity = "0"), (e.style.visibility = "hidden");
                    }, 1e3),
                  document.getElementById("customizerclose-btn").click())
                : "data-preloader" == n &&
                  "disable" == a.value &&
                  (document.documentElement.setAttribute(
                    "data-preloader",
                    "disable"
                  ),
                  document.getElementById("customizerclose-btn").click()),
              "data-bs-theme" == n && window.dispatchEvent(x);
          });
      }
    ),
      document.getElementById("collapseBgGradient") &&
        Array.from(
          document.querySelectorAll("#collapseBgGradient .form-check input")
        ).forEach(function (e) {
          var t = document.getElementById("collapseBgGradient");
          1 == e.checked && new bootstrap.Collapse(t, { toggle: !1 }).show(),
            document.querySelector("[data-bs-target='#collapseBgGradient']") &&
              document
                .querySelector("[data-bs-target='#collapseBgGradient']")
                .addEventListener("click", function (e) {
                  document.getElementById("sidebar-color-gradient").click();
                });
        }),
      document.querySelectorAll(
        "[data-bs-target='#collapseBgGradient.show']"
      ) &&
        Array.from(
          document.querySelectorAll(
            "[data-bs-target='#collapseBgGradient.show']"
          )
        ).forEach(function (e) {
          e.addEventListener("click", function () {
            var e = document.getElementById("collapseBgGradient");
            new bootstrap.Collapse(e, { toggle: !1 }).hide();
          });
        }),
      Array.from(document.querySelectorAll("[name='data-sidebar']")).forEach(
        function (e) {
          document.querySelector("[data-bs-target='#collapseBgGradient']") &&
            (document.querySelector(
              "#collapseBgGradient .form-check input:checked"
            )
              ? document
                  .querySelector("[data-bs-target='#collapseBgGradient']")
                  .classList.add("active")
              : document
                  .querySelector("[data-bs-target='#collapseBgGradient']")
                  .classList.remove("active"),
            e.addEventListener("change", function () {
              document.querySelector(
                "#collapseBgGradient .form-check input:checked"
              )
                ? document
                    .querySelector("[data-bs-target='#collapseBgGradient']")
                    .classList.add("active")
                : document
                    .querySelector("[data-bs-target='#collapseBgGradient']")
                    .classList.remove("active");
            }));
        }
      );
  }

  function C(e, t, a, n) {
    var o = document.getElementById(a);
    n.setAttribute(e, t), o && document.getElementById(a).click();
  }

  function N() {
    document.webkitIsFullScreen ||
      document.mozFullScreen ||
      document.msFullscreenElement ||
      document.body.classList.remove("fullscreen-enable");
  }

  function F() {
    var t = 0;
    Array.from(document.getElementsByClassName("cart-item-price")).forEach(
      function (e) {
        t += parseFloat(e.innerHTML);
      }
    ),
      document.getElementById("cart-item-total") &&
        (document.getElementById("cart-item-total").innerHTML =
          "$" + t.toFixed(2));
  }

  function H() {
    Array.from(
      document.querySelectorAll("#notificationItemsTabContent .tab-pane")
    ).forEach(function (e) {
      0 < e.querySelectorAll(".notification-item").length
        ? e.querySelector(".view-all") &&
          (e.querySelector(".view-all").style.display = "block")
        : (e.querySelector(".view-all") &&
            (e.querySelector(".view-all").style.display = "none"),
          e.querySelector(".empty-notification-elem") ||
            (e.innerHTML +=
              '<div class="empty-notification-elem">\t\t\t\t\t\t\t<div class="w-25 w-sm-50 pt-3 mx-auto">\t\t\t\t\t\t\t\t<img src="assets/images/svg/bell.svg" class="img-fluid" alt="user-pic">\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<div class="text-center pb-5 mt-2">\t\t\t\t\t\t\t\t<h6 class="fs-18 fw-semibold lh-base">Hey! You have no any notifications </h6>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>'));
    });
  }

  function W() {
    if ("horizontal" !== document.documentElement.getAttribute("data-layout")) {
      initializeSimpleBars();
      clearTimeout(q);
    }
  }

  function initializeSimpleBars() {
    var navbar = document.getElementById("navbar-nav");
    if (navbar) new SimpleBar(navbar).getContentElement();

    var twocolumnIconView = document.querySelector(".twocolumn-iconview");
    if (twocolumnIconView) new SimpleBar(twocolumnIconView).getContentElement();
  }

  function handleSearchOptions() {
    var searchOptions = document.getElementById("search-options");
    if (!searchOptions) return;

    searchOptions.addEventListener("focus", function () {
      var searchValue = searchOptions.value.toLowerCase();
      var notifyItems = document.getElementsByClassName("notify-item");
      Array.from(notifyItems).forEach(function (item) {
        var text = item.querySelector("h6")
          ? item.querySelector("h6").innerText.toLowerCase()
          : item.getElementsByTagName("span")[0].innerText.toLowerCase();
        item.style.display = text.includes(searchValue) ? "block" : "none";
      });
    });

    var searchCloseOptions = document.getElementById("search-close-options");
    searchCloseOptions.addEventListener("click", function () {
      searchOptions.value = "";
      searchCloseOptions.classList.add("d-none");
    });
  }

  function handleFullscreenToggle() {
    var fullscreenToggle = document.querySelector('[data-toggle="fullscreen"]');
    if (!fullscreenToggle) return;

    fullscreenToggle.addEventListener("click", function (e) {
      e.preventDefault();
      document.body.classList.toggle("fullscreen-enable");
      toggleFullscreen();
    });
  }

  function toggleFullscreen() {
    var fullscreenElement =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement;
    if (fullscreenElement) {
      exitFullscreen();
    } else {
      requestFullscreen();
    }
  }

  function requestFullscreen() {
    var element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  }

  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    handleSearchOptions();
    handleFullscreenToggle();
  });

  window.addEventListener("resize", function () {
    clearTimeout(q);
    q = setTimeout(W, 2000);
  });
})();
var mybutton = document.getElementById("back-to-top");

function scrollFunction() {
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  mybutton.style.display = scrollTop > 100 ? "block" : "none";
}

function topFunction() {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

if (mybutton) {
  window.addEventListener("scroll", scrollFunction);
}
