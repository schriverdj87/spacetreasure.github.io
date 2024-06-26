/*
TODO: 
- Make it so that the enemy actually attacks the player before the gmae ends.
*/

var widthArena = 11;
var heightArena = 11;
var troutput;
var game;
var currentNMEHP = 5;//This will be removed when enemies are implemented.

//elements
var titleScreen;
var tableArena;
var playertray;
var theirHP;
var endScreen;
var failScreen;
var output;
var customInput;
var customOutput;
var aboutScreen; 
var wpnbtns;


var tickdown = 0;
var attackTickdown = 0;//Fired off when the player or the enemy attacks. If this is not 0, nothing else happens.
var tickdownTreasure = 15;
var tickdownNukeReveal = 20;//The brief moment when you get to see what was there.
var tickdownNukeBoom = 30;//How long to keep the explosion up.
var tickdownEnemy = 15;//How long to keep the enemy tickdown.
var tickdownEnemyEncounter = 10;
var tickdownWhale = 25;
var tickdownDrone = 15;
var tickdownEnd = 0;//When this hits 0 switch the screen.
var tickdownEndBase = 45;
var tickdownGridReveal = 30;
var tickdownSextant = 30;
var enemyTile = ""//The id for the tile the enemy is in. REMEMBER TO 
var enemyTurn = true;//Yes this should be part of searchgridcore.js
var lastPlayerHP = 20;
var lastEnemyHP = 0;

var betahead;
var johnsword;
var quantumwrench;
var unicornseye;
var plagerizePiratesPlunder = false;
var ouchCounter = 0;
var ouchCounterMax = 30;//Show injured when injured not by an enemy.
var SndBox = new SoundWrangler();

var imgPrefix = "img/";
var imgIndex = 
{
    "P":"player.png",
    "Ppain":"playerpain.gif",
    "Pbubble":"playerbubble.png",
    "Pdead":"playerdead.png",
    "The pipe is leaking":"playerAttack.gif",
    "he flew to the bus stop in his lion king slippers":"playerAttacked.gif",
    "O":"nothing.png",
    "#":"Stars.png",
    "1":"treasure1.png",
    "2":"treasure2.png",
    "3":"treasure3.png",
    "4":"treasure4.png",
    "A":"nme1.png",
    "Tuesday is coming, did you bring your raincoat?":"nme1Attack.gif",
    "I live in a giant bucket":"nme1Attacked.gif",
    "B":"nme2.png",
    "PORK CHOPPY MITZ MOOTZ!":"nme2Attack.gif",
    "Right, a giant mantis.":"nme2Attacked.gif",
    "C":"nme3.png",
    "I am feeling fat and sassy!":"nme3Attack.gif",
    "Life is good!":"nme3Attacked.gif",
    "I am the queen of France!":"playerbubble.png",
    "S":"supplycrate.png",
    "R":"randoreveal.png",
    "c":"nme3here.gif",
    "K":"krayanfinder.png",
    "s":"sensor.png",
    "e":"explosion.png",
    "ec":"explosionc.png",
    "enw":"explosionnw.png",
    "en":"explosionn.png",
    "ene":"explosionne.png",
    "ee":"explosione.png",
    "ese":"explosionse.png",
    "es":"explosions.png",
    "esw":"explosionsw.png",
    "ew":"explosionw.png",
    "N":"nuke.png",
    "G":"hide.png",
    "T":"telescope.png",
    "$":"sextant.png",
    "&":"sextantpointer.gif",
    "M":"map.png",
    "m":"mappointer.gif",
    "mn":"mappointern.gif",
    "mne":"mappointerne.gif",
    "me":"mappointere.gif",
    "mse":"mappointerse.gif",
    "ms":"mappointers.gif",
    "msw":"mappointersw.gif",
    "mw":"mappointerw.gif",
    "mnw":"mappointernw.gif",
    "+":"glue.png",
    "b":"bubble.png",
    "a":"ammo.png",
    "p":"pain.png",
    "t":"teleportenemy.png",
    "r":"sensor.png",
    "rr":"mappointerradar.gif",
    "*":"mine.png"
}

var colorIndex = 
{
    "happy": "#55FF55",
    "veryhappy": "#FFFF55",
    "angry":"#FF5555",
    "neutral":"#FFFFFF",
    "tutorial":"#55FFFF"
}

