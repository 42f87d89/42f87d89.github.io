<!DOCTYPE html>
	<head>
		<script src="brainfuck.js"></script>
		<link rel="stylesheet" type="text/css" href="/Projects/default.css">
		<!--style>
			html{
				font-family: courier;
			}
		</style-->
	</head>
	<body>
		<?php include '../../navbar.php';?>
		<?php include '../../analyticstracking.php';?>
                <div class="main">
		<table>
			<tr>
				<td align="center">in</td>
				<td align="center">out (ascii <input id="ascii" type="checkbox"></input>)</td>
				<td align="center">src</td>
			</tr>
			<tr>
				<td align="center">
					<textarea id="in" rows="30" cols="10"></textarea>
				</td>
				<td align="center">
					<textarea id="out" rows="30" cols="20"></textarea>
				</td>
				<td>
					<textarea id="src" rows="30" cols="50"></textarea>
				</td>
				<td><button type="button" onclick="parse()">Go!</button></td>
			</tr>
		</table>
		</div>
	</body>
</html>
