let renderEnj = "posit"
let animationId;
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


function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.style.left = Math.random() * 100 + 'vw';
    document.body.appendChild(snowflake);

    // setTimeout(() => {
    //     document.body.removeChild(snowflake);
    // }, 5000); // Удалить снежинку через 5 секунд

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


function animateSnowflakes(enj) {
    let snowflakes = [];

    function animate() {
        const snowflake = createSnowflake();
        snowflakes.push(snowflake);

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
        snowflakesCollection.forEach(function(snowflake) {
            snowflake.remove();
        });
        snowflakes = [];
    }

    animate(enj);
}

animateSnowflakes(renderEnj);