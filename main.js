var stage;
var canvas;
var context;

var target;
var tgtClicked = false;

var targets;
var movables;
var mvIndex   = 0; // movables がクリックされているオブジェクトのindexが格納
var mvClicked = false;

var ina;

$(function() {	
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	stage = new createjs.Stage(canvas);

	//stage.x = -100;
	
	stage.scaleY = 1.0;
	stage.scaleX = 1.0;

	createjs.Ticker.addListener(window);
	createjs.Ticker.useRAF = true;

	// 選択反転の動作の停止
	canvas.onmousedown = function(e) {
		e.preventDefault();
		return false;
	}

	targets  = new createjs.Container();
	movables = new createjs.Container();
	stage.addChild(targets);
	stage.addChild(movables);

	var bmp  = new createjs.Bitmap("./images/aqua_button.png");
	var bmp2 = new createjs.Bitmap("./images/aqua_button_green.png");
	var bmp3 = new createjs.Bitmap("./images/aqua_button_purple.png");

	bmp.regX = 230 * 0.5;
	bmp.regY = 230 * 0.50;
	bmp2.regX = 230 * 0.50;
	bmp2.regY = 230 * 0.50;
	bmp3.regX = 230 * 0.50;
	bmp3.regY = 230 * 0.50;

	bmp.x  = STAGE_WIDTH * 0.2;
	bmp2.x = STAGE_WIDTH * 0.5;
	bmp3.x = STAGE_WIDTH * 0.8;
	bmp.y  = STAGE_HEIGHT * 0.2;
	bmp2.y = STAGE_HEIGHT * 0.2;
	bmp3.y = STAGE_HEIGHT * 0.2;


	stage.addChild(bmp);
	stage.addChild(bmp2);
	stage.addChild(bmp3);

	// test balls
	var blueC   = new Effects("BlurredCircle", 1024 * 0.2, 300, 80, "#00f");
	var greenC  = new Effects("BlurredCircle", 1024 * 0.5, 300, 80, "#a0a");
	var redC    = new Effects("BlurredCircle", 1024 * 0.8, 300, 80, "#40c");
	/*
	stage.addChild(blueC);
	stage.addChild(greenC);
	stage.addChild(redC);
	*/
	
	// test tween
	createjs.Tween.get(blueC, {loop: true})
		.to({y: 30}, 1000, createjs.Ease.circleInOut)
		.to({y: 40}, 500, createjs.Ease.linear)
		.to({y: 30}, 1000, createjs.Ease.circleInOut)
		.to({y: 0}, 1000, createjs.Ease.circleOut)
		.to({y: -30}, 1000, createjs.Ease.circleInOut)
		.to({y: -40}, 500, createjs.Ease.linear)
		.to({y: -30}, 1000, createjs.Ease.circleInOut)
		.to({y: 0}, 1000, createjs.Ease.circleOut);

	createjs.Tween.get(greenC, {loop: true})
		.wait(500)
		.to({y: 30}, 1000, createjs.Ease.circleInOut)
		.to({y: 40}, 500, createjs.Ease.linear)
		.to({y: 30}, 1000, createjs.Ease.circleInOut)
		.to({y: 0}, 1000, createjs.Ease.circleOut)
		.to({y: -30}, 1000, createjs.Ease.circleInOut)
		.to({y: -40}, 500, createjs.Ease.linear)
		.to({y: -30}, 1000, createjs.Ease.circleInOut)
		.to({y: 0}, 1000, createjs.Ease.circleOut);
	
	createjs.Tween.get(redC, {loop: true})
		.wait(200)
		.to({y: 30}, 1000, createjs.Ease.circleInOut)
		.to({y: 40}, 500, createjs.Ease.linear)
		.to({y: 30}, 1000, createjs.Ease.circleInOut)
		.to({y: 0}, 1000, createjs.Ease.circleOut)
		.to({y: -30}, 1000, createjs.Ease.circleInOut)
		.to({y: -40}, 500, createjs.Ease.linear)
		.to({y: -30}, 1000, createjs.Ease.circleInOut)
		.to({y: 0}, 1000, createjs.Ease.circleOut);

	targets.addChild(blueC);
	targets.addChild(greenC);
	targets.addChild(redC);

	ina    = new ina_createjs(stage);
	var circle = ina.povCircleB(0, 0, 60, 10, "#fff");
	circle.x = 1024 * 0.3;
	circle.y = 100;
	movables.addChild(circle);
	/*
	var circle2 = ina.povCircleB(0, 0, 60, 10, "#f00");
	circle2.x = 1024 * 0.7;
	circle2.y = 100;
	movables.addChild(circle2);
	*/
	
	//target.x = 100;
	//target.y = 100;

//	createjs.Tween.get(circle, {loop: true})
//		.to({x: 1024}, 5000, createjs.Ease.linear);


/*
	target = new createjs.Container();

	var circle = new Effects("BlurredCircle", 0, 0, 50, "#f00");
	target.addChild(circle);

	stage.addChild(target);

	target.x = 100;
	target.y = 100;

	createjs.Tween.get(circle, {loop: true})
		.to({x: 2}, 10, createjs.Ease.linear)
		.to({y: 3}, 10, createjs.Ease.linear)
		.to({x: -1}, 10, createjs.Ease.linear);

*/



	// イベント類
	stage.addEventListener("stagemousedown", onMouseDown);
	stage.addEventListener("stagemouseup", onMouseUp);
	stage.addEventListener("stagemousemove", onMouseMove);
});