var colorIndexDark = 
{
    "happy": "#00AA00",
    "veryhappy": "#AA5500",
    "angry":"#AA0000",
    "neutral":"#AAAAAA",
    "tutorial":"#00AAAA"
}

var lastMessage = 0;
var textFlashTickdown = 0;
var textFlashTickdownMax = 15;

var wpnBTNTickdown = 0;
var wpnBTNTickdownMax = 10;
var wpnBTNTickdownIndex = -1;

window.onload = function ()
{
    
    titleScreen = document.getElementById("titleScreenHolder");
    tableArena = document.getElementById("tableArena");
    playertray = document.getElementById("playertray");
    theirHP = document.getElementById("theirHP"); 
    endScreen = document.getElementById("endScreenHolder"); 
    betahead = document.getElementById("betahead");
    johnsword = document.getElementById("johnsword");
    quantumwrench = document.getElementById("quantumwrench");
    unicornseye = document.getElementById("unicornseye");
    failScreen = document.getElementById("failScreenHolder");
    output = document.getElementById("letroutput");
    customInput = document.getElementById("customInput");
    customOutput = document.getElementById("customOutput");
    aboutScreen = document.getElementById("aboutScreenHolder");
    wpnbtns = document.getElementsByClassName("attackbtn");
    
    theirHP.style.visibility = "visible";
    document.getElementById("customScreenHolder").style.display = endScreen.style.display = failScreen.style.display = "none";
    aboutScreen.style.display = "none";

    document.getElementById("btnStart").onclick = document.getElementById("btnCustomStart").onclick = function()
    {
        titleScreen.style.display = document.getElementById("customScreenHolder").style.display = "none";
        reset();
        tableArena.style.display = playertray.style.display = "block";
       
    }

    document.getElementById("btnReset").onclick = function()
    {
        
        reset();

    }

    document.getElementById("btnMenu").onclick = function()
    {
        titleScreen.style.display = "flex";
        tableArena.style.display = playertray.style.display = "none";
    }

    document.getElementById("btnCustom").onclick = function()
    {
        titleScreen.style.display = "none";
        document.getElementById("customScreenHolder").style.display = "flex";
        customOutput.innerHTML = "";
    }

    document.getElementById("aboutBack").onclick = function()
    {
        titleScreen.style.display = "flex";
        aboutScreen.style.display = "none";
    }

    document.getElementById("btnAbout").onclick = function()
    {
        titleScreen.style.display = "none";
        aboutScreen.style.display = "flex";
    }


    document.getElementById("customBack").onclick = function()
    {
        titleScreen.style.display = "flex";
        document.getElementById("customScreenHolder").style.display = "none";
    }

    document.getElementById("customDoItButton").onclick = function()
    {
        customOutput.innerHTML = ProcessCustomSheet(customInput.value);
    }

    
    document.getElementById("customGenerateButton").onclick = function()
    {
        customInput.value = GenerateCustomSheet(document.getElementById("customCheck").checked);
    }


    document.getElementById("endScreenHolder").onclick = document.getElementById("failScreenHolder").onclick =  function()
    {
        document.getElementById("endScreenHolder").style.display = failScreen.style.display = "none";
        titleScreen.style.display = "flex";
        
    }

    document.getElementById("volControl").onchange = function()
    {
        SndBox.volume = parseInt(document.getElementById("volControl").value)/100;
        SndBox.PlaySnd(game.SND_GOODIEFIND);
    }

    document.getElementById("basicattack").onclick = function()
    {
        Attack("0");
    }
    
    document.getElementById("attack1").onclick = function()
    {
        Attack("A");
    }

    document.getElementById("attack2").onclick = function()
    {
        Attack("B");
    }

    document.getElementById("attack3").onclick = function()
    {
        Attack("C");
    }




    game = new SearchGridCore();
    
    Start_SetupGrid();

    var tdGrids = document.getElementsByClassName ("tdGrid");

    for (var a = 0; a < tdGrids.length; a++)
    {
        tdGrids[a].onclick = GridClick;
    }

    //Setup the attack buttons
    

    //Start the timer
    setInterval(engine,33);
    
    var preloadPoop = "url(img/Stars.png),";
    var keys = Object.keys(imgIndex);

    for (var a = 0; a < keys.length; a++)
    {
       
        preloadPoop = preloadPoop + "url(" + imgPrefix + imgIndex[keys[a]] + ")";
        if (a != keys.length - 1)
        {
            preloadPoop = preloadPoop + ",";
        }
    }
   

    document.getElementById("1,1").style.backgroundImage = preloadPoop;

    //Set challenge depending on the day of the week.

    switch(new Date().getDay())
    {
        case 0: console.log("SUNDAY"); break;//SUNDAY
        case 1: GMSimple(); break;//Monday
        case 2: GMSimple2(); break;//Tuesday
        case 3: GMFog(); break;//Wednesday
        case 4: GMNotSoScary(); break;
        case 5: GMScary(); break;
        default: console.log("SATURDAY");
    }

    //Setup Sounds
    var sndPrefix = "snd/";
    SndBox.SetSnd(game.SND_WHALE,sndPrefix + "whale.ogg");
    SndBox.SetSnd(game.SND_SUPPLY,sndPrefix + "supplyget.ogg");
    SndBox.SetSnd(game.SND_DRONE,sndPrefix + "DroneIntroduce.ogg");
    SndBox.SetSnd(game.SND_HEAL,sndPrefix + "healthup.ogg");
    SndBox.SetSnd(game.SND_TREASURE,sndPrefix + "treasureget.ogg")
    SndBox.SetSnd(game.SND_BUBBLE,sndPrefix + "bubble.ogg");
    SndBox.SetSnd(game.SND_NUKELAUNCH,sndPrefix + "launch.ogg");
    SndBox.SetSnd(game.SND_NUKEBOOM, sndPrefix + "explosion.ogg");
    SndBox.SetSnd(game.SND_GOODIEFIND, sndPrefix + "chime.ogg");
    SndBox.SetSnd(game.SND_GAMEOVER, sndPrefix + "gameover.ogg");
    SndBox.SetSnd(game.SND_GAMEWIN,sndPrefix + "gamewin.ogg");
    SndBox.SetSnd(game.SND_TELEPORTER,sndPrefix + "teleporter.ogg");
    SndBox.SetSnd(game.SND_ACIDNEBULA,sndPrefix + "acidnebula.ogg");
    SndBox.SetSnd(game.SND_PAIN,sndPrefix + "pain.ogg");
    SndBox.SetSnd(game.SND_DRONEATTACK,sndPrefix + "DroneShoot.ogg");
    SndBox.SetSnd(game.SND_ATTACK1,sndPrefix + "AttackA.ogg");
    SndBox.SetSnd(game.SND_BADDIEFIND,sndPrefix + "chimebad.ogg");
    SndBox.SetSnd(game.SND_NUKE,sndPrefix + "NukeGet.ogg");
    SndBox.SetSnd(game.SND_MINE,sndPrefix + "mine.ogg");
    SndBox.SetSnd(game.SND_RADAR,sndPrefix + "radar.ogg");
    SndBox.SetSnd(game.SND_AMMO,sndPrefix + "ammo.ogg");
    SndBox.SetSnd(game.SND_NMEREVEAL,sndPrefix + "nmereveal.ogg");
    SndBox.SetSnd(game.SND_KRAYANATTACK, sndPrefix + "krayanattack.ogg");
    SndBox.SetSnd(game.SND_KRAYANREVEAL, sndPrefix + "krayanreveal.ogg");
    SndBox.SetSnd(game.SND_KRAYAN,sndPrefix + "krayanencounter.ogg");
    SndBox.SetSnd(game.SND_ATTACK2,sndPrefix + "AttackB.ogg");
    SndBox.SetSnd(game.SND_ATTACK0,sndPrefix + "Attack0.ogg");
    SndBox.SetSnd(game.SND_ATTACK3,sndPrefix + "AttackC.ogg");
    SndBox.SetSnd(game.SND_WHALEATTACK,sndPrefix + "whaleAttack.ogg");
    SndBox.SetSnd(game.SND_TREASUREREVEAL,sndPrefix + "treasureshow.ogg");
    
}

