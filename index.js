// tick @ 30 but I don't love this :(
// should be a RAF
// https://youtube.com/watch?v=5nSFArCgCXA
// gotta warn you -- I'm not using a linter, here.
// prepare for inconsistency, whitespace hell, and
// occasional missing semicolons.
const {
   PI,
   sin: SIN,
   cos: COS,
   tan: TAN,
   sqrt: SQRT,
   pow: POW,
   abs: ABS,
   floor: FLOOR,
   ceil: CEIL,
   random: RANDOM,
   max: MAX,
   min: MIN,
} = Math;
const STROKE = 'strokeRect';
const FILL = 'fillRect';
const TWOPI = PI * 2;
const HALFPI = PI / 2;
function toRadians(d) { return (d * PI) / 180; }

const map = [
   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
   [1,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
   [1,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
   [1,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
   [1,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1],
   [1,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1],
   [1,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,1],
   [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
   [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
   [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
   [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],
   [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,1,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
   [1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1],
   [1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
   [1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1,1,1,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
   [1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
   [1,0,1,1,1,0,1,1,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,1],
   [1,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1],
   [1,0,1,1,0,1,1,1,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1],
   [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1],
   [1,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1],
   [1,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1],
   [1,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
   [1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1],
   [1,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1],
   [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1],
   [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

// initially I was allowing this to be the same
// size as the window's area but the thing which is
// a bummer about that is that it tended to blow the
// proportions. IIRC, this often caused things to be too
// narrow.  There are ways to force proportions, even
// when you consume the full screen area, but I'm tired
// and disinterested. :|
const CANVW = 750;
const CANVH = 500;
const SCREEN = {
   // used props to avoid having to make the use LOOK
   // like a function call.
   // Used screen not just because it's close to what
   // Maksim used but because I thought at some point
   // I might want to detach the concept of screen from
   // window (which, it turns out, I did) but also because
   // I thought whether it's window or something else that
   // I'd want recomputations to be +/- hands-off,
   // particularly were I to size the canvas with a relative
   // unit (like %) rather than scripting the sizing.
   // I only really left it scripted because that's how
   // Maksim started things and I didn't want to waste
   // time diverging from the tutorial with things like
   // this or making an actual game loop rather than
   // the interval on which this operates. KISS, I guess.
   get WIDTH() {
      return CANVW; // window.innerWidth;
   },
   get HEIGHT() {
      return CANVH; // window.innerHeight;
   },
   get IMGWID() {
      // this helps to give an int value to where each 
      // cast ray lies on the underlying texture.
      // my rays cast at much closer intervals than the
      // mapDimension * CELLSIZE, nextX and nextY in the
      // ray collision calcs frequently multiple rays per
      // integer step unit. I use THIS as a multiplier
      // to keep image width from being stretched too much
      // in rendering. but it's not really image width.
      // My approach here is quick, cheap, and not perfect;
      //  which you can especially see when looking at a
      // wall and strafing left or right.
      // The warping is a combination of my i calculation
      // (with this) on the ray cast, perspective-induced
      // shortening, and also the fish-eye correction to
      // an extent.  That's why the texture's a bit less
      // obnoxious/warped when you look at something that's
      // not SUPER close to you while strafing
      return SCREEN.WIDTH / 50;
   },
};

// I had to use a correction on timing for handling rotation
// vs what Maksim used because what he put in the tutorial
// was LUDICROUSLY fast in practice. So here I'm saying
// "look, how fast to I want to be able to spin around?"
// because my answer wasn't "about 370 times when I move the
// mouse just a small distance."
// I also pitched the mouse move and stuck to arrow-driven
// rotation.
const TICK = 30;
const TICKPERSEC = (1000 / TICK);
const CELLSIZE = 30;
const MINISCALE = (100 / CANVW);
const FOV = toRadians(87); // 60's too small, dude.
// how far on the minimap canvas to draw the fov-if-it-weren't-obstructed white shadow
const FOVDIST = (CELLSIZE * MAX(map.length, map[0].length) * SQRT(2));

// semantic in lowerCamel this is just me being inconsistent.
// I got annoyed with my CAPS on constants a little ways in 
// and things went to hell in a bag. GG me.
const COLORS = {
   minimapFg: 'rgba(51,51,51,0.7)', // #333 ~= Ultima ][ black, #e0e0e0 = smokewhite ~= Ultima ][ white
   fov: 'rgba(255,255,255,0.17)',
   ray: 'rgba(255,255,0,0.18)',
   player: 'red',
   ceiling: '#77f',
   floor: '#163',
   wallv: 'rgba(136, 136, 136, 0.3)',
   wallh: 'rgba(85, 85, 85, 0.3)',
};

// consts for determining shading of walls in the distance
const MINDISTSHADE = 8 * CELLSIZE; // how far to NOT apply shade
const MAXDISTSHADE = '51,51,51'; // R,G,B shade color
const MAXDISTSHADEOPACITY = 0.75;
// ^^ Partly transparent so we can: A. use the same color for
//    all of the shading, and compute the depth as a single
//    number. Also we are more likely to get more consistent
//    appearance this way than computing color, and likely
//    this is more of an even resulting gradient.  IIRC the
//    rgba macro likes int better in RGB values
const SEEMAXDIST = 45 * CELLSIZE; 
// ^^ how far before the shade reaches maximum opacity

const PLAYER = {
   x: CELLSIZE * 2.5,
   y: CELLSIZE * 2.5,
   a: toRadians(0), // player facing angle (in radians)
   // why be clear and use reasonable names when I 
   // can use a single letter like a gosh darn barbarian?
   // I'll chalk this up to "leave me be, I started this
   // while sitting in an airport gate." 
   s: 0, // speed - stepping per tick
   vs: 2, // "velocity" of a walk, except that I use fully
          // on or fully off, instantaneously, so really
          // this is here only to avoid silly magic literals
          // within the code, so I can adjust with much fewer
          // touchpoints and re-use this if it makes sense
          // in other spots (which I did, in strafing)
   radius: CELLSIZE * 0.35, // how big is the player in
          // space? because we're all just circles, aren't we?
          // I'm using this for cheap collision prevention
   drawRadius: CELLSIZE * .6, // the minimap makes you SO
         // tiny if you just use radius, and for a bit I
         // was thinking I might not want to lock it to
         // collision-relative drawing
   r: toRadians(0), // current rotational speed (per tick)
   rps: 0.3, // rotations per second
   get vr() { // RAD / sec (speed to use when rotating, to avoid magic literals/computations later)
      return ((PLAYER.rps * TWOPI) / TICKPERSEC)
   }
};

// add canvas & set-up window
// I'm using TWO canvases:
// 1. main - (in DOM) for the perspective drawing
// 2. minimap - (mem only) copied over top of the main

// minimap canvas allows us to avoid unnecessary scaling
// math when drawing things, to keep the code a little
// more comprehensible. We apply scale only once per tick
// when we treat the minimap as a single image rather than
// individual bits.
// Initially when introducing the wall, I used a
// texture canvas, since I'd been thinking about using it
// to manipulate the image after load; but since I didn't
// end up doing any of that, I've removed that canvas
const c = document.createElement('canvas');
const x = c.getContext('2d');
c.correctSize = () => {
   // I was going to be doing this on window resize when
   // this was still window dimension-driven because while
   // I didn't like diverging from the tutorial on stuff
   // much initially, I also really didn't like having to
   // stick with inital load measures, in case I spaz out
   // and resize my window (or y'know... open the dev console)
   c.setAttribute('height', SCREEN.HEIGHT);
   c.setAttribute('width', SCREEN.WIDTH);
};
c.correctSize();
document.body.appendChild(c);
// minimap canvas
const MINIMAPCANVAS = document.createElement('canvas');
const MINICONTEXT = MINIMAPCANVAS.getContext('2d');
MINIMAPCANVAS.setAttribute('width', CELLSIZE * map[0].length);
MINIMAPCANVAS.setAttribute('height', map.length * CELLSIZE);

const TEXTURES = {};
const whenImageReady = new Promise((resolve, reject) => {
   // were I loading multiple images, this would be
   // a Promise.all rather than just a single promise
   // and probably I'd do some image caching and sprite
   // sheeting for texture maps. I'm aiming more at quick
   // and cheap, though.

   const imageWall = TEXTURES.WALL = new Image();
   imageWall.addEventListener('load', () => {
      resolve(imageWall);
   });
   imageWall.addEventListener('error', (err) => {
      (err);
   });
   imageWall.src = './wall.png';
});

function clearScreen() {
   x.clearRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
}

function renderMinimap(xd, yd, scale = 1 , rays = []) {
   const { a, x: px, y: py, radius, drawRadius } = PLAYER;
   const mx = MINICONTEXT;
   const mcv = MINIMAPCANVAS;
   const hfov = FOV / 2;
   const fovStart = a - hfov;
   const fovEnd = a + hfov;
   const pSz = 2 * radius;
   mx.clearRect(0, 0, mcv.width, mcv.height);

   // draw [unimpeded] fov, grid, rays, player
   // fov
   mx.fillStyle = COLORS.fov;
   mx.beginPath();
   mx.moveTo(px, py);
   mx.arc(px, py, FOVDIST, fovStart, fovEnd);
   mx.fill();
   mx.closePath();

   // grid
   mx.strokeStyle = mx.fillStyle = COLORS.minimapFg;
   map.forEach((row, r) => {
      row.forEach((cell, c) => {
         // I'm pulling double duty here vs Maksim's
         // because at large zooms, my minimap render
         // shows grid lines where he's just skipping
         // a draw.  I intended to do a view-over the
         // minimap at a later point in time where I
         // would be showing only the local-to-player
         // slice of the minimap, maybe circular like
         // you see in WoW and stuff like that. For now
         // since I'm showing the WHOLE map, and at a 
         // tiny scale, these extra draws are just
         // a degradation in efficiency.
         mx[(cell ? FILL : STROKE)](
            (c * CELLSIZE),
            (r * CELLSIZE),
            CELLSIZE, CELLSIZE);
      });
   });

   // rays
   mx.strokeStyle = COLORS.ray;
   rays.forEach(({ angle, distance }) => {
      mx.beginPath();
      mx.moveTo(px, py);
      mx.lineTo(
         (px + COS(angle) * distance),
         (py + SIN(angle) * distance),
      );
      mx.closePath();
      mx.stroke();
   });

   // player
   {
      mx.strokeStyle = mx.fillStyle = COLORS.player;
      mx.beginPath();
      mx.arc(px, py, drawRadius, 0, TWOPI);
      mx.closePath();
      mx.fill();
      mx.stroke();
      mx.beginPath();
      mx.moveTo(px, py);
      mx.lineTo(px + (pSz * COS(a)), py + (pSz * SIN(a)));
      mx.closePath();
      mx.stroke();
   }
   // now draw mx onto x
   x.drawImage(mcv, 0, 0, mcv.width, mcv.height, xd, yd,(mcv.width * scale),(mcv.height * scale));
}

function distance(x0, y0, x1, y1) {
   return SQRT(
      POW(x1 - x0, 2) + 
      POW(y1 - y0, 2)
   );
}

function outOfMapBounds(x, y) {
   return x < 0 || y < 0 ||
         x >= map[0].length ||
         y >= map.length;
}

// both v and h collisions start by determining
// are we UP/RIGHT and using that info to determining a
// starting point for gridline collisions on the ray
// in front of the player, and generating the grid line
// step to be both precise about collision location
// and also do the fewest possible checks since we know
// that all cells sit at fixed intervals (otherwise
// we're using line intersection equations or something)
function getVCollision(angle) {
   const right = ABS(FLOOR((angle - HALFPI) / PI) % 2);

   let firstX = right ?
      FLOOR(PLAYER.x / CELLSIZE) * CELLSIZE + CELLSIZE :
      FLOOR(PLAYER.x / CELLSIZE) * CELLSIZE;
   const firstY = PLAYER.y + (firstX - PLAYER.x) * TAN(angle);

   const xA = right ? CELLSIZE : -CELLSIZE;
   const yA = xA * TAN(angle);

   let wall;
   let nextX = firstX;
   let nextY = firstY;
   while (!wall) {
      const cellX = right ?
         FLOOR(nextX / CELLSIZE) :
         FLOOR(nextX / CELLSIZE) - 1;
      const cellY = FLOOR(nextY / CELLSIZE);

      if (outOfMapBounds(cellX, cellY)) {
         break;
      }

      wall = map[cellY][cellX];
      if (!wall) {
         nextX += xA;
         nextY += yA;
      }
   }
   return {
      i: FLOOR(nextY * SCREEN.IMGWID),
      angle, vertical: true,
      distance: distance(PLAYER.x, PLAYER.y, nextX, nextY), 
   };
}

function getHCollision(angle) {
   const up = ABS(FLOOR(angle / PI) % 2);
   const firstY = up ? 
      FLOOR(PLAYER.y / CELLSIZE) * CELLSIZE :
      FLOOR(PLAYER.y / CELLSIZE) * CELLSIZE + CELLSIZE;
   const firstX = PLAYER.x + (firstY - PLAYER.y) / TAN(angle);

   const yA = up ? -CELLSIZE : CELLSIZE;
   const xA = yA / TAN(angle);

   let wall;
   let nextX = firstX;
   let nextY = firstY;
   while (!wall) {
      const cellX = FLOOR(nextX / CELLSIZE);
      const cellY = up ?
         FLOOR(nextY / CELLSIZE) - 1 :
         FLOOR(nextY / CELLSIZE);

      if (outOfMapBounds(cellX, cellY)) {
         break;
      }

      wall = map[cellY][cellX];
      if (!wall) {
         nextX += xA;
         nextY += yA;
      }
   }
   return {
      i: FLOOR(nextX * SCREEN.IMGWID),
      angle, vertical: false,
      distance: distance(PLAYER.x, PLAYER.y, nextX, nextY),
   };
}

// shortest distance to intersection
function castRay(angle) { 
   const clV = getVCollision(angle);
   const clH = getHCollision(angle);
   return clH.distance >= clV.distance ? clV : clH;
}

// cast. all. the. rays.
function getRays() {
   // whole FOV starting left of center by 1/2 FOV
   const a0 = PLAYER.a - FOV/2;
   const nRays = SCREEN.WIDTH;
   const dA = FOV / nRays;
   return Array.from({ length: nRays }, (v, i) => {
      const a = a0 + i * dA;
      return castRay(a);
   });
}

// player update() if we were a little more OOP-y
// esp if we used RAF instead of interval
function movePlayer() {
   const { s, vs, r, radius: rad, a, running, strafeLeft, strafeRight } = PLAYER;
   // walk/run
   if (s) {
      const es = (s > 0 && running) ? 3*s : s; 
      const { distance } = castRay((es < 0 ? Math.PI : 0) + a);
      if (distance > rad) {
         let factor = 1;
         if (distance <= (rad + Math.abs(es))) {
            factor = (distance / (rad + Math.abs(es)));
         }
         PLAYER.x += (factor * es * COS(a));
         PLAYER.y += (factor * es * SIN(a));
      }
   }
   // strafe
   if (strafeRight || strafeLeft) {
      const strafeDir = strafeLeft ? a - HALFPI : a + HALFPI;
      const { distance } = castRay(strafeDir);
      if (distance > rad) {
         let factor = 1;
         if (distance <= (rad + Math.abs(vs))) {
            factor = (distance / (rad + Math.abs(vs)));
         }
         PLAYER.x += (factor * vs * COS(strafeDir));
         PLAYER.y += (factor * vs * SIN(strafeDir));
      }
   }
   // apply rotation
   if (r) {
      PLAYER.a += PLAYER.r;
   }
}

// becase we draw circular pov on a square plane
function fixFishEye(d, ra, pa) {
   const factor = 1;
   const diff = (ra - pa) * factor;
   return d * Math.cos(diff);
}

function renderScene(rays) {
   // perspective drawing where everything's taller
   // than eye-level. currently the ground and sky never
   // change so why draw them more than once per tick
   // really, even that could be reduced to once per load
   // if we used a background element behind the canvas
   // but we're not gonna do that! So:
   // first sky - whole thing
   // then ground - bottom half
   // then walls (ray cast)
   // this is an optimization vs Maksim's in that I'm
   // drawing the sky and ground once each rather than in
   // a pixel-wide slice each for every ray. This is
   // cutting the canvas context drawcount in scene down
   // in our case by 1500 fillRect.  I negated any savings
   // here when I put the wall shading in for distance and
   // also the vertical/horizontal shade differentiation
   x.fillStyle = COLORS.ceiling;
   x.fillRect(0, 0, SCREEN.WIDTH, SCREEN.HEIGHT);
   x.fillStyle = COLORS.floor;
   x.fillRect(0, (SCREEN.HEIGHT / 2), SCREEN.WIDTH, (0.55 * SCREEN.HEIGHT));
   // now the walls
   rays.forEach(({angle, vertical, distance: raydist, i: ix}, i) => {
      const distance = fixFishEye(raydist, angle, PLAYER.a);

      const wallHeight = ((CELLSIZE * 5) / distance) * 150;
      // ^ This height computation's a little arbitrary-feeling
      // and I've geared it around to get a result where a
      // 1x1 pillar is NEARLY twice as tall as wide.
      // Were I going for better granularity, cell size would
      // be smaller, map data larger, and this computation would
      // create narrower, taller cells.
      const eix = ix % TEXTURES.WALL.width; // effective image x index
      x.drawImage(TEXTURES.WALL, eix, 0, 1, 500, i, SCREEN.HEIGHT / 2 - wallHeight / 2, 1, wallHeight);
      // +1 on shade lengths is to avoid the bright tearing
      // which otherwide happens at great distances. CEIL works
      // too to an extent, but did had the generally stranger effect
      // where you'd get a kind of "running" white dot tears instead
      // more substantial lines.
      if (!vertical) { // differentiate wall sides for better clarity of scene
         x.fillStyle = COLORS[vertical ? 'wallv' : 'wallh'];
         x.fillRect(i, SCREEN.HEIGHT / 2 - wallHeight / 2, 1, wallHeight+1);
      }
      if (distance > MINDISTSHADE) { // shade distances
         x.fillStyle = `rgba(${MAXDISTSHADE},${ Math.max(0, Math.min(MAXDISTSHADEOPACITY, ((distance - MINDISTSHADE)/(SEEMAXDIST)))) })`;
         x.fillRect(i, SCREEN.HEIGHT / 2 - wallHeight / 2, 1, wallHeight+1);
      }
   });
};


// input handling, here we go!
///not currently necessary
// window.addEventListener('resize', () => {
//    c.correctSize();
// });

///this was irritating, no thanks
// c.addEventListener('mousemove', (e) => {
//    _.PLAYER.a += _.dtr(e.movementX * _.PLAYER.vr);
// });

document.addEventListener('keydown', (e) => {
   let prevent = true;
   switch(e.key) {
      case 'Q':
      case 'q':
         PLAYER.strafeLeft = 1;
         break;
      case 'W':
      case 'w':
         PLAYER.strafeRight = 1;
         break;
      case 'Shift':
         PLAYER.running = 1;
         break;
      case 'ArrowUp': // forward
         PLAYER.s = PLAYER.vs;
         break;
      case 'ArrowDown': // backward
         PLAYER.s = -PLAYER.vs;
         break;
      case 'ArrowLeft': // rotate left
         PLAYER.r = -PLAYER.vr;
         break;
      case 'ArrowRight': // rotate right
         PLAYER.r = PLAYER.vr;
         break;
      case 'Space': break;
      default:
         prevent = false;
         break;
   };
   if (prevent) {
      e.stopPropagation();
      e.preventDefault();
   }
   return !prevent;
});

document.addEventListener('keyup', (e) => {
   let prevent = true;
   switch (e.key) {
      case 'Q':
      case 'q':
      case 'W':
      case 'w':
         PLAYER.strafeLeft = PLAYER.strafeRight = 0;
         break;
      case 'Shift':
         PLAYER.running = 0;
         break;
      case 'ArrowUp':
      case 'ArrowDown':
         PLAYER.s = 0;
         break;
      case 'ArrowLeft':
      case 'ArrowRight':
         PLAYER.r = 0;
         break;
      case 'Space': break;
      case 'Escape':
      case 'Esc':
         halt();
         break;
      default:
         prevent = false;
         break;
   };
   if (prevent) {
      e.stopPropagation();
      e.preventDefault();
   }
   return !prevent;
});

// program flow gogogo!
let interval;
function gameLoop() {
   clearScreen();
   movePlayer();
   const rays = getRays();
   renderScene(rays);
   renderMinimap(0, 0, MINISCALE, rays);
}
function halt() {
   clearInterval(interval);
   console.log('Loop stopped.');
}

// do it, hansel
whenImageReady.then(() => {
   interval = setInterval(gameLoop, TICK);
});

// eof
