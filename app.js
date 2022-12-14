// npx parcel index.html

import * as PIXI from "pixi.js";
import noise from "./noise.jpg";
import img from "./img.jpg";
import img1 from "./img/prato1.jpeg";
import img2 from "./img/prato2.jpeg";
import img3 from "./img/prato3.jpeg";
import img4 from "./img/prato4.jpeg";
import img5 from "./img/prato5.jpeg";
import img6 from "./img/prato6.jpeg";
import img7 from "./img/prato7.jpeg";
import img8 from "./img/prato8.jpeg";
import img9 from "./img/prato9.jpeg";
import img10 from "./img/prato10.jpeg";
import img11 from "./img/prato11.jpeg";
import img12 from "./img/prato12.jpeg";
import img13 from "./img/prato13.jpeg";
import img14 from "./img/prato14.jpeg";
import img15 from "./img/prato15.jpeg";
import img16 from "./img/prato16.jpeg";
import img17 from "./img/prato17.jpeg";
import img18 from "./img/prato18.jpeg";
import img19 from "./img/prato19.jpeg";
import img20 from "./img/prato20.jpeg";
import img21 from "./img/prato21.jpeg";
import img22 from "./img/prato22.jpeg";
import img23 from "./img/prato23.jpeg";
import img24 from "./img/prato24.jpeg";
import img25 from "./img/prato25.jpeg";
import img26 from "./img/prato26.jpeg";
import img27 from "./img/prato27.jpeg";
import img28 from "./img/prato28.jpeg";
import img29 from "./img/prato29.jpeg";
import img30 from "./img/prato30.jpeg";
import img31 from "./img/prato31.jpeg";
import img32 from "./img/prato32.jpeg";
import img33 from "./img/prato33.jpeg";
import img34 from "./img/prato34.jpeg";
import img35 from "./img/prato35.jpeg";
import img36 from "./img/prato36.jpeg";
import img37 from "./img/prato37.jpeg";
import img38 from "./img/prato38.jpeg";
import img39 from "./img/prato39.jpeg";
import img40 from "./img/prato40.jpeg";
import img41 from "./img/prato41.jpeg";
import img42 from "./img/prato42.jpeg";
import img43 from "./img/prato43.jpeg";
import img44 from "./img/prato44.jpeg";
import img45 from "./img/prato45.jpeg";
import img46 from "./img/prato46.jpeg";
import img47 from "./img/prato47.jpeg";
import img48 from "./img/prato48.jpeg";
import img49 from "./img/prato49.jpeg";
import img50 from "./img/prato50.jpeg";
import img51 from "./img/prato51.jpeg";
import img52 from "./img/prato52.jpeg";
import img53 from "./img/prato53.jpeg";
import img54 from "./img/prato54.jpeg";
import img55 from "./img/prato55.jpeg";
import img56 from "./img/prato56.jpeg";
import img57 from "./img/prato57.jpeg";
import img58 from "./img/prato58.jpeg";
import img59 from "./img/prato59.jpeg";
import img60 from "./img/prato60.jpeg";
import img61 from "./img/prato61.jpeg";
import img62 from "./img/prato62.jpeg";
import img63 from "./img/prato63.jpeg";
import img64 from "./img/prato64.jpeg";
import img65 from "./img/prato65.jpeg";
import img66 from "./img/prato66.jpeg";
import img67 from "./img/prato67.jpeg";
import img68 from "./img/prato68.jpeg";
import img69 from "./img/prato69.jpeg";
import img70 from "./img/prato70.jpeg";
import img71 from "./img/prato71.jpeg";
import img72 from "./img/prato72.jpeg";
import img73 from "./img/prato73.jpeg";
import img74 from "./img/prato74.jpeg";
import img75 from "./img/prato75.jpeg";
import img76 from "./img/prato76.jpeg";
import img77 from "./img/prato77.jpeg";
import img78 from "./img/prato78.jpeg";
import img79 from "./img/prato79.jpeg";
import img80 from "./img/prato80.jpeg";
import img81 from "./img/prato81.jpeg";
import img82 from "./img/prato82.jpeg";

import displace from "./displace.png";
import fragment from "./fragment.glsl";
import vertex from "./vertex.glsl";
import { POSITION_1 } from "./constants";

// fill in kinectron ip address here ie. "127.16.231.33"
let kinectronIpAddress = "192.168.206.223";

// declare kinectron
let kinectron = null;
kinectron = new Kinectron(kinectronIpAddress);

