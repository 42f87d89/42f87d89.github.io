<!DOCTYPE html>
    <head>
        <title>L-System, MrNosco's Place of Wonders</title>
        <style>
            .boxes{
                right: 20%;
                width: 20%;
                float: right;
            }
            #inject{
                left: 15%;
                width: 80%;
                height: 710px;
                                float: left;
            }
            canvas{
                border: 1px solid #000;
                float: right;
            }
        </style>
        <link rel="stylesheet" type="text/css" href="/default.css">
        <meta charset="utf-8"></meta>
        <script src=Lsys.js></script>
    </head>
    <body>
        <?php include '../../navbar.php';?>
        <div class="main">
                <div>
                    <div id="inject"></div>
                    <div class="boxes">
                            <label>Seed:</label><br>       <input id="seed" value="A" type="text"><br><br>
                            <label>Rules:</label><br>      <input id="Rules" value="A->B[+A][-A],B->BB" type="text"><br><br>
                            <label>Iterations:</label><br> <input id="n" value=4 type="text"><br><br>
                            <label>Length:</label><br>     <input id="length" value="30" type="text"><br><br>
                            <label>Turn Angle:</label><br> <input id="turnAngle" value=45 type="text"><br><br>
                            <label>Colors:</label><br>     <input id="Colors" type="text"><br><br>
                            <label>Nodes:</label><br>      <input id="nodes" value="" type="text"><br><br>
                            <label>Turn CW:</label><br>    <input id="turnCW" value="+" type="text"><br><br>
                            <label>Turn CC:</label><br>    <input id="turnCC" value="-" type="text"><br><br>
                            <label>Push:</label><br>       <input id="Push" value="[" type="text"><br><br>
                            <label>Pop:</label><br>        <input id="Pop" value="]" type="text"><br><br>
                            <label><input type="checkbox" style="" id="anim" />Animated</label><br>
                            <button id="button" type="button" onclick="generate()">Generate</button>
                            <button id="topng" type="button" onclick="toPNG()">Save to PNG</button>
                            <select id="preset" value="-" onclick="presets()">
                                    <option value="-">-</option>
                                    <option value="Tree">Tree</option>
                                    <option value="SierpinskiTriangle">Sierpinski Triangle</option>
                                    <option value="DragonCurve">Dragon Curve</option>
                                    <option value="KochCurve">Koch Curve</option>
                                    <option value="KochSnowflake">Koch Snowflake</option>
                                    <option value="WeirdSnowflake">Weird Snowflake</option>
                                    <option value="BushyTree">Bushy Tree</option>
                            </select>
                    </div>
        </div>
                
                
        <div class="textarea">
            <textarea readonly="" name="log" id="log" style="width: 100%; resize: none;" rows="10"></textarea>
        </div>

        <div class="text">
            <p>
                Instructions:<br>
                L-systems, short for <a href="http://en.wikipedia.org/wiki/L-system">Lindenmeyer system</a>, is a mathy thing that can be used to make fractals and stuff.
            </p>
            <p>
                Seed:<br>
                This is the starting value, it can be any character.
            </p>
            <p>
                Rules:<br>
                With the form "case1"->"result1","case2"->"result2",etc. The case is limited to being one character, where the result can be anything.
                What it does is, it looks at every character in the seed (or system), and replaces it with the result.
            </p>
            <p>
                Iterations:<br>
                This is how many times the seed will be put through the rules.
            </p>
            <p>
                Length:<br>
                The length of the individual lines, it is a fraction of the height of the rectangle where things are drawn, anything that is not in the categories 
                below will be treated as the instruction "draw a line forward".
            </p>
            <p>
                Turn Angle:<br>
                The angle by which to turn.
            </p>
            <p>
                Nodes:<br>
                This is treated as a command "do absolutely nothing". Useful for controling the growth of the fractal.
            </p>
            <p>
                Turn CW:<br>
                Turn clockwise. It is treated as a command "turn clockwise by ANGLE", where angle is Turn Angle.
            </p>
            <p>
                Turn CC:<br>
                Turn counter-clockwise. It is treated as a command "turn counterclockwise by ANGLE", where angle is Turn Angle.
            </p>
            <p>
                Push:<br>
                This is simply treated as a command "remember this position".
            </p>
            <p>
                Pop:<br>
                This is the antithesis of Push, it is treated as a command "go back to the most recent place you remember, then forget about it".
            </p>
        </div>
        </div>
    </body>
</html>
