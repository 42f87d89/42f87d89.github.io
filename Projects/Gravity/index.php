<!DOCTYPE html>
	<head>
		<title>Play with Planets! MrNosco's Place of Wonders</title>
        <link rel="stylesheet" type="text/css" href="/default.css">
		<script src="Gravity.js"></script>
	</head>
	<body>
            <?php include '../../navbar.php';?>
            <?php include '../../analyticstracking.php';?>
		<div class="main"><center>
			<div id="inject">
			</div><br>
			Size: <input type="text" id="size" value=1><br> <p>(In pixels. 1 pixel = 1 sun-radius)</p>
			Mass: <input type="text" id="mass" value=1><br> <p>(In earth-masses)</p>
			Speed: <input type="text" id="speed" value=0><br> <p>(In pixels per 1/60 seconds. 1/60 seconds = 24 hours)</p>
			Angle: <input type="text" id="angle" value=0><br> <p>(In degrees. Clockwise from the x axis)</p>
		</center></div>
	</body>
</html>
