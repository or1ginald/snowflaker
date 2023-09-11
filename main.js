function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.style.left = Math.random() * 100 + 'vw';
    document.body.appendChild(snowflake);

    setTimeout(() => {
        document.body.removeChild(snowflake);
    }, 5000); // Удалить снежинку через 5 секунд

    return snowflake;
}

function animateSnowflakes() {
    const snowflakes = [];

    function animate() {
        const snowflake = createSnowflake();
        snowflakes.push(snowflake);

        snowflakes.forEach((flake, index) => {
            const yPos = parseFloat(getComputedStyle(flake).top) || 0;
            flake.style.top = (yPos + 1) + 'px';

            if (yPos > window.innerHeight) {
                document.body.removeChild(flake);
                snowflakes.splice(index, 1);
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
}

animateSnowflakes();