// delclare skeleton joints
let rightHandX = 0;
let rightHandY = 0;
let leftHandX = 0;
let leftHandY = 0;
let ankleRightFootX = 0;
let ankleRightFootY = 0;
let ankleRightFootZ = 0;
let ankleLeftFootX = 0;
let ankleLeftFootY = 0;
let ankleLeftFootZ = 0;

let kneeLeftX = 0;
let kneeRightX = 0;

let headY = 0;

// declare skeleton joints state
// leftHandTrackingState = 2 is active, leftHandTrackingState = 1 is inactive;
let leftHandTrackingState = 0;
let ankleLeftFootTrackingState = 0;
let ankleRightFootTrackingState = 0;
class Sketch {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.app = new PIXI.Application({
      //   backgroundColor: 0x000000,
      backgroundColor: 0xffc0cb,
      // resolution: window.devicePixelRatio || 1,
      resolution: 1,
      resizeTo: window,
    });

    this.scrollTarget = 0;
    this.scroll = 0;
    this.currentScroll = 0;

    document.body.appendChild(this.app.view);
    this.app.view.style.width = this.width + "px";
    this.app.view.style.height = this.height + "px";

    this.container = new PIXI.Container();
    this.container.rotation = -0.1;

    this.app.stage.addChild(this.container);

    this.add(); // graphics
    this.resize();
    this.setupResize();
    this.render();
    // this.scrollEvent();

