$(document).ready(function() {
    
   // Add task, this sets up a click event listener on the element 
    
    $("#addBtn").click(function() {

   //val()gets whatever the user type. trim() remove any extra spaces

        var task = $("#taskInput").val().trim();
        
   //if - prevents adding empty tasks to the list and this add new html to the element
        
        if (task !== "") {

           
            $("#taskList").append(
                `<li>
                ${task}
                <button class="done">✓</button>
                <button class="remove">✗</button></li>`
            );
            
            $("#taskInput").val(""); // clear input
        }
    });

    // Mark task as complete by clicking "✓"

    $("#taskList").on("click", ".done", function() {
        $(this).parent().toggleClass("completed");
    });

    // Remove task by clicking "✗"

    $("#taskList").on("click", ".remove", function() {
        $(this).parent().fadeOut(300, function() {
            $(this).remove(); 
        });
    });
    

    // Add task on Enter key press
    
    $('#taskInput').on('keypress', function(event) {
        if (event.which === 13) {  // 13 is the Enter key code     
            $('#addBtn').click();
        }
    });

})
