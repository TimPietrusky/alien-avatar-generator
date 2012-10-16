// Canvas
var px = 30,
    px_s = 15;
  
// Generate
var generate = $('button[role="generate"]');
generate.click(function(e) {
  Canvas.newAvatar();
});

Canvas = {
  el : {
    dom : $('#random_avatar').get(0),
    jq : null,
    img : null
  },
  ctx : null,
  size : {
    width : 300,
    height: 300
  },
  
  init : function() {
    this.el.jq = $(this.el.dom);
    this.el.img = $('img[role="result"]');
    
    if (this.el.dom.getContext) {
      this.ctx = this.el.dom.getContext('2d');
      
      this.el.jq.attr('width', this.size.width);
      this.el.jq.attr('height', this.size.height);

      this.el.img.css('width', this.size.width);
      this.el.img.css('height', this.size.height);

      this.newAvatar();
    } else {
      // Not supported
    }
  }, 

  newAvatar : function() {
    // Background gradient
    var cxlg = this.ctx.createLinearGradient(0, 0, 300, 300);
    cxlg.addColorStop(0, '#555');
    cxlg.addColorStop(0.5, '#ccc');
    cxlg.addColorStop(1.0, '#666');
    this.ctx.fillStyle = cxlg;

    this.ctx.fillRect(0,0,300,300);
    this.ctx.fillRect(300,0,300,300);
    this.ctx.fillRect(0,300,300,300);

    // Face
    face();

    // Eyes
    eyes();

    // Mouth
    mouth();

    // Hair
    hair();

    // Body
    body();

    this.toImg();
  },

  toImg : function() {
    var img_src = this.el.dom.toDataURL("image/png"),
        old_img = this.el.img,
        new_img = this.el.img.clone(true);

    this.el.img.before(new_img);

    // Warp up old img only if there is a old img
    if (old_img.attr('src') != undefined) {
      old_img.addClass('goaway');

      setTimeout(function() {
        old_img.remove();
      }, 400);
    } else {
      old_img.remove();
    }

    this.el.img = $(new_img);
    this.el.img.attr('src', img_src);
  }
}

Canvas.init();

/**
 * Face
 */
function face() {
    var faces = [
        [ // F@ face
          [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3.5],
          [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4],
          [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5],
          [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 5.5],
        ],
        [ // Normal face
          [3, 3], [4, 3], [5, 3], [6, 3],
          [3, 4], [4, 4], [5, 4], [6, 4],
          [3, 5], [4, 5], [5, 5], [6, 5],
          [3, 6], [4, 6], [5, 6],
        ],
        [ // Alien face
          [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3],
          [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4],
          [3, 5], [4, 5], [5, 5], [6, 5],
          [3, 6], [4, 6], [5, 6],
        ]
    ];

    // Face
    draw(
      randomColor(), 
      faces[randomBetween(faces.length)]
    );
}

/**
 * Eyes
 */
function eyes() {
    var eyes = [
          [
           [4, 4], [6, 4]
          ]
    ]

    // Eyes
    draw(randomColor(), eyes[randomBetween(eyes.length)]);

    var pupil = [
         [[4.5, 4], [6.5, 4]],
         [[4.5, 4.5], [6.5, 4.5]],
         [[4, 4.5], [6, 4.5]],
         [[4, 4], [6.5, 4.5]],
         [[4.5, 4.5], [6, 4]],
         []
    ];

    // Pupil
    draw(
      randomColor(), 
      pupil[randomBetween(pupil.length)], 
      px_s
    );
}

function mouth() {
  // Mouth
  var mouths = [
  	[[4, 6], [5, 6]]
  ];
  
  draw(
    randomColor(), 
    mouths[randomBetween(mouths.length)]
  );
  
  // Decorations
  var decorations = [
  	[[5, 6]],
    [[4, 6], [4.5, 6.5], [5, 6], [5.5, 6.5]],
    []
  ];
  
  draw(
    randomColor(), 
    decorations[randomBetween(decorations.length)],
    px_s
  );
}

/**
 * Hair
 */
function hair() {
    var hair = [
          [
                     [4, .5], [5, .5], [6,0],
           [3, 1.5], [4, 1],  [5, 1], [6, 1],
           [3, 2.5], [4, 2],  [5, 2], [6, 2],
          ],
          [
           [4, .5], [5, .5],[6,0],[7,0],
           [2, 1.5],[3, 1.5], [4, 1],  [5, 1], [6, 1],
           [2, 2.5], [3, 2.5], [4, 2],  [5, 2], [6, 2], [7, 2],
          ],
          [
           [4, .5], [5, .5],
           [2, 1.5],[3, 1.5], [4, 1.5],  [5, 1.5], [6, 1.5], [7, 1.5],
           [1, 2.5],[2, 2.5], [3, 2.5], [4, 2.5],  [5, 2.5], [6, 2.5], [7, 2.5], [8, 2.5]
          ],
          [
           [2, .5], [7, .5],
           [2, 1.5], [3, 2], [4, 1.5], [5, 1.5], [6, 2], [7, 1.5],
           [2, 2.5], [4, 2.5],  [5, 2.5], [7, 2.5],
          ],
          []
    ];

    draw(
      randomColor(), 
      hair[randomBetween(hair.length)]
    );
}

/**
 * Body
 */
function body() {
    var bodys = [
         [
                  [2, 7], [3, 7], [4, 7], [5, 7], [6, 7],
          [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8],
          [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9]
         ],
         [
          [2, 7], [3, 7], [4, 7], [5, 7], [5, 7], [6, 7], [7, 7],
  [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8], [9, 8],
  [0, 9], [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9]
         ]
    ];

    // Body
    draw(randomColor(), bodys[randomBetween(bodys.length)]);

    // Decorations
    var body_decorations = [
           [ // Tie
             [3, 7], [5, 7],
             [4, 8],
             [4, 9],
           ],
           []
    ];

    draw(
      randomColor(), 
      body_decorations[randomBetween(body_decorations.length)]
    );

    // Decorations 2
    var body_decorations_2 = [
            [
                [3.5, 7.5], [5, 7], [5, 7],
                [4, 8],
                [4, 9],
            ],
            [
             [3, 8.5], [5.5, 8.5],
             [2.5, 9], [6, 9],
             [2.5, 9.5], [5.5, 9.5]
            ],
     ];

     draw(
       randomColor(),
       body_decorations_2[randomBetween(body_decorations_2.length)], 
       px_s
     );
}

/**
 * Draw something.
 */
function draw(color, coords, size) {
    $.each(coords, function(i, v) {

        var _size = px;

        if (size != undefined) {
            _size = size;
        }

        Canvas.ctx.fillStyle = color;
        Canvas.ctx.fillRect(coords[i][0] * px, coords[i][1] * px, _size, _size);
    });
}

/**
 * Return a random value not greater than max.
 */
function randomBetween(max) {
    var r;
    do {r = Math.random();} while(r == 1.0);
    return parseInt(r * max);
}

/*
 * Return a random color as hex.
 */
function randomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}