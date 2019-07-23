$(function () {
    var Alltodo = $("#todo-list"),
        total = $(".todo-count");
    var btn = $(".destroy");
    var count = $(".todo-count")[0];
    var $input = $("#new-todo");
    var done = 0;
    load();
    function addTodolist(e) {
        var obj_list = {
            todo: "",
            done: false
        };

        obj_list.todo = $("#new-todo").val().trim();//
        todolist.push(obj_list);//

        saveData(todolist);//

        $("#new-todo").val("");
        load();
        $("#new-todo").focus();
    }
    $(".filters li a").on("click", function () {
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
        load(this);
    });//可以实现


    $("#todo-list").on("click", ".destroy", function (event) {
        //$(this).closest("li").remove();
        count.innerText = btn.length + "items at all " + done + " done";
        remove($(".destroy").index(this));

    });
    $("#todo-list").on("click", '.toggle', function (event) {
        //console.log($('.toggle').index(this))
        todolist = loadData();
        console.log(todolist)
        console.log($(".toggle").index(this))

        if ($(this).prop("checked") == false) {
            todolist[$(".toggle").index(this)].done = false;
        }
        else if ($(this).prop("checked") == true) {
            todolist[$(".toggle").index(this)].done = true;
        }
        saveData(todolist);
        load();
    });
    function remove(i) {

        todolist.splice(i, 1);
        saveData(todolist);
        load();
    }
    function saveData(data) {
        localStorage.setItem("mytodolist", JSON.stringify(data));

    }//可
    function loadData() {
        var history = localStorage.getItem("mytodolist");
        if (history != null) {
            return JSON.parse(history);
        }
        else { return []; }
    }
    function clear() {
        localStorage.clear();
        load();
    }


    $(".clear-completed").click(clear);//works
    $("#new-todo").keydown(function (event) {
        if (event.keyCode == "13" && $("#new-todo").val()) {//可以判断

            addTodolist();
        }
    });
    function load() {
        $("#new-todo ").focus();

        todolist = loadData();

        if (todolist != null) {
            var todoString =[];
            var done = 0;
            for (var i = 0; i < todolist.length; i++) {
                if ($(".selected").text() == "All") {
                    if (todolist[i].done == false) {
                        todoString += "<li>"
                            + "<div class='view'> <input  class = 'toggle' type = 'checkbox'"
                            + ">"
                            + "<label> " + todolist[i].todo + "</label>"
                            + "<button class= 'destroy'></button></div></li>";
                    }
                    else if (todolist[i].done == true) {
                        todoString += "<li>"
                            + "<div class='view'> <input  class = 'toggle' type = 'checkbox'"
                            + " checked>"
                            + "<label><s> " + todolist[i].todo + "</s></label>"
                            + "<button class= 'destroy'></button></div></li>";
                        done++;
                    }
                }
                else if ($(".selected").text() == "Active") {
                    if (todolist[i].done == false) {
                        todoString += "<li>"
                            + "<div class='view'> <input  class = 'toggle' type = 'checkbox'"
                            + ">"
                            + "<label> " + todolist[i].todo + "</label>"
                            + "<button class= 'destroy'></button></div></li>";
                    }
                }
                else if ($(".selected").text() == "Completed") {
                    if (todolist[i].done == true) {
                        todoString += "<li>"
                            + "<div class='view'> <input  class = 'toggle' type = 'checkbox'"
                            + "checked>"
                            + "<label><s> " + todolist[i].todo + "</s></label>"
                            + "<button class= 'destroy'></button></div></li>";
                        done++;
                    }
                }
            }
        }
        $("#todo-list").html(todoString);
        var btn = $(".destroy");
        count.innerText = btn.length + "items at all " + done + " done";


    }
});
