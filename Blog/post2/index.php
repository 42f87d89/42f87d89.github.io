<!DOCTYPE html><html><head><title>The Same but Different</title><link href="/default.css" rel="stylesheet" type="text/css" /><style>img{
    width: 300px;
}
.img{
     margin-left: auto;
     margin-right: auto;
     width: 60%;
 }
.title{
     font-size: 150%;  
 }</style></head><body><?php include "../../navbar.php";?><div class="main"><p class="title">The Same but Different</p><div class="text"><p>Random terrain generation sounds like a great idea. It would extend the lifetime of a game by making it different every time you play it. That is until you play with it for a bit an realize it all looks "the same but different".</p><p>It's easy to see this with grey noise. It may be black and white scattered dots, but take a large enough portion of it (depending on the ration of black to white) and it will look like some shade of grey. Once you've seen one minecraft world, you've basically seen them all.</p><div class="img"><img src="greySmall.png" /><img src="grey.png" /><p class="caption"></p></div><p>One simple-minded solution to this problem would be to limit the size of the map so you can't notice the sameness. This wouldn't scale well, since if you wanted a bigger map, you would need to tweak your algorithm to match. Also, people like to keep creating new worlds all the time. Even though the size of *one* map is limited, people still have access to an infinite area by creating new maps.</p><p>A slightly more interesting approach would be to generate a heightmap that is based on something we know is not just grey noise. This could be something like a song, or a picture of Nicholas Cage's face. Imagine You generate a map where the height is the RGB value of this picture</p><div class="img"><img src="nicmain.jpg" /><p class="caption"></p></div><p>Clearly, most sections of that map will look vastly different. Everyone knows that Nic's mug is the most facinating thing in existance, on the opposite side of the scale from grey noise. But the problem is that this is a finite process. Unfortunately, Nic is only human, so if you were to strech his face to cover an infinite field, everything would look exactly the same.</p><p>However, fractals can span an infinite field. And they can do that while looking quite interesting everywhere.</p><div class="img" title="Just trust me. This can go on for infinity"><img src="dragon.png" /><p class="caption"></p></div><p>This certainly is an improvement over grey noise, but fractals are still "the same but different". You can still look at small sections of the map, and see that they are very similar to other sections. That's because fractals are generated using a fixed rule.</p><p>It seems that something that's too random wil cause our brains to think of it as a blob. But if it's not random enough it litterally *will* be just one blob. If we somehow could have fractals that are random enough, but still not as random as grey noise, we could have the best of both worlds. Allow me to illustrate what I'm trying to say:</p><div class="img"><img src="dot-frac.png" /><p class="caption"></p></div><p>For my example, I am using just black dots on a white background (because that's easy to draw!), but you could always try to turn this into greyscale somehow.</p><p>The idea in that picture is that each black dot represents a random distribuition of black dots. If you tried to zoom into one of the dots, you would end up looking at a different distribuiton of dots. The most important thing here, though, is that the dots are distribuited unevenly. You can think of it like a splosh of ink on a wall. A few of the dots are really far away from the center of the splosh, but most are really close to it.</p><p>So how can we apply this idea to our previous idea? Imagine, say, that the Nic Cage picture I used, instead of being generated by simple RGB pixels, each pixel represents another image, whose colors average out to the pixel it represents. Repeat this process infinitely with each level of sub picture. That is the fractal we are trying to create.</p><div class="img" title="This was way harder to make than I thought"><img src="nicnic.jpg" /><p class="caption">I've just turned Nicholas Cage into a living fractal. Surely, I must be the first person to even think of this.</p></div><p>Granted, I'm not sure if this can be called a fractal, since it is not self-similar, nor generated by an algorithm that can run indefinitely. But for all practical purposes, I think that it is a fractal.</p><p>Now, this is just me throwing ideas up in the air. I havent researched whether anyone's done something like this before, nor have I tried it myself to see how well it works, but it might just be a step in the right direction.</p><p>The main flaw I can imagine with all this, is that is so very easy to make something that has the same issues as grey noise. The human mind it too adaptable. When I was trying to come up with algorithms that had the properties I talked about, I realised that all the examples I came up with were either too coarse to ce suitable for terrain, or would probably generate terrain that was too similar, just like grey noise.</p></div><p>All the pictures here, with the exception of the original Nic Cage pics, were made and/or edited with Haskell and GIMP.</p><p>gustavo.smidth@gmail.com</p></div></body></html>
