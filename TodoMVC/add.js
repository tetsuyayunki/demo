/* (function() {

    var addItems = document.querySelector("#new-todo");
    var itemsList =document.querySelector("#todo-list");//获取列表
    var items = JSON.parse(localStorage.getItem('items')) || [];//获取本地缓存

    //添加item方法
    function handleSubmit(e) {
        e.preventDefault();
        var name = this.querySelector('[name = value]').value;//获取输入框的值

        var item = {
            name: name,
            done: false
        };
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
        updateList(items, itemsList);
        this.reset();
    }

    function updateList (plates = [], plateList) {
        plateList.innerHTML = plates.map(function(plate, i) {
            
        })
    }
});
 */


















window.onload = function () {
    function getById(id) {
        return document.getElementById(id);
    }
    /* function allCount() {
        count[0].innerText = btn.length + " items at all";
    } */
    var li;
    var button;
    var div;
    var label;
    var font;
    var list = getById("todo-list");
    var input = getById("new-todo");
    var count = document.getElementsByClassName("todo-count");
    var todos = [];
    //添加
    input.addEventListener("keydown", function (event) {
        if (event.keyCode == "13") {
            if (input.value) {
                li = document.createElement("li");
                div = document.createElement("div");
                div.className = "view";
                $toggle = document.createElement("input");
                $toggle.className = "toggle";
                $toggle.setAttribute("type", "checkbox");
                
                //div.innerHTML = "<input class = 'toggle' type = 'checkbox'>";
                label = document.createElement("label");
                label.innerHTML = "<font style = 'vertical-align: inherit;'>" + input.value + "</font>";
                button = document.createElement("button");
                button.className = "destroy";
                list.appendChild(li);
                li.appendChild(div);
                div.appendChild($toggle);
                div.appendChild(label);
                div.appendChild(button);
                //存储节点
                var todo = {//建立对象
                    condition: input.checked,
                    value: input.value,
                    
                }
                todos.push(todo);
                localStorage.setItem("todo", JSON.stringify(todos));

                input.value = "";
            }
        }

        //删除
        var btn = document.getElementsByClassName("destroy");
        var btnLength = btn.length;
        var i = 0;
        var j = 0;
        var h = 0;
        /* var $toggle = document.getElementsByClassName("toggle"); */
        // var list = getById("todo-list");

        /* for( i = 0; i < btnLength; i++) {
       
        btn[i].addEventListener("click", function() {
            console.log(i);
            list.removeChild(this.parentNode.parentNode);
            count[0].innerText = btn.length + " items at all";
            });
        $toggle[i].addEventListener("click", function() {
            this.setAttribute("checked", true);
            if($toggle[i].checked == true) {
                $toggle[i].checked = false;
            }
            else {$toggle[i].checked = true;}
        });
        }   */
        //获取当前任务数     
        count[0].innerText = btn.length + " items at all";
    });
    //改变select 
    var fil = document.getElementsByClassName("filters")[0].getElementsByTagName("li");
    var fila = [];
    for (var a = 0; a < fil.length; a++) {
        fila[a] = fil[a].getElementsByTagName("a")[0];
        fila[a].addEventListener("click", function () {
            for (var b = 0; b < fila.length; b++) {
                fila[b].className = null;
            }
            this.className = "selected";
        });
    }
    /* fila[1].addEventListener("click", function () {
        for (var i = 0; i < check.length; i++) {
            if (check[i].checked) {
                check[i].style.display = "none";
            }
        }
    }); */ 
//事件委托
    list.addEventListener('click', function (event) {
        var btn = document.getElementsByClassName("destroy");
        var src = event.target;
        var srcC = src.getAttribute("checked");
        //删除    
        if (src.className == "destroy") {
            list.removeChild(src.parentNode.parentNode);
            count[0].innerText = btn.length + " items at all";
        }
        //checkbox
        if(src.className == "toggle") {
            if(src[checked] == true) {
                src[checked] = false;
            }
            else {
                src[checked] = true;
            }
        }
        
    });
};
