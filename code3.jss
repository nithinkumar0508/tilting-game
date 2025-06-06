{ column: 8, row: 2, horizontal: false, length: 1 },
  { column: 8, row: 4, horizontal: false, length: 2 },

  // Vertical lines after the 9th column
  { column: 9, row: 1, horizontal: false, length: 1 },
  { column: 9, row: 5, horizontal: false, length: 2 },
].map((wall) =&gt; ({
  x: wall.column * (pathW + wallW),
  y: wall.row * (pathW + wallW),
  horizontal: wall.horizontal,
  length: wall.length * (pathW + wallW),
}));

// Draw walls
walls.forEach(({ x, y, horizontal, length }) =&gt; {
  const wall = document.createElement("div");
  wall.setAttribute("class", "wall");
  wall.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        width: ${wallW}px;
        height: ${length}px;
        transform: rotate(${horizontal ? -90 : 0}deg);
      `;

  mazeElement.appendChild(wall);
});

const holes = [
  { column: 0, row: 5 },
  { column: 2, row: 0 },
  { column: 2, row: 4 },
  { column: 4, row: 6 },
  { column: 6, row: 2 },
  { column: 6, row: 8 },
  { column: 8, row: 1 },
  { column: 8, row: 2 },
].map((hole) =&gt; ({
  x: hole.column * (wallW + pathW) + (wallW / 2 + pathW / 2),
  y: hole.row * (wallW + pathW) + (wallW / 2 + pathW / 2),
}));

joystickHeadElement.addEventListener("mousedown", function (event) {
  if (!gameInProgress) {
    mouseStartX = event.clientX;
    mouseStartY = event.clientY;
    gameInProgress = true;
    window.requestAnimationFrame(main);
    noteElement.style.opacity = 0;
    joystickHeadElement.style.cssText = `
          animation: none;
          cursor: grabbing;
        `;
  }
});

window.addEventListener("mousemove", function (event) {
  if (gameInProgress) {
    const mouseDeltaX = -Math.minmax(mouseStartX - event.clientX, 15);
    const mouseDeltaY = -Math.minmax(mouseStartY - event.clientY, 15);

    joystickHeadElement.style.cssText = `
          left: ${mouseDeltaX}px;
          top: ${mouseDeltaY}px;
          animation: none;
          cursor: grabbing;
        `;

    const rotationY = mouseDeltaX * 0.8; // Max rotation = 12
    const rotationX = mouseDeltaY * 0.8;

    mazeElement.style.cssText = `
          transform: rotateY(${rotationY}deg) rotateX(${-rotationX}deg)
        `;

    const gravity = 2;
    const friction = 0.01; // Coefficients of friction

    accelerationX = gravity * Math.sin((rotationY / 180) * Math.PI);
    accelerationY = gravity * Math.sin((rotationX / 180) * Math.PI);
    frictionX = gravity * Math.cos((rotationY / 180) * Math.PI) * friction;
    frictionY = gravity * Math.cos((rotationX / 180) * Math.PI) * friction;
  }
});

window.addEventListener("keydown", function (event) {
  // If not an arrow key or space or H was pressed then return
  if (![" ", "H", "h", "E", "e"].includes(event.key)) return;

  // If an arrow key was pressed then first prevent default
  event.preventDefault();

  // If space was pressed restart the game
  if (event.key == " ") {
    resetGame();
    return;
  }

  // Set Hard mode
  if (event.key == "H" || event.key == "h") {
    hardMode = true;
    resetGame();
    return;
  }

  // Set Easy mode
  if (event.key == "E" || event.key == "e") {
    hardMode = false;
    resetGame();
    return;
