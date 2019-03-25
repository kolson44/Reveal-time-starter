let socket = io.connect();

//can reference this for the team
let team;
let bluePoints = 0;
let pinkPoints = 0;


//choose a team
let teamGen = Math.floor(Math.random() * 100)
console.log(teamGen)

if (teamGen <= 45) {
  team = 'pink'
} else if (teamGen > 45 && teamGen >= 90) {
  team = 'blue'
} else if (teamGen > 90) {
  team = 'white'
}

console.log(team);


//setting the background color based on team choice
if (team === 'blue') {
  $('.team1').text('TEAM BLUE')
  $('body').css('background-color', 0, 191, 255)


} else if (team === 'pink') {
  $('.team1').text('TEAM PINK')
  $('body').css('background-color', 'pink')


} else if (team === 'white') {
  $('.team1').text('TEAM ERASE')
  $('body').css('background-color', 'white')
  $('.team1').css('color', 'black')
  $('.timer').css('color', 'black')


}



socket.on('count', function(timeleft) {
  console.log('time:', timeleft)

  if (timeleft > 0) {
    $("#countdown").text(timeleft + " sec ");
  }

  //the game is over
  if (timeleft == 0) {
    //check each grid cell for its color
    //we can do this once to check the status and get the score!
    $('.grid').children().each(function(i, child) {
      //console.log(child)

      // console.log($(child).hasClass('red'))

      //if its color is the one were looking for then add a point
      if ($(child).hasClass('blue')) {

        bluePoints = bluePoints + 1;

      } else if ($(child).hasClass('pink')) {

        pinkPoints = pinkPoints + 1;
      }

    }) //close the each child loop

    // console.log(bluePoints, pinkPoints)

    $('.results').show();
    $('.bluepoint').text(bluePoints)
    $('.pinkpoint').text(pinkPoints)
  } //close the 30 second check.

  if(timeleft < 0){
    $("#countdown").text('Game is Finished!  Waiting for the next round!')
  }

  if (timeleft == -15) {
    location.reload()
  } //close the 45 second check

}) //close the server's incoming universal timer


//change the cell color based on the keypress (based ont the team choice)
$(window).on('keyup',function(eventData){

  console.log(eventData.key)

  //if this is the enter...
    if (eventData.key == 'enter') {

      console.log('enter')
    }

      let randomNum = Math.round(Math.random() * 205 + 1)

      if (team === 'blue') {

        socket.emit('colorchange', {
          'team': 'blue',
          'cellToChange': '.item' + randomNum
        })

        // $('.item'+randomNum).css('background-color', 'blue').addClass('blue')


      } else if (team === 'pink') {
        socket.emit('colorchange', {
          'team': 'pink',
          'cellToChange': '.item' + randomNum
        })

        // $('.item'+randomNum).css('background-color', 'pink').addClass('pink')

      } else if (team === 'white') {
        socket.emit('colorchange', {
          'team': 'white',
          'cellToChange': '.item' + randomNum
        })

        // $('.item'+randomNum).css('background-color', 'white').addClass('white')

      }

    }
  })


// $(window).on('keyup',function(eventData){
//
//
//   console.log(eventData.key)
//
//     if( eventData.key == ' '){
//
//       console.log('space?')
//     }
//
//   })

  // $(window).on('keypress', function(eventData) {
  //   //if this is the spacebar...
  //   if (eventData.charCode == 32) {
  //
  //     let randomNum = Math.round(Math.random() * 205 + 1)
  //
  //     if (team === 'blue') {
  //
  //       socket.emit('colorchange', {
  //         'team': 'blue',
  //         'cellToChange': '.item' + randomNum
  //       })




//Listen for any changes from the server

socket.on('resultColorChange', function(incomingColorData) {

  if (incomingColorData.team == 'blue') {
    $(incomingColorData.cellToChange).css('background-color', 'blue').addClass('blue')
  } else if (incomingColorData.team == 'pink') {
    $(incomingColorData.cellToChange).css('background-color', 'pink').addClass('pink')
  } else if (incomingColorData.team == 'white') {
    $(incomingColorData.cellToChange).css('background-color', 'white').addClass('white')

  }


})