function onMouseDown(event)
{
	var childNum = movables.getNumChildren();
	for ( var i = 0; i < childNum; i++ ) {
		var movable = movables.getChildAt(i);
		var pt = movable.globalToLocal(stage.mouseX, stage.mouseY);
		if(movable.hitTest(pt.x, pt.y)) {
			mvClicked = true;
			mvIndex = i;
			console.log(mvIndex);
			return;
		}
	}
	/*
	var pt = target.globalToLocal(stage.mouseX, stage.mouseY);
	if(target.hitTest(pt.x, pt.y)) {
		tgtClicked = true;
	}
	*/
}

function onMouseMove(event)
{
	if(mvClicked) {
		var movable = movables.getChildAt(mvIndex);
		movable.x = event.stageX;
		movable.y = event.stageY;
	}
}

function onMouseUp(event)
{
	if(mvClicked) {
		var childNum = targets.getNumChildren();
		for ( var i = 0; i < childNum; i++ ) {
			var target = targets.getChildAt(i);
			
			var pt = target.globalToLocal(stage.mouseX, stage.mouseY);
			if ( target.hitTest(pt.x, pt.y) ) {
				console.log("go to"+i);

				var movable = movables.getChildAt(0); // ------------------------------------------------------
				//createjs.Tween.get(movable)
				//	.to({scaleX: 50, scaleY: 50}, 1000, createjs.Ease.linear);

				console.log(stage.mouseX, stage.mouseY);
				
				ina.transEffect(stage.mouseX, stage.mouseY, 50, 50, "#fff");

			}
		}
		/*
		var pt = ball.globalToLocal(stage.mouseX, stage.mouseY);
		if(ball.hitTest(pt.x, pt.y) && mvClicked) {
			console.log("do blue ball transition");
			var movable = movables.getChildAt(mvIndex);
	
			createjs.Tween.get(movable)
				.to({scaleX: 50, scaleY: 50}, 1000, createjs.Ease.linear);
		}
		*/
	}

	mvClicked  = false;
	mvIndex    = false;
}

function tick(event)
{
	stage.update();	
}





