    this.kinectronConnected();
  }

  // scroll speed
  scrollEvent() {
    document.addEventListener("mousewheel", (e) => {
      // console.log("wheelDelta", e.wheelDelta);
      // wheelDelta is the mousewheel scroll speed, start with 120 or -120 and go up to 600 or -600 according to speed. Could be negative or positve depending on direction
      // this.scrollTarget looks like a sweet spot formula for the scroll speed
      this.scrollTarget = e.wheelDelta / 3;
    });
  }

  kinectronConnected() {
    kinectron = new Kinectron(kinectronIpAddress);
    // connect with application over peer
    kinectron.makeConnection();
    kinectron.setKinectType("windows");
    console.log("kinectron", kinectron);

    // kinectron.getHands(myDrawHandsFunction);
    // function myDrawHandsFunction(hands) {
    //   console.log("hands", hands);
    // }

    kinectron.startTrackedBodies(bodyTracked);
    function bodyTracked(body) {
      rightHandY = body.joints[kinectron.HANDRIGHT].cameraY * 23000;
      rightHandX = body.joints[kinectron.HANDRIGHT].cameraX * 23000;
      leftHandX = body.joints[kinectron.HANDLEFT].cameraX * 23000;
      leftHandY = body.joints[kinectron.HANDLEFT].cameraY * 23000;
      // console.log({ handRight });
      // console.log("eje X", handRight.cameraX * 1000);
      // console.log("eje Y", handRight.cameraY * 1000);
      // console.log("eje Z", handRight.cameraZ * 1000);
      // console.log({ handLeft });
      // console.log("eje X", handLeft.cameraX * 1000);
      // console.log("eje Y", handLeft.cameraY * 1000);
      // console.log("eje Z", handLeft.cameraZ * 1000);
      // rightHandX = handLeft.cameraX * 23000;
      // leftHandTrackingState = handLeft.trackingState;
      // this.scrollTarget = 240 / 3;
      ankleRightFootX = body.joints[kinectron.ANKLERIGHT].cameraX * 23000;
      ankleLeftFootX = body.joints[kinectron.ANKLELEFT].cameraX * 23000;
      kneeLeftX = body.joints[kinectron.KNEELEFT].cameraX * 23000;
      kneeRightX = body.joints[kinectron.KNEERIGHT].cameraX * 23000;
      headY = body.joints[kinectron.HEAD].cameraY * 23000;
      // console.log(ankleRightFootX, "right foot");
      // console.log(ankleLeftFootX, "left foot");
      // console.log(headY, "head");
      // console.log(rightHandX, "right hand");
      // console.log(leftHandX, "left hand");
      console.log("kneeLeftX", kneeLeftX);
      console.log("kneeRightX", kneeRightX);
      console.log("headY", headY);
      console.log("rightHandY", rightHandY);
      // console.log("ankleRightFootX", ankleRightFootX);
      // console.log("ankleLeftFootX", ankleLeftFootX);

      //conditions to move forward or backward
    }
  }

  add() {
    let images = [
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8,
      img9,
      img10,
      img11,
      img12,
      img13,
      img14,
      img15,
      img16,
      img17,
      img18,
      img19,
      img20,
      img21,
      img22,
      img23,
      img24,
      img25,
      img26,
      img27,
      img28,
      img29,
      img30,
      img31,
      img32,
      img33,
      img34,
      img35,
      img36,
      img37,
      img38,
      img39,
      img40,
      img41,
      img42,
      img43,
      img44,
      img45,
      img46,
      img47,
      img48,
      img49,
      img50,
      img51,
      img52,
      img53,
      img54,
      img55,
      img56,
      img57,
      img58,
      img59,
      img60,
      img61,
      img62,
      img63,
      img64,
      img65,
      img66,
      img67,
      img68,
      img69,
      img70,
      img71,
      img72,
      img73,
      img74,
      img75,
      img76,
      img77,
      img78,
      img79,
      img80,
      img81,
      img82,
    ];

    this.slides = images.map((image) => new PIXI.Sprite.from(image));

    this.objs = [];

    this.margin = 1500;

    this.wholeHeight = this.margin * this.slides.length;

    this.slides.forEach((slide, i) => {
      let c = new PIXI.Container();
      let aspect = 1;
      // let block = new PIXI.Sprite(PIXI.Texture.WHITE);
      // block.tint = 0xff0000;
      // block.width = 100;
      // block.height = 100;
      // let image = slide.image;

      //center images in the screen
      c.pivot.x = -this.width / 2;
      // c.pivot.y = -this.height / 2 - i * this.margin;

      // this.container.addChild(block)
      // console.log(slide);
      let image = slide;
      //   image.width = 1000;
      //   image.height = image.width / aspect;
      image.anchor.set(0.5);
      c.addChild(image);

      let uniforms = {
        uPower: 0,
        uDir: 1,
        udisplacement: new PIXI.Sprite.from(displace).texture,
        umap: image.texture,
        filterMatrix: new PIXI.Matrix(),
      };
      // console.log(vertex, fragment);
      let displacementFilter = new PIXI.Filter(vertex, fragment, uniforms);

      displacementFilter.apply = function (filtermanager, input, output, e) {
        this.uniforms.filterMatrix = filtermanager.calculateSpriteMatrix(
          uniforms.filterMatrix,
          image
        );
        filtermanager.applyFilter(this, input, output, e);
      };

      image.filters = [displacementFilter];

      let mask = new PIXI.Graphics();

      // mask.moveTo(mx,my)
      // mask.lineTo(mx,-my)
      // mask.quadraticCurveTo(mx - 400, -my-100 ,-mx,-my)
      // mask.lineTo(-mx,my)
      // mask.endFill()

      c.addChild(mask);

      c.mask = mask;

      this.container.addChild(c);

      this.objs.push({
        mask: mask,
        container: c,
        image: image,
        uniforms: uniforms,
        position: i,
      });
    });
  }

  updateAllTheThings() {
    this.objs.forEach((slide) => {
      slide.mask.clear();
      slide.mask.beginFill(0xff0000);

      //mask filter applied to image size
      let mx = 1300;
      let my = 1300;

      let DISTORTION = this.scroll * 4;
      let koef = 0.2;

      slide.uniforms.uDir = Math.sign(DISTORTION);
      slide.uniforms.uPower = Math.abs(DISTORTION * 0.01);

      let p = [
        {
          x: mx,
          y: -my,
        },
        {
          x: -mx,
          y: -my,
        },
        {
          x: -mx,
          y: my,
        },
        {
          x: mx,
          y: my,
        },
      ];

      if (DISTORTION < 0) {
        p[2].x += Math.abs(DISTORTION) * 0.4;
        p[2].y -= Math.abs(DISTORTION) * 0.4;

        p[3].x -= Math.abs(DISTORTION) * 0.4;
        p[3].y -= Math.abs(DISTORTION) * 0.4;
      } else {
        p[0].x -= Math.abs(DISTORTION) * 0.4;
        p[0].y += Math.abs(DISTORTION) * 0.4;

        p[1].x += Math.abs(DISTORTION) * 0.4;
        p[1].y += Math.abs(DISTORTION) * 0.4;
      }

      let C = [
        {
          x: 0.5 * p[0].x + 0.5 * p[1].x,
          y: 0.5 * p[0].y + 0.5 * p[1].y + DISTORTION,
        },
        {
          x: 0.5 * p[1].x + 0.5 * p[2].x + Math.abs(DISTORTION * koef),
          y: 0.5 * p[1].y + 0.5 * p[2].y,
        },
        {
          x: 0.5 * p[2].x + 0.5 * p[3].x,
          y: 0.5 * p[2].y + 0.5 * p[3].y + DISTORTION,
        },
        {
          x: 0.5 * p[3].x + 0.5 * p[0].x - Math.abs(DISTORTION * koef),
          y: 0.5 * p[3].y + 0.5 * p[0].y,
        },
      ];

      slide.mask.moveTo(p[0].x, p[0].y);
      slide.mask.quadraticCurveTo(C[0].x, C[0].y, p[1].x, p[1].y);
      slide.mask.quadraticCurveTo(C[1].x, C[1].y, p[2].x, p[2].y);
      slide.mask.quadraticCurveTo(C[2].x, C[2].y, p[3].x, p[3].y);
      slide.mask.quadraticCurveTo(C[3].x, C[3].y, p[0].x, p[0].y);

      // https://youtu.be/L9atn_cWt_g?t=4181
      // position of the screen
      slide.container.position.y =
        ((slide.position * this.margin +
          this.currentScroll +
          500 * this.wholeHeight) %
          this.wholeHeight) -
        this.margin;
    });
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.app.view.style.width = this.width + "px";
    this.app.view.style.height = this.height + "px";
  }

  render() {
    this.app.ticker.add((delta) => {
      // this.scrollTarget simulates the mouse scroll
      //position 2
      // if (rightHandX > 2000 && leftHandTrackingState === 2) {
      //   this.scrollTarget = 160 / 3;
      // } else if (rightHandX < -2000 && leftHandTrackingState === 2) {
      //   this.scrollTarget = -160 / 3;
      // } else {
      //   this.scrollTarget = 0;
      // }

      // position 1: sit and with knee position
      // if (
      //   ankleRightFootX > 1200 &&
      //   ankleRightFootX < 3400 &&
      //   ankleLeftFootX > -800 &&
      //   ankleLeftFootX < -6000
      //   // ankleRightFootTrackingState === 2 &&
      //   // ankleLeftFootTrackingState === 2
      // ) {
      //   // this.scrollTarget = 0;
      //   this.scrollTarget = 160 / 3;
      // }
      if (
        kneeRightX > 3000 &&
        kneeRightX < 9500 &&
        kneeLeftX < -4500 &&
        kneeLeftX > -11000 &&
        headY < -1000 &&
        rightHandY < -3600
        // ankleRightFootTrackingState === 2 &&
        // ankleLeftFootTrackingState === 2
      ) {
        // this.scrollTarget = 0;
        this.scrollTarget = 160 / 3;
        console.log("positive");
      } else if (
        kneeRightX < 3000 &&
        kneeLeftX > -4500 &&
        headY < -1000 &&
        rightHandY > -3600
      ) {
        this.scrollTarget = -160 / 3;
        console.log("negative");
      }
      // position 2: parado con manos a los costados, pies juntos, al medio para, a los costados avanza
      // hacia la derecha
      if (
        ankleLeftFootX > 8000 &&
        ankleLeftFootX < 16000 &&
        ankleRightFootX > 18500 &&
        ankleRightFootX < 24000 &&
        headY > 4000 &&
        rightHandX > 20000 &&
        rightHandX < 35000 &&
        leftHandX > 17000 &&
        leftHandX < 28000
      ) {
        this.scrollTarget = 160 / 3;
        // hacia la izquierda
      } else if (
        ankleLeftFootX > 8000 &&
        ankleLeftFootX < 16000 &&
        ankleRightFootX > 18500 &&
        ankleRightFootX < 24000 &&
        headY > 4000 &&
        rightHandX < 14000 &&
        rightHandX > 3000 &&
        leftHandX > -1500 &&
        leftHandX < 9000
      ) {
        this.scrollTarget = -160 / 3;
      }

      // } else if (
      //   ankleRightFootX === rightSide &&
      //   ankleLeftFootX === leftSide &&
      //   ankleRightFootTrackingState === 2 &&
      //   ankleLeftFootState === 2
      // ) {
      //   this.scrollTarget = 160 / 3;
      // }
      //  else {
      //   this.scrollTarget = 0;
      // }

      this.scroll -= (this.scroll - this.scrollTarget) * 0.1;
      this.scroll *= 0.9;
      this.scrollTarget *= 0.9;
      //direction of the scroll, could be -1 or 1
      this.direction = Math.sign(this.scroll);

      this.currentScroll += this.scroll;

      //current scroll never gets less, always increases
      // console.log(this.currentScroll, "scroll");
      this.updateAllTheThings();

      // rotate the container!
      // use delta to create frame-independent transform
      // container.rotation -= 0.01 * delta;
      // console.log(delta);
    });
  }
}

new Sketch();
