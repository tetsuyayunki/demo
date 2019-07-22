//添加函数
function addTodolist(e) {
    var obj_list = {
        todo: "",//存储输入的数据
        done: false //初始化数据类型，便于分类
    };
    document.getElementById("new-todo").value = document.getElementById("new-todo").value.trim();//去掉头尾空格
    obj_list.todo = document.getElementById("new-todo").value;
    todolist.push(obj_list);

    saveData(todolist);

    document.getElementById("new-todo").value = "";
    load();//用户输入的数据添加至dom节点 
    document.getElementById("new-todo").focus();

}
//分类按钮添加监听事件
var fil = document.getElementsByClassName("filters")[0].getElementsByTagName("li");
var fila = [];
for (var a = 0; a < fil.length; a++) {
    fila[a] = fil[a].getElementsByTagName("a")[0];
    fila[a].addEventListener("click", function () {
        for (var b = 0; b < fila.length; b++) {
            fila[b].className = null;
        }
        this.className = "selected";
        load(this);
    });
}

//把输入的数据添加至dom节点，并根据输入数据属性done的值进行分类
var filter = document.getElementsByClassName("filters")[0];
//加载函数
function load(selected) {
    var selected = document.getElementsByClassName("selected")[0];
    var Alltodo = document.getElementById("todo-list"),
        total = document.getElementsByClassName("todo-count")[0],
        done = document.getElementsByClassName("done-count")[0],
        todoString = "",
        doneString = "",
        total = 0;
    done = 0;
    document.getElementById("new-todo").focus();

    todolist = loadData();

    //若todolist数组对象里包括用户输入数据，则添加至dom节点；若为空，初始化
    if (todolist != null) {
        for (var i = 0; i < todolist.length; i++) {
            if (selected.innerText == "All") {
                /* todoString += "<li>"
                    + "<div class='view'> <input  class = 'toggle' type = 'checkbox'>"
                    + "<label> " + todolist[i].todo + "</label>"
                    + "<button class= 'destroy'></button></div></li>"; */
                if (todolist[i].done == false) {
                    todoString += "<li>"
                        + "<div class='view'> <input  class = 'toggle' type = 'checkbox'"
                        + "onchange = 'update(" + i + ", \"done\", true)'>"
                        + "<label> " + todolist[i].todo + "</label>"
                        + "<button class= 'destroy'></button></div></li>";
                }
                else if (todolist[i].done == true) {
                    todoString += "<li>"
                        + "<div class='view'> <input  class = 'toggle' type = 'checkbox'"
                        + "onchange = 'update(" + i + ", \"done\", false)' checked>"
                        + "<label><s> " + todolist[i].todo + "</s></label>"
                        + "<button class= 'destroy'></button></div></li>";
                    done++;
                }
            }
            else if (selected.innerText == "Active") {
                if (todolist[i].done == false) {
                    todoString += "<li>"
                        + "<div class='view'> <input  class = 'toggle' type = 'checkbox'"
                        + "onchange = 'update(" + i + ", \"done\", true)'>"
                        + "<label> " + todolist[i].todo + "</label>"
                        + "<button class= 'destroy'></button></div></li>";
                }
            }
            else if (selected.innerText == "Completed") {
                if (todolist[i].done == true) {
                    todoString += "<li>"
                        + "<div class='view'> <input  class = 'toggle' type = 'checkbox'"
                        + "onchange = 'update(" + i + ", \"done\", false)' checked>"
                        + "<label><s> " + todolist[i].todo + "</s></label>"
                        + "<button class= 'destroy'></button></div></li>";
                    done++;
                }
            }
        }
        Alltodo.innerHTML = todoString;
        var btn = document.getElementsByClassName("destroy");
        var count = document.getElementsByClassName("todo-count");
        count[0].innerText = btn.length + " items at all " + done + " done";//总任务数
        //事件委托，删除按钮添加事件
        var list = document.getElementById("todo-list");
        list.addEventListener('click', function (event) {
            var btn = document.getElementsByClassName("destroy");
            var src = event.target;
            var srcC = src.getAttribute("checked");
            var count = document.getElementsByClassName("todo-count");
            //删除    
            if (src.className == "destroy") {
                list.removeChild(src.parentNode.parentNode);
                count[0].innerText = btn.length + " items at all " + done + " done";
                //删除localStorage
                remove(src.target);
            }
        });
    }

}
//onchange函数，改变对象done属性
function update(i, filed, value) {
    todolist[i][filed] = value;
    saveData(todolist);
    load(document.getElementsByClassName("selected")[0]);
}
//移除当前项，保存，加载
function remove(i) {
    todolist.splice(i, 1);

    saveData(todolist);

    load();
}
//保存数据
function saveData(data) {
    localStorage.setItem("mytodolist", JSON.stringify(data));
}
//加载数据
function loadData() {
    var hisTory = localStorage.getItem("mytodolist");
    if (hisTory != null) {
        return JSON.parse(hisTory);
    }
    else { return []; }
}
//清除数据
function clear() {
    localStorage.clear();
    load();
}


var $input = document.getElementById("new-todo");
window.addEventListener("load", load);//加载，执行函数
document.getElementsByClassName("clear-completed")[0].onclick = clear;//清除数据
document.getElementById("new-todo").onkeydown = function (event) {
    if (event.keyCode == "13" && $input.value) {
        addTodolist();
    }
};//回车事件