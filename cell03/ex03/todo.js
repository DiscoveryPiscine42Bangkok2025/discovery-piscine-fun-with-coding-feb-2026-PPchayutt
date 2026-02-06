var ft_list = document.getElementById('ft_list');
var newBtn = document.getElementById('newBtn');

window.onload = function() {
    loadTodo();
};

newBtn.addEventListener('click', function() {
    var todoText = prompt("Please enter a new TO DO:");
    
    if (todoText && todoText.trim() !== "") {
        addTodo(todoText);
        saveTodo();
    }
});

function addTodo(text) {
    var todoDiv = document.createElement('div');
    todoDiv.innerHTML = text;
    
    todoDiv.addEventListener('click', function() {
        if (confirm("Do you want to remove this TO DO?")) {
            this.remove(); // ลบตัวเองออกจากหน้าจอ
            saveTodo();    // บันทึกสถานะใหม่ลง Cookie
        }
    });

    // แทรกรายการใหม่ไว้ "บนสุด" (prepend) ตามโจทย์
    // ft_list.firstChild คือตัวแรกสุดที่มีอยู่
    ft_list.insertBefore(todoDiv, ft_list.firstChild);
}

// 5. ฟังก์ชันบันทึกข้อมูลลง Cookie
function saveTodo() {
    var todos = [];
    var items = ft_list.children;
    
    // วนลูปเก็บข้อความจากทุกรายการที่มีอยู่
    for (var i = 0; i < items.length; i++) {
        todos.push(items[i].innerHTML);
    }
    
    // แปลง Array เป็นข้อความ JSON แล้วบันทึกลง Cookie
    // encodeURIComponent ช่วยจัดการตัวอักษรพิเศษ
    // ตั้งเวลาหมดอายุ 7 วัน (หรือนานกว่านั้นก็ได้)
    var d = new Date();
    d.setTime(d.getTime() + (7*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    
    document.cookie = "ft_list=" + encodeURIComponent(JSON.stringify(todos)) + ";" + expires + ";path=/";
}

// 6. ฟังก์ชันโหลดข้อมูลจาก Cookie
function loadTodo() {
    var name = "ft_list=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        // ถ้าเจอ Cookie ชื่อ ft_list
        if (c.indexOf(name) == 0) {
            var jsonTodos = c.substring(name.length, c.length);
            try {
                var todos = JSON.parse(jsonTodos);
                // เนื่องจาก addTodo จะแทรกไว้บนสุดเสมอ
                // เราเลยต้องวนลูปจาก "หลังมาหน้า" เพื่อให้ลำดับถูกต้องเหมือนเดิม
                for (var j = todos.length - 1; j >= 0; j--) {
                    addTodo(todos[j]);
                }
            } catch (e) {
                console.log("No valid cookie found");
            }
        }
    }
}