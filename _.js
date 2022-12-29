window.onload = function () {
    //**********
    //Carousel
    //**********
    var carousel = document.querySelector(".carousel"),
        figure = carousel.querySelector("figure"),
        nav = carousel.querySelector("nav"),
        numImages = figure.childElementCount - 1,
        theta = (2 * Math.PI) / numImages,
        currImage = 1;

    function handleRotation(e) {
        e.stopPropagation();

        var t = e.target;
        if (t.tagName.toUpperCase() != "BUTTON") return;

        if (t.classList.contains("next")) {
            currImage++;
        } else if (t.classList.contains("prev")) {
            currImage--;
        }

        figure.style.transform = `rotateY(${currImage * -theta}rad)`;
    }
    let arrowBtns = document.querySelectorAll(".arrow-btn");
    arrowBtns.forEach((btn) => {
        btn.addEventListener("click", function (e) {
            setTimeout(function () {
                handleRotation(e)
                let currentService = document.querySelector(".pub-service-item.active");
                console.log({ idService: currentService.id });
                generateResult(currentService.id);
            }, 100);
        });
    });

    // Handle Keydown
    document.addEventListener("keydown", function (event) {
        if (event.code === "ArrowLeft") {
            document.getElementById("left-arrow-btn").click();
        } else if (event.code === "ArrowRight") {
            document.getElementById("right-arrow-btn").click();
        }
    });

    let pubServicesBloc = document.querySelectorAll(".pub-service");
    pubServicesBloc.forEach((pubServiceBloc) => {
        pubServiceBloc.addEventListener("click", function (event) {
            pubServicesBloc.forEach((item) => {
                item.classList.remove("bg-slate-100");
                item.classList.remove("border-blue-800");
                item.classList.add("border-gray-400");
                item.classList.remove("active");
            });

            this.classList.add("bg-slate-100");
            this.classList.add("active");
            this.classList.add("border-gray-400");
            this.classList.add("border-blue-800");

            generateResult(this.id);
        });
    });

    let ledSites = document.querySelectorAll(".led-sites");
    let auchanLedSites =
        document.querySelectorAll(".auchan-led-sites");

    ledSites.forEach((siteCheckbox) =>
        siteCheckbox.addEventListener("change", function (e) {
            getNumberOfDaysForOutDoorLed("ledOutDoor");
        })
    );

    auchanLedSites.forEach((siteCheckbox) =>
        siteCheckbox.addEventListener("change", function (e) {
            getNumberOfDaysForOutDoorLed("ledAuchan");
        })
    );

    let radioTypes = document.querySelectorAll(".radio-type");
    radioTypes.forEach((radioType) =>
        radioType.addEventListener("change", function (e) {
            getSpotNumberForRadio(radioType.id);
        })
    );

    let userBudget = document.querySelector(".user-budget");
    userBudget.addEventListener("input", function (event) {
        let currentService = document.querySelector(".pub-service-item.active");
        generateResult(currentService.id);
    });

    function getNumberOfViews() {
        let viewsCounter = document.getElementById("views-counter");
        viewsCounter.textContent = `${(
            userBudget.value * 10000
        ).toLocaleString("fr-FR")}`;
    }

    function getNumberOfDaysForOutDoorLed(ledType) {

        let sitesCounter, unitPrice;
        switch (ledType) {
            case "ledOutDoor":
                unitPrice = 10;
                sitesCounter = [...ledSites].filter(
                    (site) => site.checked == true
                ).length;
                break;
            case "ledAuchan":
                unitPrice = 17;
                sitesCounter = [...auchanLedSites].filter(
                    (site) => site.checked == true
                ).length;
                break;
            default:
                console.log("default case ");
                break;
        }

        let numberOfDays = 0;
        if (sitesCounter > 0) {
            numberOfDays = Math.floor(
                userBudget.value / (unitPrice * sitesCounter)
            );
        }

        let daysCounter = document.getElementById("days-counter");
        daysCounter.textContent = `${numberOfDays}`;
    }

    function getSpotNumberForRadio(radioType = "radios-locales") {
        let radioSpotCounter =
            document.getElementById("spot-counter");
        if (userBudget.value <= 0) {
            radioSpotCounter.textContent = `0`;
        }
        let unitPrice;
        switch (radioType) {
            case "radios-panaf":
                unitPrice = 40;
                break;
            case "radios-locales":
                unitPrice = 21;
                break;
            case "radios-auchan":
                unitPrice = 17;
                break;
            default:
                console.log("unkown radio type");
                break;
        }

        radioSpotCounter.textContent = `${Math.floor(
            userBudget.value / unitPrice
        ).toLocaleString("fr-FR")}`;
    }

    function getNumberOfSMS() {
        let smsCounter = document.getElementById("sms-counter");
        let numberOfSMS = Math.floor(userBudget.value / 0.008);
        smsCounter.textContent = `${numberOfSMS}`;
    }

    function getNumberOfCall() {
        let callCounter = document.getElementById("call-counter");
        let numberOfCall = Math.floor(userBudget.value / 0.035);
        callCounter.textContent = `${numberOfCall} `;
    }

    function getNumberOfBot() {
        let botCounter = document.getElementById("bot-counter");
        let numberOfBot = Math.floor(userBudget.value / 100);
        botCounter.textContent = `${numberOfBot} `;
    }

    function formatMoney(number) {
        return number.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    }

    function hideAllCounterElements() {
        let counterItems =
            document.querySelectorAll(".counter-item");
        counterItems.forEach((item) =>
            item.classList.add("d-none")
        );
    }

    function generateResult(serviceId) {
        hideAllCounterElements();
        let ledOutDoorSitesContainer = document.getElementById(
            "ledOutDoorSitesContainer"
        );
        let auchanSitesContainer = document.getElementById(
            "auchanLedSitesContainer"
        );
        let radioTypesContainer = document.getElementById(
            "radioTypesContainer"
        );

        ledOutDoorSitesContainer.classList.add("d-none");
        auchanSitesContainer.classList.add("d-none");
        radioTypesContainer.classList.add("d-none");

        switch (serviceId) {
            case "gads":
                getNumberOfViews();
                document
                    .querySelector(".views-counter-element")
                    .classList.remove("d-none");
                break;
            case "ledOutDoor":
                getNumberOfDaysForOutDoorLed("ledOutDoor");
                ledOutDoorSitesContainer.classList.remove("d-none");
                document
                    .querySelector(".days-counter-element")
                    .classList.remove("d-none");
                break;
            case "ledAuchan":
                getNumberOfDaysForOutDoorLed("ledAuchan");
                auchanSitesContainer.classList.remove("d-none");
                document
                    .querySelector(".days-counter-element")
                    .classList.remove("d-none");
                break;
            case "sms":
                getNumberOfSMS();
                document
                    .querySelector(".sms-counter-element")
                    .classList.remove("d-none");
                break;
            case "radio":
                getSpotNumberForRadio();
                radioTypesContainer.classList.remove("d-none");
                document
                    .querySelector(".spot-counter-element")
                    .classList.remove("d-none");
                break;
            case "push-vocal":
                getNumberOfCall();
                document
                    .querySelector(".call-counter-element")
                    .classList.remove("d-none");
                break;
            default:
                break;
        }
    }
    // Google Chart Script
    var budget = 0;
    google.charts.load("current", { packages: ["gauge"] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        data = google.visualization.arrayToDataTable([
            ["Label", "Value"],
            ["Budget", budget],
        ]);

        var options = {
            width: "100%",
            height: "100%",
            redFrom: 0,
            redTo: 300,
            yellowFrom: 300,
            yellowTo: 1000,
            greenFrom: 1000,
            greenTo: 3000,
            minorTicks: 10,
            max: 3000,
        };

        chart = new google.visualization.Gauge(
            document.getElementById("chart_div")
        );
        chart.draw(data, options);

        let addToBudgetBtn = document.querySelector(".add-to-budget-btn");
        addToBudgetBtn.addEventListener("click", function () {
            // let budgetAmountElement = document.getElementById(`${this.dataset.budgetAmount}`);
            let totalbudgetElement = document.getElementById("total-budget");
            budget += +userBudget.value;
            totalbudgetElement.textContent = `$${budget}`;
            var newData = google.visualization.arrayToDataTable(
                [
                    ["Label", "Value"],
                    ["Budget", budget],
                ]
            );

            chart.draw(newData, options);
        });
    }
};