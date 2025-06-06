const maxVelocity = 1.5;

  // Time passed since last cycle divided by 16
  // This function gets called every 16 ms on average so dividing by 16 will result in 1
  const timeElapsed = (timestamp - previousTimestamp) / 16;

  try {
    // If mouse didn't move yet don't do anything
    if (accelerationX != undefined &amp;&amp; accelerationY != undefined) {
      const velocityChangeX = accelerationX * timeElapsed;
      const velocityChangeY = accelerationY * timeElapsed;
      const frictionDeltaX = frictionX * timeElapsed;
      const frictionDeltaY = frictionY * timeElapsed;

      balls.forEach((ball) =&gt; {
        if (velocityChangeX == 0) {
          // No rotation, the plane is flat
          // On flat surface friction can only slow down, but not reverse movement
          ball.velocityX = slow(ball.velocityX, frictionDeltaX);
        } else {
          ball.velocityX = ball.velocityX + velocityChangeX;
          ball.velocityX = Math.max(Math.min(ball.velocityX, 1.5), -1.5);
          ball.velocityX =
            ball.velocityX - Math.sign(velocityChangeX) * frictionDeltaX;
          ball.velocityX = Math.minmax(ball.velocityX, maxVelocity);
        }

        if (velocityChangeY == 0) {
          // No rotation, the plane is flat
          // On flat surface friction can only slow down, but not reverse movement
          ball.velocityY = slow(ball.velocityY, frictionDeltaY);
        } else {
          ball.velocityY = ball.velocityY + velocityChangeY;
          ball.velocityY =
            ball.velocityY - Math.sign(velocityChangeY) * frictionDeltaY;
          ball.velocityY = Math.minmax(ball.velocityY, maxVelocity);
        }

        // Preliminary next ball position, only becomes true if no hit occurs
        // Used only for hit testing, does not mean that the ball will reach this position
        ball.nextX = ball.x + ball.velocityX;
        ball.nextY = ball.y + ball.velocityY;

        if (debugMode) console.log("tick", ball);

        walls.forEach((wall, wi) =&gt; {
          if (wall.horizontal) {
            // Horizontal wall

            if (
              ball.nextY + ballSize / 2 &gt;= wall.y - wallW / 2 &amp;&amp;
              ball.nextY - ballSize / 2 = wallStart.x - wallW / 2 &amp;&amp;
                ball.nextX &lt; wallStart.x
              ) {
                // Ball might hit the left cap of a horizontal wall
                const distance = distance2D(wallStart, {
                  x: ball.nextX,
                  y: ball.nextY,
                });
                if (distance  4)
                    console.warn("too close h head", distance, ball);

                  // Ball hits the left cap of a horizontal wall
                  const closest = closestItCanBe(wallStart, {
                    x: ball.nextX,
                    y: ball.nextY,
                  });
                  const rolled = rollAroundCap(wallStart, {
                    x: closest.x,
                    y: closest.y,
                    velocityX: ball.velocityX,
                    velocityY: ball.velocityY,
                  });

                  Object.assign(ball, rolled);
                }
              }

              if (
                ball.nextX - ballSize / 2  wallEnd.x
              ) {
                // Ball might hit the right cap of a horizontal wall
                const distance = distance2D(wallEnd, {
                  x: ball.nextX,
                  y: ball.nextY,
                });
                if (distance  4)
                    console.warn("too close h tail", distance, ball);

                  // Ball hits the right cap of a horizontal wall
                  const closest = closestItCanBe(wallEnd, {
                    x: ball.nextX,
                    y: ball.nextY,
                  });
                  const rolled = rollAroundCap(wallEnd, {
                    x: closest.x,
                    y: closest.y,
                    velocityX: ball.velocityX,
                    velocityY: ball.velocityY,
                  });

                  Object.assign(ball, rolled);
                }
              }

              if (ball.nextX &gt;= wallStart.x &amp;&amp; ball.nextX &lt;= wallEnd.x) {
                // The ball got inside the main body of the wall
                if (ball.nextY  4)
                  console.error("crossing h line, HIT", ball);
              }
            }
          } else {
            // Vertical wall

            if (
              ball.nextX + ballSize / 2 &gt;= wall.x - wallW / 2 &amp;&amp;
              ball.nextX - ballSize / 2 = wallStart.y - wallW / 2 &amp;&amp;
                ball.nextY &lt; wallStart.y
              ) {
                // Ball might hit the top cap of a horizontal wall
                const distance = distance2D(wallStart, {
                  x: ball.nextX,
                  y: ball.nextY,
                });
                if (distance  4)
                    console.warn("too close v head", distance, ball);

                  // Ball hits the left cap of a horizontal wall
                  const closest = closestItCanBe(wallStart, {
                    x: ball.nextX,
                    y: ball.nextY,
                  });
                  const rolled = rollAroundCap(wallStart, {
                    x: closest.x,
                    y: closest.y,
                    velocityX: ball.velocityX,
                    velocityY: ball.velocityY,
                  });

                  Object.assign(ball, rolled);
                }
              }

              if (
                ball.nextY - ballSize / 2  wallEnd.y
              ) {
                // Ball might hit the bottom cap of a horizontal wall
                const distance = distance2D(wallEnd, {
                  x: ball.nextX,
                  y: ball.nextY,
                });
                if (distance  4)
                    console.warn("too close v tail", distance, ball);

                  // Ball hits the right cap of a horizontal wall
                  const closest = closestItCanBe(wallEnd, {
                    x: ball.nextX,
                    y: ball.nextY,
                  });
                  const rolled = rollAroundCap(wallEnd, {
                    x: closest.x,
                    y: closest.y,
                    velocityX: ball.velocityX,
                    velocityY: ball.velocityY,
                  });

                  Object.assign(ball, rolled);
                }
              }

              if (ball.nextY &gt;= wallStart.y &amp;&amp; ball.nextY &lt;= wallEnd.y) {
                // The ball got inside the main body of the wall
                if (ball.nextX  4)
                  console.error("crossing v line, HIT", ball);
              }
            }
          }
        });

        // Detect is a ball fell into a hole
        if (hardMode) {
          holes.forEach((hole, hi) =&gt; {
            const distance = distance2D(hole, {
              x: ball.nextX,
              y: ball.nextY,
            });

            if (distance  {
        ballElements[index].style.cssText = `left: ${x}px; top: ${y}px; `;
      });
    }

    // Win detection
    if (
      balls.every(
        (ball) =&gt; distance2D(ball, { x: 350 / 2, y: 315 / 2 }) &lt; 65 / 2
      )
    ) {
      noteElement.innerHTML = `Congrats, you did it!
          ${!hardMode ? &quot;<p>Press H for hard mode</p>" : ""}
          <p>
            Follow me
            <a href="https://twitter.com/HunorBorbely" target="_blank" rel="nofollow noopener">@HunorBorbely</a>
          </p>`;
      noteElement.style.opacity = 1;
      gameInProgress = false;
    } else {
      previousTimestamp = timestamp;
      window.requestAnimationFrame(main);
    }
  } catch (error) {
    if (error.message == "The ball fell into a hole") {
      noteElement.innerHTML = `A ball fell into a black hole! Press space to reset the game.
          <p>
           Back to easy? Press E
          </p>`;
      noteElement.style.opacity = 1;
      gameInProgress = false;
    } else throw error;
  }
}
