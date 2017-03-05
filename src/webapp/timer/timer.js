$(document).ready(function(){
    $('.beginTimer').on('click','button',function(){
        $(this).fadeOut();
        $('.beginTimer').html('<p>Ready...Set</p>').fadeOut(1000);
        var userInput = $('.timerLength').value;
        console.log(userInput);
        var count = 10;
        var counter = setInterval(timer, 1000);
        function timer(){
            count = count -1;
            if (count<0){
                clearInterval(counter);
                $('.endMessage').text('You are out of time!');
                return;
            };
            $('.timer').text(count);
        }
    })
})