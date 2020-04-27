var 바디 = document.body;

var 숫자후보;
var 숫자배열;

function 숫자뽑기() {
    숫자후보 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    숫자배열 = [];

    for (var i = 0; i < 4; i += 1) {
        var 뽑은것 = 숫자후보.splice(Math.floor(Math.random() * (9 - i)), 1)[0]; // splice는 배열을 가져오기 때문에 [0]을 쓴다.
        숫자배열.push(뽑은것);
    }
}

숫자뽑기();
var res = document.createElement("h1");
바디.append(res);

var form1 = document.createElement("form");
바디.append(form1);

var input1 = document.createElement("input");
form1.append(input1);
input1.maxLength = 4;
var button1 = document.createElement("button");
form1.append(button1);
button1.textContent = "입력!";
var chs = document.createElement("h1");
바디.append(chs);

var 틀린횟수 = 0;

form1.addEventListener("submit", function callback(e) {
    e.preventDefault();
    var ans = input1.value;
    if (String(ans) === 숫자배열.join("")) {
        res.textContent = "홈런";
        input1.value = "";
        input1.focus();
        숫자뽑기();
        틀린횟수 = 0;
    } else {
        var ansarr = ans.split("");
        var strike = 0;
        var ball = 0;
        틀린횟수 += 1;

        if (틀린횟수 >= 10) {
            res.textContent =
                "10번 틀려서 실패 ! 답은 " + 숫자배열.join(",") + " 입니다.";
            input1.value = "";
            input1.focus();
            숫자뽑기();
            틀린횟수 = 0;
            chs.textContent = "";
        } else {
            for (var i = 0; i < 4; i += 1) {
                if (Number(ansarr[i]) === 숫자배열[i]) {
                    // 같은 자리인지 확인
                    strike += 1;
                } else if (숫자배열.indexOf(Number(ansarr[i])) > -1) {
                    // 같은 자리는 아니지만, 숫자 겹침 확인
                    ball += 1;
                }
            }
            res.textContent = strike + " 스트라이크" + ball + " 볼";
            input1.value = "";
            input1.focus();
            chs.textContent = "기회는 " + (10 - 틀린횟수) + "번 남았습니다.";
        }
    }
});