//This is the function that fires off when a grid is clicked.
function GridClick()
{
    var leX = parseInt(this.id.split(",")[0]);
    var leY = parseInt(this.id.split(",")[1]);

    //Found treasure.

   
    
    
    if (game.move(leX,leY))//Movement successful
    {
        fullSyncGrid();
    
        //Found a thing.
       

        if ([game.EVENT_KFINDPRE,game.EVENT_RADAR,game.EVENT_TELEPORTER,game.EVENT_TREASURE,game.EVENT_NUKE,game.EVENT_GRIDHIDE,game.EVENT_SEXTANT,game.EVENT_MAP,game.EVENT_GLUE,game.EVENT_SUPPLY,game.EVENT_BUBBLE,game.EVENT_AMMO,game.EVENT_PAIN].includes(game.currentEvent))
        {
            tickdown = tickdownTreasure;
        }
        
        else if (game.currentEvent == game.EVENT_MINE)
        {
            tickdown = tickdownEnemyEncounter;
            ouchCounter = ouchCounterMax;
        }

        if (game.currentEvent == game.EVENT_ENEMY || game.currentEvent == game.EVENT_DIE)
        {
            tickdown = tickdownEnemyEncounter;

            if (game.currentEvent == game.EVENT_ENEMY)
            {
                switch (game.currentEnemy["IM"])
                {
                    case "A": tickdown = tickdownDrone; break;
                    case "B": tickdown = tickdownWhale; break;
                }
            }

            enemyTile = FindEnemy();
            UpdateTheirHPDisplay();
            
            ouchCounter = 0;
            wpnBTNTickdown = 1;
        }

        if (game.currentEvent == game.EVENT_RANDO)
        {
            
        }

        if (game.currentEvent == game.EVENT_KFIND)
        {
            fullSyncGrid();
            UpdateMyHPDisplay();
            tickdown = tickdownGridReveal;
        }
    
    }
    else 
    {
        
        if (game.currentEvent == game.EVENT_NUKE2 || game.currentEvent == game.EVENT_NUKEDSELF)//Reveal what was there.
        {
            fullSyncGrid();
            tickdown = tickdownNukeReveal;
           
        }
    }

    //On account of the supply crates.
    UpdateAmmoDisplay();
    UpdateMyHPDisplay();

    
}

