$(function () {
    var Alltodo = $("#todo-list"),
        total = $(".todo-count");
    var btn = $(".destroy");
    var count = $(".todo-count")[0];
    var $input = $("#new-todo");
    var done = 0;

    //初加载
    load();
    //存入LocalStorage
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

    //事件委托监听点击事件
    //删除按钮
    $("#todo-list").on("click", ".destroy", function (event) {
        //$(this).closest("li").remove();

        remove($(".destroy").index(this));
        load();
    });
    //选择按钮
    $("#todo-list").on("click", '.toggle', function (event) {
        //console.log($('.toggle').index(this))
        todolist = loadData();
        //console.log(todolist)
        //console.log($(".toggle").index(this))

        if ($(this).prop("checked") == false) {
            todolist[$(".toggle").index(this)].done = false;
        }
        else if ($(this).prop("checked") == true) {
            todolist[$(".toggle").index(this)].done = true;
        }
        saveData(todolist);
        load();
    });
    //双击修改
    $("#todo-list").on("dblclick", "label", function (event) {
        //获取到todo的值
        //  console.log(todolist[$(".view label").index(this)].todo);
        todolist = loadData();
        var oldHtml = todolist[$(".view label").index(this)].todo;//找到原值
        var newObj = document.createElement('input');
        $(this).text("");
        newObj.type = 'text';
        newObj.value = oldHtml;
        $(this).append(newObj);
        newObj.focus();
        var that = this;

        newObj.onblur = function (e) {
            if($(this).val() !== oldHtml) {
                //console.log($(this).val())
                //console.log(that)
                //console.log(todolist[$(".view label").index(that)].todo)
                todolist[$(".view label").index(that)].todo = $(this).val();
            }
            saveData(todolist);
            load();
        }//光标离开事件

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
        var review = localStorage.getItem("mytodolist");
        if (review != "undefined" && review != null) {
            return JSON.parse(review);
        }
        else { return []; }
    }
    //删除已完成的items//嘻嘻
    function clear() {
        //如果done为true则删除
        var mycompleted;
        var mytodolist = JSON.parse(localStorage.getItem("mytodolist"));
        //console.log($(mytodolist[0]).attr("done"));//true
        for (var com = 0; com < mytodolist.length; com++) {
            if ($(mytodolist[com]).attr("done") == true) {
                delete mytodolist[com]; //不改变数组长度
            }//console.log(mytodolist);
        }
        mycompleted = mytodolist.filter(d => d);
        //console.log(mytodolist.filter(d=>d));
        // console.log(mytodolist);
        //localStorage.setItem("mytodolist", JSON.stringify(mytodolist));
        saveData(mycompleted);
        load();
    }
    //1.遍历的时候删除数组用delete不会改变数组长度，被删除的变成null值
    //2.filter不会改变原数组

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
            var todoString = [];
            var done = 0;
            var stringfalsef = "<li>"
                + "<div class='view'> <input  class = 'toggle' type = 'checkbox' contenteditable='true'>"
                + "<label>";
            var stringfalsel = "</label>"
                + "<button class= 'destroy'></button></div></li>";
            var stringtruef = "<li>"
                + "<div class='view'> <input  class = 'toggle' type = 'checkbox'"
                + " checked>"
                + "<label><s> ";
            var stringtruel = "</s></label>"
                + "<button class= 'destroy'></button></div></li>";
            //耦合了QWQ
            for (var i = 0; i < todolist.length; i++) {
                if ($(".selected").text() == "All") {
                    if ($(todolist[i]).attr("done") == false) {
                        todoString += stringfalsef +
                            todolist[i].todo + stringfalsel;
                    }
                    else if ($(todolist[i]).attr("done") == true) {
                        todoString += stringtruef + todolist[i].todo + stringtruel;
                        done++;
                    }
                }
                else if ($(".selected").text() == "Active") {
                    if ($(todolist[i]).attr("done") == false) {
                        todoString += stringfalsef +
                            todolist[i].todo + stringfalsel;
                    }
                }
                else if ($(".selected").text() == "Completed") {
                    if ($(todolist[i]).attr("done") == true) {
                        todoString += todoString += stringtruef + todolist[i].todo + stringtruel;
                        done++;
                        done++;
                    }
                }
            }
        }
        $("#todo-list").html(todoString);
        var all = todolist.length;
        count.innerText = all + "items at all " + done + " done";


    }
});
