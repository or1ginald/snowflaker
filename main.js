let renderEnj = "posit"
let animationId;
let lastSnowflakeCreationTime;
const positBtn = document.getElementById('positionRerender')
positBtn.addEventListener("click", () => {
    if (renderEnj === "posit") {
        return
    }
    renderEnj = "posit"
    animateSnowflakes(renderEnj);
    console.log("positRerender")
})
const transBtn = document.getElementById('transformRerender')
transBtn.addEventListener("click", () => {
    if (renderEnj === "trans") {
        return
    }
    renderEnj = "trans"
    animateSnowflakes(renderEnj);
    console.log("transRerender")
})


function createSnowflake(interval = 0) {
    const snowflake = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    snowflake.classList.add("snowflake")
    snowflake.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    snowflake.setAttribute("viewBox", "0 -0.5 13 13");
    snowflake.setAttribute("shape-rendering", "crispEdges");
    snowflake.setAttribute("width", "20");
    snowflake.setAttribute("height", "20");

    // Создаем копию path элемента
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke", "#5b6ee1");
    path.setAttribute("d", "M6 0h1M5 1h3M2 2h1M6 2h1M10 2h1M3 3h2M6 3h1M8 3h2M3 4h1M5 4h3M9 4h1M1 5h1M4 5h1M6 5h1M8 5h1M11 5h1M0 6h6M7 6h6M1 7h1M4 7h1M6 7h1M8 7h1M11 7h1M3 8h1M5 8h3M9 8h1M3 9h2M6 9h1M8 9h2M2 10h1M6 10h1M10 10h1M5 11h3M6 12h1");

    // Добавляем path в SVG
    snowflake.appendChild(path);

    // Задаем случайное положение снежинки по горизонтали
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.position = "absolute"

    // Добавляем SVG в документ
    document.body.appendChild(snowflake);

    return snowflake;
}

function positionRerender(snowflakes, currentFlake, currentFlakeIndex) {
    const yPos = parseFloat(getComputedStyle(currentFlake).top) || 0;
    currentFlake.style.top = (yPos + 1) + 'px';

    if (yPos > window.innerHeight) {
        document.body.removeChild(currentFlake);
        snowflakes.splice(currentFlakeIndex, 1);
    }

}

function transformRerender(snowflakes, currentFlake) {
    const yPos = parseFloat(getComputedStyle(currentFlake).transform.split(',')[5]) || 0;
    const newYPos = yPos + 1;
    if (newYPos > window.innerHeight) {
        document.body.removeChild(currentFlake);
        snowflakes.splice(snowflakes.indexOf(currentFlake), 1);
    } else {
        currentFlake.style.transform = `translateY(${newYPos}px)`;
    }
}

function renderNextFlake(delay = 0) {
    const currentTime = Date.now();
    const timeSinceLastExecution = currentTime - lastSnowflakeCreationTime;

    if (timeSinceLastExecution < delay) { // 2000 миллисекунд = 2 секунды
        return false
    }

    lastSnowflakeCreationTime = currentTime;
    return true
}

function animateSnowflakes(enj) {
    let snowflakes = [];

    function animate() {
        if(renderNextFlake(200) && snowflakes.length<50) {
            const snowflake = createSnowflake();
            snowflakes.push(snowflake);
        }

        snowflakes.forEach((flake, index) => {
            if (enj === 'posit') {
                positionRerender(snowflakes, flake, index);
            } else {
                transformRerender(snowflakes, flake);
            }
        });

        animationId = requestAnimationFrame(animate); // Запоминаем идентификатор анимации
    }

    // Останавливаем предыдущую анимацию, если она есть
    if (animationId) {
        cancelAnimationFrame(animationId);
        const snowflakesCollection = document.querySelectorAll(".snowflake");
        snowflakesCollection.forEach((snowflake)=> {
            snowflake.remove();
        });
        snowflakes = [];
    }

    animate(enj);
}

animateSnowflakes(renderEnj);