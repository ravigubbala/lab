$(document).ready(function() {
    let todos = [];

    $(document).on("change", ".todobox input[type=checkbox]", function(event) {
        if ($(event.target).is(":checked")) {
            $(this).parent().find("label").css("text-decoration", "line-through");
        } else {
            $(this).parent().find("label").css("text-decoration", "");
        }
    });

    $(".newtodobox input[type=text]").on('keydown', function(e) {
        if (e.which == 13 && e.target.value != "") {
            newid = "todo" + ($(".todobox").length + 1);
            if ($(".todobox").length > 0) {
                prevElem = ".todobox:nth-last-child(3)";
            } else {
                prevElem = ".row:first-child()";
            }

            newElem = '<div class="todobox row"><div class="col-xs-7"><input type="checkbox" name="' + newid + '" id="' + newid + '">&nbsp;<label for="' + newid + '">' + e.target.value + '</label></div><div class="col-xs-5"><span class="glyphicon glyphicon-chevron-up"></span><span class="glyphicon glyphicon-chevron-down"></span><span class="glyphicon glyphicon-pencil"></span><span class="glyphicon glyphicon-trash"></span></div></div>';

            if (!todos.includes(e.target.value)) {
                $(newElem).insertAfter(prevElem);
                todos.push(e.target.value);
                $(this).val("");
            } else {
                $("#message").text("Given todo already exists!");
            }
            
        } else {
            $("#message").text("");
        }
    });

    $(document).on("click", ".glyphicon.glyphicon-trash", function() {
        $(this).parent().parent().remove();
        const index = todos.indexOf($(this).parent().parent().find("label").html());
        if (index > -1) {
            todos.splice(index, 1);
        }
        if (todos.length == 0) {
            $("#message").text("");
        }
    });

    $(document).on("click", ".glyphicon.glyphicon-chevron-down", function() {
        var html = $(this).parent().parent()[0].outerHTML;
        if ($(this).parent().parent().next().hasClass("todobox")) {
            const i = todos.indexOf($(this).parent().parent().find("label").html());
            $(html).insertAfter($(this).parent().parent().next());
            $(this).parent().parent().remove();
            const j = i + 1;
            var tmp = todos[i];
            todos[i] = todos[j];
            todos[j] = tmp;
        }
    });

    $(document).on("click", ".glyphicon.glyphicon-chevron-up", function() {
        var html = $(this).parent().parent()[0].outerHTML;
        if ($(this).parent().parent().prev().hasClass("todobox")) {
            const i = todos.indexOf($(this).parent().parent().find("label").html());
            $(html).insertBefore($(this).parent().parent().prev());
            $(this).parent().parent().remove();
            const j = i - 1;
            var tmp = todos[i];
            todos[i] = todos[j];
            todos[j] = tmp;
        }
    });

    $(document).on("click", ".glyphicon.glyphicon-pencil", function() {
        var name = $(this).parent().parent().find("input").attr('name');
        var checkbox = $(this).parent().parent().find("input")[0].outerHTML;
        var todo = $(this).parent().parent().find("label").html();
        var editor = '<div class="editor col-xs-9">' + checkbox + '&nbsp;<input type="text" name="' + name + '" id="' + name + '" value="' + todo + '"><input type="hidden" name="prev" value="' + todo + '"></div><div class="col-xs-3"><span class="glyphicon glyphicon-ok"></span><span class="glyphicon glyphicon-remove"></span></div>';
        $(this).parent().parent().html(editor);
    });

    $(document).on("click", ".glyphicon.glyphicon-ok", function() {
        var value = $(this).parent().parent().find("input[type=text]").val();
        var name = $(this).parent().parent().find("input[type=text]").attr('name');
        var prev = $(this).parent().parent().find("input[type=hidden]").val();
        const i = todos.indexOf(prev);
        todos[i] = value;

        newElem = '<div class="col-xs-7"><input type="checkbox" name="' + name + '" id="' + name + '">&nbsp;<label for="' + name + '">' + value + '</label></div><div class="col-xs-5"><span class="glyphicon glyphicon-chevron-up"></span><span class="glyphicon glyphicon-chevron-down"></span><span class="glyphicon glyphicon-pencil"></span><span class="glyphicon glyphicon-trash"></span></div>';
        $(this).parent().parent().html(newElem);
    });


    $(document).on("click", ".glyphicon.glyphicon-remove", function() {
        var name = $(this).parent().parent().find("input[type=text]").attr('name');
        var prev = $(this).parent().parent().find("input[type=hidden]").val();

        newElem = '<div class="col-xs-7"><input type="checkbox" name="' + name + '" id="' + name + '">&nbsp;<label for="' + name + '">' + prev + '</label></div><div class="col-xs-5"><span class="glyphicon glyphicon-chevron-up"></span><span class="glyphicon glyphicon-chevron-down"></span><span class="glyphicon glyphicon-pencil"></span><span class="glyphicon glyphicon-trash"></span></div>';
        $(this).parent().parent().html(newElem);
    });
});
