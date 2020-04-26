while (true) {
    var num1 = Math.floor(Math.random() * 9) + 1;
    var num2 = Math.floor(Math.random() * 9) + 1;
    var res = num1 * num2;
    var 조건 = true;
    while (조건) {
        var ans = prompt(String(num1) + "*" + String(num2) + "는?");
        if (res === Number(ans)) {
            alert("정답입니다.");
            조건 = false;
        } else if (null === ans) {
            break;
        } else {
            alert("땡");
        }
    }
    if (ans === null) {
        break;
    }
}
