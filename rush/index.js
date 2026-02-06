(function () {

    var redactedElements = document.querySelectorAll(".redacted");

    redactedElements.forEach(function (el) {
        el.addEventListener("click", function () {
            if (el.classList.contains("revealed")) {
                el.textContent = "XXXXXXXX";
                el.classList.remove("revealed");
            } else {
                var hiddenText = el.getAttribute("data-text");
                if (hiddenText) {
                    el.textContent = hiddenText;
                    el.classList.add("revealed");
                }
            }
        });
    });
})();