function Start_SetupGrid ()
{
    var toSend = ""
    var squareTemplate = "<td class = \"tdGrid\" id = \"COORDSHERE\">&nbsp;</td>";
    
    //Each Row
    for (var y = 0; y < game.heightArena; y++)
    {
        toSend = toSend + "<tr>"
        //Each column
        for (var x = 0; x < game.widthArena; x++)
        {
            toPut = squareTemplate.replaceAll("COORDSHERE", x + "," + y);
            toSend = toSend + toPut;
        }
        toSend = toSend + "</tr>"

    }

    //Add the output box
    //toSend = toSend + "<tr  > <td id = \"troutput\" colspan = 10> Welcome to Space Treasure! </td> </tr>"

    document.getElementById("tableArena").innerHTML = document.getElementById("tableArena").innerHTML + toSend;

    troutput = document.getElementById("troutput");
}

function UpdateMyHPDisplay()
{
    for (var a = 1; a < game.hpMax + 1; a++)
    {
        document.getElementById("hp" + a).style.backgroundImage = game.hp >= a ? "url(img/heart.png)":"url(img/heartgone.png)";
    }

    var hearts = document.getElementsByClassName("hpheart");

    for (var b = 0; b < hearts.length; b++)
    {
        if (parseInt(hearts[b].id.replace("hp","")) > game.hpMax)
        {
            hearts[b].style.display = "none";
        }
    }
}

function UpdateTreasureDisplay()
{
    betahead.style.backgroundImage = game.treasures["1"] == true ? "url(img/treasure1.png)":"url(img/noTreasure.png)";
    johnsword.style.backgroundImage = game.treasures["2"] == true ? "url(img/treasure2.png)":"url(img/noTreasure.png)";
    quantumwrench.style.backgroundImage = game.treasures["3"] == true ? "url(img/treasure3.png)":"url(img/noTreasure.png)";
    unicornseye.style.backgroundImage = game.treasures["4"] == true ? "url(img/treasure4.png)":"url(img/noTreasure.png)";
}

function UpdateAmmoDisplay()
{
    document.getElementById("basicattacknum").innerHTML = "&nbsp;";
    document.getElementById("attack1num").innerHTML = game.inventory["A"];
    document.getElementById("attack2num").innerHTML = game.inventory["B"];
    document.getElementById("attack3num").innerHTML = game.inventory["C"];
    
}

