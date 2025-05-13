// Terminal-like typing effect for code blocks
$(document).ready(function() {
    // Navbar Scroll Effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.custom-navbar').addClass('scrolled');
        } else {
            $('.custom-navbar').removeClass('scrolled');
        }
    });
    
    // Configuration variables for typing animation
    var TYPING_INTERVAL = 10000; // Time between typing cycles (10 seconds)
    var TYPING_SPEED = 50;      // Speed of typing each character
    var DISPLAY_DURATION = 3000; // How long to display before clearing (3 seconds)
    
    // Initialize typing animation
    var codeElement = $('.code-style');
    // Format the code string with line breaks to control where wrapping happens
    var codeText = "const Developer = { creative: true, passionate: true};"; 
    var hasTyped = false;
    
    // First, clean up any existing content
    codeElement.html('');
    
    function typeCode(element, text, speed) {
        return new Promise(function(resolve) {
            var i = 0;
            var $element = $(element);
            
            // First, clean the element and ensure it's ready
            $element.html('');
            
            // Create a text container that allows wrapping but preserves formatting
            var $textContainer = $('<span style="white-space: pre-wrap; display: inline;"></span>');
            
            // Create and append cursor
            var $cursor = $('<span class="terminal-cursor typing"></span>');
            
            // Add both to the element
            $element.append($textContainer);
            $element.append($cursor);
            
            var timer = setInterval(function() {
                if (i < text.length) {
                    $textContainer.text(text.substring(0, i + 1));
                    i++;
                } else {
                    $cursor.removeClass('typing');
                    clearInterval(timer);
                    resolve();
                }
            }, speed);
        });
    }
    
    function clearText(element) {
        return new Promise(function(resolve) {
            var $element = $(element);
            var $textContainer = $element.find('span').first();
            var $cursor = $element.find('.terminal-cursor');
            
            // Get the current text
            var text = $textContainer.text();
            var i = text.length;
            
            // Add typing class to cursor for faster blink
            $cursor.addClass('typing');
            
            var clearTimer = setInterval(function() {
                if (i > 0) {
                    // Remove one character at a time while preserving formatting
                    $textContainer.text(text.substring(0, i - 1));
                    i--;
                } else {
                    clearInterval(clearTimer);
                    $cursor.removeClass('typing');
                    resolve();
                }
            }, 30);
        });
    }
    
    async function startTypingCycle() {
        while (true) {
            // Type the code
            await typeCode(codeElement, codeText, TYPING_SPEED);
            
            // Wait for display duration
            await new Promise(resolve => setTimeout(resolve, DISPLAY_DURATION));
            
            // Clear the text
            await clearText(codeElement);
            
            // Wait before starting next cycle
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    
    // Start typing when element comes into view
    function checkVisibility() {
        if (!hasTyped && codeElement.length > 0 && 
            codeElement.offset().top < $(window).scrollTop() + $(window).height()) {
            startTypingCycle();
            hasTyped = true;
            $(window).off('scroll', checkVisibility);
        }
    }
    
    // Check immediately in case element is already visible
    checkVisibility();
    
    // Also check on scroll
    $(window).on('scroll', checkVisibility);
});