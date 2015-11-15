http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.2.min.js

    $(document).ready(function () {
        var scale = 0;
        var score = 0;
        var count = 0;
        var selectPlayer;
        var selected = false;
        
        $("#play").click(function () {
            $("#play").fadeOut('fast');
            $("div").show();
            $("#player").show(); 
        }); 


        //**********SELECT PLAYER**********
        $("#mbutton").click(function(){
            selected = true;
            hide(selected);
            selectPlayer = 1;
            $("img.mario").show();
            pick(selectPlayer);    
        });

        $("#bbutton").click(function(){
            selected = true;
            hide(selected);
            selectPlayer = 2;
            $("img.bzhao").show();
            pick(selectPlayer);    
        });

        $("#gbutton").click(function(){
            selected = true;
            hide(selected);
            selectPlayer = 3;
            $("img.gs").show();
            pick(selectPlayer);   
        });
        
        $("#lbutton").click(function(){
            selected = true;
            hide(selected);
            selectPlayer = 4;
            $("img.luigi").show();
            pick(selectPlayer); 
        });

        $("#fbutton").click(function () {
            selected = true;
            hide(selected);
            selectPlayer = 5;
            $("img.fran").show();
            pick(selectPlayer);
            
        });
        
        //**********Initialize game screen**********
        function hide(selected) {
            if (selected == true) {
                $("div").fadeOut('fast');
                $("#player").fadeOut('fast');
                $("img.bowser").show();
                $("img.bowser2").show();
                $("img.bigmac").show();
                $("img.melon").show();
            }
        }

        //**********ACTIVATE PLAYER**********
        function pick(selectPlayer){
            switch (selectPlayer) {
                case 1:   
                    activePlayer = "img.mario";
                    break;
                case 2:
                    activePlayer = "img.bzhao";
                    break;
                case 3:
                    activePlayer = "img.gs";
                    break;
                case 4:
                    activePlayer = "img.luigi";
                    break;
                case 5:
                    activePlayer = "img.fran";
                    break;
            }
        }

        //**********Keyboard reference for directional arrows********** 
        $(document).keydown(function(key) {
            switch(parseInt(key.which,10)) {
                case 37:
                    $(activePlayer).animate({left: '-=30px'}, 0.1); //Left
                    break;  
                case 38:
                    $(activePlayer).animate({top: '-=30px'}, 0.1); //up
                    break;
                case 39:
                    $(activePlayer).animate({left: '+=30px'}, 0.1); //right
                    break;
                case 40:
                    $(activePlayer).animate({top: '+=30px'}, 0.1); //down
                    break;
            }
            calcDistance();
        });

        //******************** Random relocation of Big Macs *************
        (function moveBigMac(){              
            var x = (Math.random() * ($(document).width() - 250)).toFixed();
            var y = (Math.random() * ($(document).height() - 250)).toFixed();

            $('img.bigmac').css({
                'position':'absolute',
                'left':x+'px',
                'top':y+'px',
                'display': 'none',          
            }).appendTo('body').fadeIn(100).delay(5000).fadeOut(500, function () {
                $("img.bowser").animate({ left: '+=1000px' }, 7000);
                $("img.bowser2").animate({ left: '-=1000px' }, 7000);
                moveBigMac();
            }); 
        })();

        //**********Random relocation of Watermelons**********
        (function moveMelon() {
            var x = (Math.random() * ($(document).width() - 250)).toFixed();
            var y = (Math.random() * ($(document).height() - 250)).toFixed();

            $('img.melon').css({
                'position': 'absolute',
                'left': x + 'px',
                'top': y + 'px',
                'display': 'none',
            }).appendTo('body').fadeIn(100).delay(5000).fadeOut(500, function () {
                $("img.bowser").animate({ left: '-=1000px' }, 7000);
                $("img.bowser2").animate({ left: '+=1000px' }, 7000);
                moveMelon();
            });
        })();

        //**********Measures the distance between objects**********
        function calcDistance() {
      
            var mario = $(activePlayer).offset();
            var melon = $('img.melon').offset();
            var bigMac = $('img.bigmac').offset();
            var bowser = $('img.bowser').offset();
            var bowser2 = $('img.bowser2').offset();
      
            var dx = mario.left - bigMac.left;
            var dy = mario.top - bigMac.top;

            var dxx = mario.left - melon.left;
            var dyy = mario.top - melon.top;

            var dxxx = mario.left - bowser.left;
            var dyyy = mario.top - bowser.top;
     
            var dxxxx = mario.left - bowser2.left;
            var dyyyy = mario.top - bowser2.top;

            var distanceMac = Math.abs(Math.sqrt(dx * dx + dy * dy));
            var distanceMelon = Math.abs(Math.sqrt(dxx * dxx + dyy * dyy));
            var distanceBow = Math.abs(Math.sqrt(dxxx * dxxx + dyyy * dyyy));
            var distanceBow2 = Math.abs(Math.sqrt(dxxxx * dxxxx + dyyyy * dyyyy));
            

            //**********Game over if you touch Bowser**********
            if (distanceBow <= 50 + scale || distanceBow2 <= 50 + scale || $(activePlayer).width() >= 650) {
              
          $(activePlayer).fadeOut(1000, function () {
              
                  var car = $('img.ambulance');
                  car.show();
                  car.animate({ left: '-=1000px' }, 3000);
              });
              alert("Game Over!");
          
            }

      //**********Tracks the food you eat (you expand if you eat a big mac, you shrink if you eat a melon).***********
      if (distanceMac <= 50 + scale) {    
          $(activePlayer).animate({ width: '+=100px' });
          scale += 25;

          var x = (Math.random() * ($(document).width() - 250)).toFixed();
          var y = (Math.random() * ($(document).height() - 250)).toFixed();

          $('img.bigmac').css({
              'position': 'absolute',
              'left': x + 'px',
              'top': y + 'px',
              'display': 'none',
          });
            score += 1;
            document.getElementById("score").innerHTML =
          "Health: " + score;
      }

      else if (distanceMelon <= 50 + scale) { 
          $(activePlayer).animate({ width: '-=100px' });
          scale += 25;

          var x = (Math.random() * ($(document).width() - 250)).toFixed();
          var y = (Math.random() * ($(document).height() - 250)).toFixed();

          $('img.melon').css({
              'position': 'absolute',
              'left': x + 'px',
              'top': y + 'px',
              'display': 'none',
          });
          score -= 1;
          document.getElementById("score").innerHTML =
        "Health: " + score;
      }
  } //function calc distance
}); //doc ready