function UpdateTheirHPDisplay()
{
    /*if (game.currentEvent == game.EVENT_ENEMY)
    {*/
        
        for (var a = 1; a < game.enemyHealth + 1; a++)
        {

            document.getElementById("thp" + a).style.backgroundImage = game.currentEnemy[game.nmeKeyHP] >= a ? "url(img/heart.png)":"url(img/heartgone.png)";
        }

        if (lastEnemyHP > game.currentEnemy[game.nmeKeyHP])//Enemy has taken damage;
        {
            lastEnemyHP = game.currentEnemy[game.nmeKeyHP];
        }
    //}
    /*else
    {
        theirHP.style.visibility = "hidden";
    }*/
}

function reset()
{
    
    game = new SearchGridCore();
    tickdown = 0;
    lastPlayerHP = game.hp;
    lastEnemyHP = 0;
    enemyTile = "";
    enemyTurn = true;
    attackTickdown = 0;
    UpdateMyHPDisplay();
    UpdateTreasureDisplay();
    UpdateTheirHPDisplay();
    UpdateAmmoDisplay();

    //theirHP.style.visibility = "hidden";
    

    var allTreasures = document.getElementsByClassName("treasurepic");

    //Reset treasures
    for (var a = 0; a < allTreasures.length; a++)
    {
        allTreasures[a].style.backgroundImage = "url(img/noTreasure.png)"
    }
    
    fullSyncGrid();

    //Preload all images into sector 1,1.
    var preloadPoop = "url(img/Stars.png),";
    var keys = Object.keys(imgIndex);

    for (var a = 0; a < keys.length; a++)
    {
       
        preloadPoop = preloadPoop + "url(" + imgPrefix + imgIndex[keys[a]] + ")";
        if (a != keys.length - 1)
        {
            preloadPoop = preloadPoop + ",";
        }
    }
   

    document.getElementById("1,1").style.backgroundImage = preloadPoop;

}

//Shows the grid as the player should see it.
function fullSyncGrid()
{
    for (var y = 0; y < game.gridSeen.length; y++)
    {
        for (var x = 0; x < game.gridSeen[y].length; x++)
        {
            var tdGridToChange = document.getElementById(x + "," + y);
            var imgToPut = imgPrefix + imgIndex[game.gridSeen[y][x]];

            if (game.gridSeen[y][x] == "P" && game.hp <= 0)
            {
                imgToPut = imgToPut.replace(".","dead.");
            }
            else if (game.gridSeen[y][x] == "P" && game.bubbles > 0)
            {
                imgToPut = imgToPut.replace(".","bubble.");
            }
            else if (game.gridSeen[y][x] == "P" && game.pain == true)
            {
                imgToPut = imgToPut.replace(".","pain.");
            }
            else if (game.gridSeen[y][x] == "P" && ouchCounter > 0)
            {
                imgToPut = imgToPut.replace(".png","Attacked.gif");
                
            }
            tdGridToChange.style.backgroundImage = "url('NAUSIA')".replace("NAUSIA",imgToPut);
        }
    }
}

//Switches the images around when the enemy attacks.
function EnemyAttacks()
{
    
    if (game.bubbles <= 0)
    {
    document.getElementById(FindPlayer()).style.backgroundImage = ("url(\"" + imgPrefix + imgIndex["P"] + "\")").replace(".png","Attacked.gif");
    }
    if (game.currentEvent == game.EVENT_ENEMY || game.currentEvent == game.EVENT_ENEMYENEMYTURN)
    {
        //Wherever this this method is called this line is put immediately after.
        document.getElementById(enemyTile).style.backgroundImage = ("url(\"" + imgPrefix + imgIndex[game.currentEnemy[game.nmeKeyIMA]] + "\")").replace(".png","Attack.gif");
    }


}

function PlayerAttacks()
{
    
    if (game.bubbles <= 0)
    {document.getElementById(FindPlayer()).style.backgroundImage = ("url(\"" + imgPrefix + imgIndex["P"] + "\")").replace(".png","Attack.gif");}
    document.getElementById(enemyTile).style.backgroundImage = ("url(\"" + imgPrefix + imgIndex[game.currentEnemy[game.nmeKeyIMA]] + "\")").replace(".png","Attacked.gif");
    


}

