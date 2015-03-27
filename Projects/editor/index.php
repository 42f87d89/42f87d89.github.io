<!DOCTYPE html>
	<head>
		<script type="text/javascript" src="/Projects/editor/editor.js"></script>
		<style>
			#canvas{
				border: solid black 1px;
			}
		</style>
	</head>
	<body>
            <?php include '../../navbar.php';?>
            <?php include '../../analyticstracking.php';?>
		<div>
			<textarea id="textarea" cols="50" rows="50"></textarea>
			<input type="button" onclick="runCode()" value="Run"></input>
		</div>
		<div id="doc"></div>
	</body>
</html>
