var num1 = Math.ceil(Math.random() * 9);
var num2 = Math.ceil(Math.random() * 9);
var res = num1 * num2;

var 바디 = document.body;
var 단어 = document.createElement("div");
단어.textContent = String(num1) + " * " + String(num2) + " 는?";
바디.append(단어);
var 폼 = document.createElement("form");
document.body.append(폼);
var 입력창 = document.createElement("input");
폼.append(입력창);
var 버튼 = document.createElement("button");
버튼.textContent = "입력!";
폼.append(버튼);
var 결과창 = document.createElement("div");
document.body.append(결과창);

폼.addEventListener("submit", function (e) {
    e.preventDefault();
    // 콜백함수
    if (res === Number(입력창.value)) {
        결과창.textContent = "딩동댕";
        num1 = Math.ceil(Math.random() * 9);
        num2 = Math.ceil(Math.random() * 9);
        res = num1 * num2;
        단어.textContent = String(num1) + " * " + String(num2) + " 는?";
        입력창.value = "";
        입력창.focus();
    } else {
        결과창.textContent = "땡";
        입력창.value = "";
        입력창.focus();
    }
});

// while (true) {
//     var num1 = Math.floor(Math.random() * 9) + 1;
//     var num2 = Math.floor(Math.random() * 9) + 1;
//     var res = num1 * num2;
//     var 조건 = true;
//     while (조건) {
//         var ans = prompt(String(num1) + "*" + String(num2) + "는?");
//         if (res === Number(ans)) {
//             alert("정답입니다.");
//             조건 = false;
//         } else if (null === ans) {
//             break;
//         } else {
//             alert("땡");
//         }
//     }
//     if (ans === null) {
//         break;
//     }
// }