function EndAttack()
{
    if (game.currentEvent != game.EVENT_GRIDHIDE)
    {
        var lePlayerLocation  =  FindPlayer()

        if (lePlayerLocation != "NOT FOUND")
        {
            document.getElementById(FindPlayer()).style.backgroundImage = ("url(\"" + imgPrefix + imgIndex["P"] + "\")");
        }
    }
    if ([game.EVENT_ENEMY,game.EVENT_ENEMYENEMYTURN,game.EVENT_ENEMYPLAYERTURN,game.EVENT_BATTLEWIN].includes(game.currentEvent))
    {
         
        document.getElementById(enemyTile).style.backgroundImage = ("url(\"" + imgPrefix + imgIndex[game.currentEnemy[game.nmeKeyIMA]] + "\")");
    }
}

//The Player Attacks
function Attack(attackType)
{
    if (game.currentEvent == game.EVENT_ENEMYPLAYERTURN)
    {
        if (game.attack(attackType) == true)//Returns true if the enemy has sufficient ammo.
            {
                PlayerAttacks();
                UpdateTheirHPDisplay();
                UpdateAmmoDisplay();
                attackTickdown = tickdownEnemy;
                
               
            }
    }
}

//Returns the XY id of the player panel.
function FindPlayer()
{
    for (var y = 0; y < game.gridSeen.length; y++)
    {
        for (var x = 0; x < game.gridSeen[y].length; x++)
        {

            if (game.gridSeen[y][x] == "P" )
            {
                return x + "," + y;
            }
            
        }
    }

    return "NOT FOUND"
}

function FindEnemy()
{
    return game.wantToGo.x + "," + game.wantToGo.y;
}