(function (window) {
	var STAGE_WIDTH  = 1024;
	var STAGE_HEIGHT = 500;

	function ina_createjs(stage)
	{
		// --- transition effect --- //
		var transEffect = function(x, y, width, height, color)
		{
			var object;

			// createRect(x, y, width, height, color);
			var curX = 0;
			var curY = 0;

			var points = new Array();

			var forSafeCnt = 0;
			
			// 画面が全て埋まる四角形を作成
			while(true) {
				forSafeCnt++;
				if(forSafeCnt > 10000) break;

				if ( curX < STAGE_WIDTH ) {
					// 設置座標の格納
					points.push({x: curX, y: curY});
					curX += width;
				} 
				// x 座標がオーバーしたら下に移動	
				else if ( (curX > STAGE_WIDTH) && (curY < STAGE_HEIGHT) ) {
					curX  = 0;
					curY += height;
				}

				// x も y も超過してると終了
				if ( (curX >= STAGE_WIDTH) && (curY >= STAGE_HEIGHT) ) {
					break;
				}
			}

	

			// 計算した座標通りに Tween で飛ばす		
			object = new createjs.Container();
			stage.addChild(object);
			var len = points.length;	
			var randomNumber = new Array();

			function arrayHaveNumber(array, number)
			{
				var flag = false;
				var len = array.length;
				for ( var i = 0; i < len; i++ ) {
					if(array[i] == number) {
						flag = true;
					}
				}
				return flag;
			}

			for (var cnt = 0 ; cnt < len; cnt++) {

				var test = 0;

				// 動かすオブジェクトのindex
				do {
					var tgtNum = Math.floor(Math.random() * len);
				
				} while ( arrayHaveNumber(randomNumber, tgtNum) );
				randomNumber.push(tgtNum);
				
				var point = points[tgtNum];

				var rect = createRect(x, y, width, height, color);

				pt = rect.globalToLocal(point.x, point.y);

				//console.log(pt.x, pt.y);
				
				createjs.Tween.get(rect)
					.wait(cnt * 20)
					.to({x: pt.x - x, y: pt.y - y}, 100, createjs.Ease.linear);

				object.addChild(rect);
			}
			/*
			for ( var i = 0; i < len; i++ ) {
				
				var point = points[i];

				var rect = createRect(x, y, width, height, color);

				pt = rect.globalToLocal(point.x, point.y);

				//console.log(pt.x, pt.y);
				
				createjs.Tween.get(rect)
					.wait(i * 50)
					.to({x: pt.x - 100, y: pt.y - 100}, 100, createjs.Ease.linear);

				object.addChild(rect);
				//console.log(point);
			}
			*/
		}
















	
		// --- 普通の円 --- //
		var circle = function(x, y, size, color)
		{
			return createCircle(x, y, size, color);
		}

		// --- 暈し・残像付きの円 --- //
		var povCircleB = function(x, y, size, numOfPOV, color)
		{
			var object = this.circle(x, y, size, color);
			blur(object, x, y, size);
			pov(object, size, color, numOfPOV);

			return object;
		}


		// --- 残像が残る円 --- //
		var povCircle = function(x, y, size, numOfPOV, color)
		{
			var object;
			var circleNum = 1;

			object = new createjs.Container();
			var circle = createCircle(x, y, size, color);
			object.addChild(circle);

			// loop のセット
			object.addEventListener("tick", ticker);

			// ここで残像を作りまくる
			function ticker(event) {
				if(circleNum < numOfPOV) {
					var shape = createCircle(object.x, object.y, size, color);

					shape.alpha = 0.5;

					// ステージに残像をセットする
					stage.addChild(shape);

					// Tween で徐々にフェードアウトさせる
					createjs.Tween.get(shape)
						.to({alpha: 0}, numOfPOV * 50, createjs.Ease.linear)
						.call(removePOVCircle, [shape]);

					circleNum++;
				}
			}

			function removePOVCircle(circle) {
				stage.removeChild(circle);
				circleNum--;
			}

			return object;
		}







		// --- functions --- //

		// 残像
		function pov(object, size, color, numOfPOV) {
			var circleNum = 0; 

			object.addEventListener("tick", ticker);

			function ticker(event) {
				if(circleNum < numOfPOV) {
					var shape = createCircle(object.x, object.y, size * 0.7, color);
					shape.alpha = 0.5;
					//blur(shape, object.x, object.y, size);

					// ステージに残像をセットする
					stage.addChild(shape);

					// Tween で徐々にフェードアウトさせる
					createjs.Tween.get(shape)
						.to({alpha: 0}, numOfPOV * 50, createjs.Ease.linear)
						.call(removePOVCircle, [shape]);

					circleNum++;
				}
			}

			function removePOVCircle(circle) {
				stage.removeChild(circle);
				circleNum--;
			}
		}

		// 円のShape の作成
		function createCircle(x, y, size, color) {
			var circle = new createjs.Shape();
			var g = circle.graphics;
			g.beginFill(color);
			g.drawCircle(x, y, size);

			return circle;
		}

		// 四角形の作成
		function createRect(x, y, width, height, color) {
			var rect = new createjs.Shape();
			var g = rect.graphics;
			g.beginFill(color);
			g.drawRect(x, y, width, height);

			return rect;
		}

		// ぼかしの適用
		function blur(object, x, y, radius) 
		{
			// blur は最後にshapeの作成後に行う
			var blurFilter = new createjs.BoxBlurFilter(20, 20, 1);
			object.filters = [blurFilter];
			var bounds = blurFilter.getBounds();
			object.cache(x - radius + bounds.x, y - radius + bounds.y,  radius * 2 + bounds.width, radius * 2 + bounds.height);
		}


		return {
			circle: circle,
			povCircle: povCircle,
			povCircleB: povCircleB,
			transEffect: transEffect
		};
	} // function ina()


	window.ina_createjs = ina_createjs;
}) (window);