//This fires of about 30 times a second.
function engine()
{



    if (attackTickdown > 0)//The attack animation
    {
        attackTickdown--;

        if (attackTickdown == 0)//Enemy attacks.
        {
            
                    if (game.currentEvent == game.EVENT_BATTLEWIN)
                    {
                        tickdown = 1;
                        //theirHP.style.visibility = "hidden";
                    }
                    else
                    {
                        game.crank();
                        EnemyAttacks();
                        document.getElementById(enemyTile).style.backgroundImage = ("url(\"" + imgPrefix + imgIndex[game.currentEnemy[game.nmeKeyIMA]] + "\")").replace(".png","Attack.gif");
                        UpdateMyHPDisplay();
                        tickdown = tickdownEnemy;
                        
                    }
                    

                    
                
               
                
            
        }

        
    }
    else if (game.currentEvent == game.EVENT_RANDO || game.currentEvent == game.EVENT_RANDOEND || game.currentEvent == game.EVENT_NUKEDSELF)
    {
        game.crank();
        fullSyncGrid();
    }

    else if (tickdownEnd > 0)
    {
        tickdownEnd--;

        if (tickdownEnd == 0 && game.currentEvent == game.EVENT_WIN)
        {
        tableArena.style.display = playertray.style.display = "none";
        endScreen.style.display = "flex";
        }
        else if (tickdownEnd == 0 && game.currentEvent == game.EVENT_DIE)
        {
            tableArena.style.display = playertray.style.display = "none";
            failScreen.style.display = "flex";
            
        }
    }
    
    
    else if (tickdown > 0)
    {
        
        tickdown--;

        if (tickdown == 0)
        {
            var oldEvent = game.currentEvent;
            var oldBubble = game.bubbles;
            var enemyKilledPlayer = (game.currentEvent == game.EVENT_ENEMYENEMYTURN);
            var events = game.crank();
            if (enemyKilledPlayer == true)
            {
                enemyKilledPlayer = game.currentEvent == game.EVENT_DIE;
            }
            fullSyncGrid();
            //If we're dealing with an enemy that's just been teleported over
            if (oldEvent == game.EVENT_TELEPORTER && game.currentEvent == game.EVENT_ENEMY)
            {
                tickdown = tickdownEnemyEncounter;
                enemyTile = FindEnemy();
                UpdateTheirHPDisplay();
                theirHP.style.visibility = "visible";
             

               

            }
            else
            {

                EndAttack();//This breaks the game on teleporting.
                UpdateMyHPDisplay();
                UpdateTheirHPDisplay();
                UpdateTreasureDisplay();
                UpdateAmmoDisplay();

                if (game.currentEvent == game.EVENT_NUKE3)
                {
                    tickdown = tickdownNukeBoom;
                }
                else if (game.currentEvent == game.EVENT_GRIDHIDE || (game.currentEvent == game.EVENT_RADAR && (game.radarResult < game.radarChance)))
                {
                    tickdown = 1;
                }
                else if (game.currentEvent == game.EVENT_KFIND || game.currentEvent == game.EVENT_SEXTANT1 || game.currentEvent == game.EVENT_MAP1 || (game.currentEvent == game.EVENT_RADAR && (game.radarResult >= game.radarChance)))//Showing something in the map
                {
                    tickdown = tickdownSextant;
                }
                else if (game.currentEvent == game.EVENT_RADAR1)
                {
                    tickdown = tickdownSextant;
                }
                else if (game.currentEvent == game.EVENT_ENEMYENEMYTURN || enemyKilledPlayer == true)//Enemy just attacked.
                {
                    
                    EnemyAttacks();
                    document.getElementById(enemyTile).style.backgroundImage = ("url(\"" + imgPrefix + imgIndex[game.currentEnemy[game.nmeKeyIMA]] + "\")").replace(".png","Attack.gif");
                    game.crank();
                    UpdateMyHPDisplay();
                    tickdown = tickdownEnemy;
                }
                else if (game.currentEvent == game.EVENT_ENEMYPLAYERTURN)
                {
                    EndAttack();
                }

                if (oldEvent == game.EVENT_MINE && game.currentEvent != game.EVENT_DIE && oldBubble == 0)
                {
                    var playerHurt = "url('NAUSIA')".replace("NAUSIA",imgPrefix + imgIndex["P"].replace(".png","Attacked.gif"))
                    document.getElementById(FindPlayer()).style.backgroundImage = playerHurt;
                }

                //Compensating for glitch where bubble disappears after getting an item.
                if (game.bubbles > 0)
                {
                    var playerHurt = "url('NAUSIA')".replace("NAUSIA",imgPrefix + "playerbubble.png")
                    document.getElementById(FindPlayer()).style.backgroundImage = playerHurt;
                }

                //Compensating for "pain" status not showing immediately
                if (game.pain == true)
                {
                    fullSyncGrid();
                } 

            }
            
        }
    }

    else if ((game.currentEvent == game.EVENT_WIN || game.currentEvent == game.EVENT_DIE ) && game.killMe == false)//Reveal the grid!
    {
        var events = game.crank();
        fullSyncGrid();

        if (game.killMe == true)//Switch to a different screen.
        {
            tickdownEnd = tickdownEndBase;
        }
    }

    if (ouchCounter > 0)
    {
        ouchCounter--;
        

        if (ouchCounter == 0)
        {
            fullSyncGrid();
        }
    }

    //Flashing the buttons
    if (wpnBTNTickdown > 0)
    {
        wpnBTNTickdown--;

        if (wpnBTNTickdown == 0)
        {
            wpnBTNTickdownIndex++
            if (wpnBTNTickdownIndex <= wpnbtns.length)
            {
                wpnBTNTickdown = wpnBTNTickdownMax;

                //Decolorize the last one.
                if (wpnBTNTickdownIndex > 0)
                {
                    wpnbtns[wpnBTNTickdownIndex - 1].style.backgroundColor = "#AAAAAA";
                }

                //Colorize the next one.
                if (wpnBTNTickdownIndex < wpnbtns.length)
                {
                    wpnbtns[wpnBTNTickdownIndex].style.backgroundColor = "#FF5555";
                }

                if (wpnBTNTickdownIndex == wpnbtns.length)
                {
                    wpnBTNTickdownIndex = -1
                    wpnBTNTickdown = 0;
                }

                
            }
        }
        

           

        
    }

    //Wrangle putting and making the text flash.
    
    if (game.saying != lastMessage)
    {
        textFlashTickdown = textFlashTickdownMax;
    }

    document.getElementById("letroutput").innerHTML = game.saying != "" ? game.saying:"&nbsp;";
    document.getElementById("letroutput").style.color = (textFlashTickdown % 5 != 0 || textFlashTickdown == 0) ? colorIndex[game.sayingMood]:colorIndexDark[game.sayingMood];

    if (textFlashTickdown > 0)
    {
        textFlashTickdown--;
    }
    lastMessage = game.saying;

    SndBox.PlaySnd(game.getSnd());
    
}